import { fail, redirect } from '@sveltejs/kit';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

const ALLOWED_EMAILS = ['richard@counselhound.com', 'diogenes@mac.com'];
const OTP_TTL = 600; // 10 minutes in seconds

async function hmacSign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmacVerify(payload: string, sig: string, secret: string): Promise<boolean> {
  const expected = await hmacSign(payload, secret);
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get('admin_session') === 'authenticated') throw redirect(302, '/admin');
  return { verify: !!cookies.get('pending_otp') };
};

export const actions: Actions = {
  sendOtp: async ({ request, platform, cookies }) => {
    const fd = await request.formData();
    const email = (fd.get('email') as string)?.trim().toLowerCase();

    if (!ALLOWED_EMAILS.includes(email)) {
      return fail(403, { error: 'Email not authorized.' });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expires = Math.floor(Date.now() / 1000) + OTP_TTL;
    const payload = `${email}:${code}:${expires}`;
    const secret = platform?.env?.ADMIN_OTP_SECRET ?? 'dev-otp-secret';
    const sig = await hmacSign(payload, secret);

    cookies.set('pending_otp', `${payload}:${sig}`, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: OTP_TTL,
    });

    try {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: 'Counsel Hound <noreply@counselhound.com>',
        to: email,
        subject: 'Your admin login code',
        html: `
          <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:32px">
            <div style="height:4px;background:#C9A84C;margin-bottom:32px"></div>
            <p style="font-size:13px;color:#666;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px">Counsel Hound Admin</p>
            <h1 style="font-size:28px;font-weight:700;color:#0D1B2A;margin:0 0 24px">Your login code</h1>
            <div style="font-size:36px;font-weight:700;letter-spacing:0.2em;color:#0D1B2A;background:#f5f5f5;padding:24px;text-align:center;border-radius:4px;margin-bottom:24px">${code}</div>
            <p style="font-size:14px;color:#666;margin:0">Expires in 10 minutes. Do not share this code.</p>
          </div>
        `,
      });
    } catch {
      cookies.delete('pending_otp', { path: '/' });
      return fail(500, { error: 'Failed to send code. Try again.' });
    }

    return { sent: true, email };
  },

  verifyOtp: async ({ request, platform, cookies }) => {
    const fd = await request.formData();
    const inputCode = (fd.get('code') as string)?.trim();
    const raw = cookies.get('pending_otp');

    if (!raw) return fail(400, { error: 'Session expired. Request a new code.' });

    const parts = raw.split(':');
    if (parts.length !== 4) return fail(400, { error: 'Invalid session. Request a new code.' });

    const [email, storedCode, expiresStr, sig] = parts;
    const payload = `${email}:${storedCode}:${expiresStr}`;
    const secret = platform?.env?.ADMIN_OTP_SECRET ?? 'dev-otp-secret';

    const valid = await hmacVerify(payload, sig, secret);
    if (!valid) return fail(400, { error: 'Invalid session. Request a new code.' });

    if (Math.floor(Date.now() / 1000) > parseInt(expiresStr)) {
      cookies.delete('pending_otp', { path: '/' });
      return fail(400, { error: 'Code expired. Request a new one.' });
    }

    if (inputCode !== storedCode) {
      return fail(401, { error: 'Incorrect code.' });
    }

    cookies.delete('pending_otp', { path: '/' });
    cookies.set('admin_session', 'authenticated', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
    });

    throw redirect(303, '/admin');
  },
};
