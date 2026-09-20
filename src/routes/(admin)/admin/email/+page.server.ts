import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  send: async ({ request, platform }) => {
    const env = (platform as { env?: Record<string, unknown> })?.env ?? {};
    const fd = await request.formData();
    const to      = (fd.get('to')      as string)?.trim();
    const subject = (fd.get('subject') as string)?.trim();
    const body    = (fd.get('body')    as string)?.trim();

    if (!to || !subject || !body) return fail(400, { error: 'All fields are required.', sent: false });

    const mailFrom   = (env.MAIL_FROM      as string | undefined) ?? 'noreply@counselhound.com';
    const resendKey  = env.RESEND_API_KEY  as string | undefined;
    const mailpitUrl = env.MAILPIT_URL     as string | undefined;

    const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;padding:32px;color:#333;">
<div style="max-width:600px;margin:0 auto;">
<div style="background:#162d39;height:4px;margin-bottom:24px;"></div>
<pre style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap;">${body.replace(/</g, '&lt;')}</pre>
<div style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;font-size:11px;color:#999;">Sent via Counsel Hound Admin</div>
</div></body></html>`;

    try {
      if (resendKey && resendKey.startsWith('re_')) {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);
        await resend.emails.send({ from: mailFrom, to, subject, html, text: body });
      } else if (mailpitUrl) {
        await fetch(`${mailpitUrl}/api/v1/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            From: { Email: mailFrom },
            To: [{ Email: to }],
            Subject: subject,
            HTML: html,
            Text: body,
          }),
        });
      } else {
        return fail(503, { error: 'No email provider configured.', sent: false });
      }
    } catch {
      return fail(500, { error: 'Failed to send. Check logs.', sent: false });
    }

    return { sent: true, error: null };
  },
};
