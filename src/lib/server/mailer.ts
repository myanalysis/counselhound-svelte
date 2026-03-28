import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { leadEmailHtml, autoReplyHtml } from './emailTemplates';

export async function sendLeadEmail(data: {
  name: string;
  email: string;
  phone: string;
  caseType: string;
  message: string;
}) {
  const resend = new Resend(RESEND_API_KEY);

  await resend.emails.send({
    from: 'Counsel Hound <noreply@counselhound.com>',
    to: 'richard@counselhound.com',
    subject: `New Case Inquiry — ${data.caseType || 'General'} — ${data.name}`,
    html: leadEmailHtml(data),
  });

  await resend.emails.send({
    from: 'Counsel Hound <noreply@counselhound.com>',
    to: data.email,
    subject: 'We received your inquiry — Counsel Hound',
    html: autoReplyHtml(data.name),
  });
}
