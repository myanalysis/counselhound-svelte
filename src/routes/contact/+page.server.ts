import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { sendLeadEmail } from '$lib/server/mailer';

export const actions: Actions = {
  default: async ({ request }) => {
    const fd = await request.formData();
    const honeypot = fd.get('honeypot') as string;
    if (honeypot) return fail(400, { error: 'Bot detected.' });

    const name     = (fd.get('name') as string)?.trim();
    const email    = (fd.get('email') as string)?.trim();
    const phone    = (fd.get('phone') as string)?.trim() || '';
    const caseType = (fd.get('caseType') as string)?.trim() || '';
    const message  = (fd.get('message') as string)?.trim();

    if (!name || !email || !message) return fail(400, { error: 'Please fill in all required fields.' });

    try {
      await sendLeadEmail({ name, email, phone, caseType, message });
      return { success: true };
    } catch (e: any) {
      console.error('Mail error:', e);
      return fail(500, { error: 'Failed to send message. Please call us at +1-855-804-6863.' });
    }
  },
};
