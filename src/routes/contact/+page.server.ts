import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendLeadEmail } from '$lib/server/mailer';
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
  default: async ({ request }) => {
    const fd = await request.formData();
    const raw = Object.fromEntries(fd);

    if (raw.honeypot) return { success: true };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return fail(422, { error: first.message });
    }

    const { name, email, phone, caseType, message } = parsed.data;

    try {
      await sendLeadEmail({ name, email, phone, caseType, message });
      return { success: true };
    } catch (e: any) {
      console.error('Mail error:', e);
      return fail(500, { error: 'Failed to send message. Please call us at +1-855-804-6863.' });
    }
  },
};
