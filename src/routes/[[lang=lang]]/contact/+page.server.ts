import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendLeadEmail } from '$lib/server/mailer';
import { getDB } from '$lib/server/db';
import { z } from 'zod';

const schema = z.object({
  name:     z.string().min(2, 'Name is required').max(200).trim(),
  email:    z.email('Valid email required').max(200).trim().toLowerCase(),
  phone:    z.string().max(50).trim(),
  caseType: z.string().max(200).trim(),
  message:  z.string().min(10, 'Please describe your situation').max(5000).trim(),
  honeypot: z.string().max(0),
});

export const actions: Actions = {
  default: async ({ request, platform }) => {
    const fd = await request.formData();
    const raw = Object.fromEntries(fd);

    if (raw.honeypot) return { success: true };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return fail(422, { error: first.message });
    }

    const { name, email, phone, caseType, message } = parsed.data;

    const resendApiKey = platform?.env?.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured on this Worker.');
      return fail(500, { error: 'Failed to send message. Please call us at +1-855-804-6863.' });
    }

    try {
      await sendLeadEmail(resendApiKey, { name, email, phone, caseType, message });
    } catch (e: unknown) {
      console.error('Mail error:', e);
      return fail(500, { error: 'Failed to send message. Please call us at +1-855-804-6863.' });
    }

    // Save to D1 — silent if DB unavailable
    const db = getDB(platform);
    if (db) {
      try {
        await db.prepare(
          'INSERT INTO counselhound_contacts (first_name, last_name, email, phone, case_type, message, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(name, '', email, phone ?? '', caseType ?? '', message, 'new').run();
      } catch (e) {
        console.error('DB insert error:', e);
      }
    }

    return { success: true };
  },
};
