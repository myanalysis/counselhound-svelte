const LOGO_URL = 'https://svelte.sgp1.cdn.digitaloceanspaces.com/counselhound/main-logo-email.png';

const header = `
  <tr>
    <td style="background-color:#162d39;padding:24px 32px;">
      <img src="${LOGO_URL}" alt="Counsel Hound" width="180" height="42" style="display:block;" />
    </td>
  </tr>
  <tr>
    <td style="background-color:#d8b269;height:3px;font-size:0;line-height:0;">&nbsp;</td>
  </tr>
`;

const footer = `
  <tr>
    <td style="background-color:#162d39;padding:24px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0 0 4px;color:#d8b269;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Richard Frankowski</p>
            <p style="margin:0 0 2px;color:rgba(255,255,255,0.7);font-size:11px;font-family:Arial,sans-serif;">Managing Attorney &mdash; Counsel Hound</p>
            <p style="margin:0 0 2px;color:rgba(255,255,255,0.5);font-size:11px;font-family:Arial,sans-serif;">+1-855-804-6863 &nbsp;|&nbsp; richard@counselhound.com</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.3);font-size:10px;font-family:Arial,sans-serif;">231 22nd St S #203, Birmingham AL 35233</p>
          </td>
          <td align="right" valign="top">
            <p style="margin:0;color:rgba(255,255,255,0.25);font-size:10px;font-family:Arial,sans-serif;text-align:right;">
              Serious Results<br/>For Serious Injuries
            </p>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;color:rgba(255,255,255,0.2);font-size:10px;font-family:Arial,sans-serif;border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;">
        This email and any attachments are confidential. If you received this in error, please delete it and notify us immediately.
      </p>
    </td>
  </tr>
`;

function wrap(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Counsel Hound</title></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          ${header}
          ${content}
          ${footer}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function leadEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  caseType: string;
  message: string;
}): string {
  return wrap(`
    <tr>
      <td style="background-color:#ffffff;padding:32px;">
        <p style="margin:0 0 4px;color:#d8b269;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">New Inquiry</p>
        <h1 style="margin:0 0 24px;color:#162d39;font-size:22px;font-family:Arial,sans-serif;">New Case Inquiry Received</h1>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;margin-bottom:24px;">
          ${row('Name', data.name)}
          ${row('Email', `<a href="mailto:${data.email}" style="color:#162d39;">${data.email}</a>`)}
          ${row('Phone', data.phone || '&mdash;')}
          ${row('Case Type', data.caseType || '&mdash;')}
        </table>

        <p style="margin:0 0 8px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Message</p>
        <div style="background:#f8f7f4;border-left:3px solid #d8b269;padding:16px;color:#374151;font-size:14px;line-height:1.7;font-family:Arial,sans-serif;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>

        <div style="margin-top:24px;padding:16px;background:#162d39;text-align:center;">
          <a href="mailto:${data.email}" style="display:inline-block;background:#d8b269;color:#162d39;text-decoration:none;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;padding:12px 28px;font-family:Arial,sans-serif;">
            Reply to ${data.name}
          </a>
        </div>
      </td>
    </tr>
  `);
}

export function autoReplyHtml(name: string): string {
  return wrap(`
    <tr>
      <td style="background-color:#ffffff;padding:32px;">
        <p style="margin:0 0 4px;color:#d8b269;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-family:Arial,sans-serif;">Thank You</p>
        <h1 style="margin:0 0 16px;color:#162d39;font-size:22px;font-family:Arial,sans-serif;">We've Received Your Inquiry</h1>

        <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;font-family:Arial,sans-serif;">Hi ${name},</p>
        <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;font-family:Arial,sans-serif;">
          Thank you for reaching out to Counsel Hound. Our team has received your inquiry and will be in touch within <strong>one business day</strong>.
        </p>
        <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;font-family:Arial,sans-serif;">
          If your matter is urgent, please call or text us directly:
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
          <tr>
            <td width="50%" style="padding-right:8px;">
              <a href="tel:+18558046863" style="display:block;background:#162d39;color:#ffffff;text-decoration:none;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;padding:14px;text-align:center;font-family:Arial,sans-serif;">
                Call +1-855-804-6863
              </a>
            </td>
            <td width="50%" style="padding-left:8px;">
              <a href="sms:+12055331968" style="display:block;background:#d8b269;color:#162d39;text-decoration:none;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;padding:14px;text-align:center;font-family:Arial,sans-serif;">
                Text +1-205-533-1968
              </a>
            </td>
          </tr>
        </table>

        <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;font-family:Arial,sans-serif;border-top:1px solid #e5e7eb;padding-top:16px;">
          No fees until we win &mdash; Free consultation &mdash; All inquiries are confidential<br/>
          Please do not reply to this email.
        </p>
      </td>
    </tr>
  `);
}

function row(label: string, value: string): string {
  return `
    <tr style="border-bottom:1px solid #f3f4f6;">
      <td style="padding:10px 16px;width:120px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;background:#f9fafb;">${label}</td>
      <td style="padding:10px 16px;color:#162d39;font-size:14px;font-family:Arial,sans-serif;font-weight:600;">${value}</td>
    </tr>
  `;
}
