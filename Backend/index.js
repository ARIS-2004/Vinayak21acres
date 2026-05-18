require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/* ── Email Templates ─────────────────────────────── */

function clientThankYouHtml(name, isSiteVisit = false) {
  const body = isSiteVisit
    ? 'We have received your <strong>site visit request</strong>. Our team will call you within 24 hours to confirm your visit date and time.'
    : 'We have received your <strong>callback request</strong>. Our sales team will reach out to you shortly with all the details you need.';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">

      <tr>
        <td style="background:#7B1313;padding:28px 36px;text-align:center">
          <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:1px">VINAYAK 21 ACRES</p>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:3px;text-transform:uppercase">New Town · Kolkata</p>
        </td>
      </tr>

      <tr>
        <td style="padding:32px 36px">
          <p style="margin:0 0 12px;color:#1a1a1a;font-size:17px;font-weight:bold">Dear ${name},</p>
          <p style="margin:0 0 20px;color:#555;font-size:14px;line-height:1.7">${body}</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf5f5;border-radius:6px;margin-bottom:24px">
            <tr><td style="padding:20px 24px">
              <p style="margin:0 0 14px;color:#7B1313;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px">Why Vinayak 21 Acres?</p>
              ${[
                '21 Acres of Premium Township',
                '2 &amp; 3 BHK Starting &#8377;76 Lakhs',
                'IGBC Precertified Platinum Green Building',
                '75% Open-to-Sky | 3-Acre Central Park',
                'G+21 Towers | RERA Registered',
              ].map(h => `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px">
                <tr>
                  <td width="20" style="color:#7B1313;font-size:14px;font-weight:bold;vertical-align:top;padding-top:1px">&#10003;</td>
                  <td style="color:#444;font-size:13px;line-height:1.5">${h}</td>
                </tr>
              </table>`).join('')}
            </td></tr>
          </table>

          <p style="margin:0 0 8px;color:#555;font-size:14px;line-height:1.7">If you have any immediate queries, feel free to reach out:</p>
          <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7">
            &#128222; <strong>+91 91233 61286</strong>
          </p>

          <p style="margin:0;color:#888;font-size:13px;line-height:1.6">Warm regards,<br><strong style="color:#1a1a1a">The Vinayak 21 Acres Sales Team</strong></p>
        </td>
      </tr>

      <tr>
        <td style="background:#f9f9f9;border-top:1px solid #eeeeee;padding:16px 36px;text-align:center">
          <p style="margin:0;color:#aaa;font-size:11px;line-height:1.6">
            Off New Town Action Area III, Kolkata – 700156<br>
            This email was sent because you submitted a form on our website.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function ownerLeadHtml({ name, email, phone, message, type }) {
  const rows = [
    ['Lead Type', type],
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ...(message ? [['Message', message]] : []),
    ['Submitted At', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px">
  <tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">

      <tr>
        <td style="background:#7B1313;padding:22px 32px">
          <p style="margin:0;color:#ffffff;font-size:16px;font-weight:bold">&#128276; New Lead &#8212; Vinayak 21 Acres</p>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:12px">${type}</p>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px">
          <p style="margin:0 0 18px;color:#1a1a1a;font-size:14px;font-weight:bold">Lead Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${rows.map(([label, value], i) => `
            <tr style="background:${i % 2 === 0 ? '#fafafa' : '#ffffff'}">
              <td style="padding:10px 14px;font-size:13px;color:#888;font-weight:bold;width:130px;border:1px solid #eeeeee">${label}</td>
              <td style="padding:10px 14px;font-size:13px;color:#222;border:1px solid #eeeeee">${value}</td>
            </tr>`).join('')}
          </table>
        </td>
      </tr>

      <tr>
        <td style="background:#f9f9f9;border-top:1px solid #eeeeee;padding:14px 32px;text-align:center">
          <p style="margin:0;color:#aaa;font-size:11px">Sent from Vinayak 21 Acres website contact form</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* ── Routes ──────────────────────────────────────── */

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await transporter.sendMail({
      from: `"Vinayak 21 Acres" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for your interest – Vinayak 21 Acres',
      html: clientThankYouHtml(name, false),
    });

    await transporter.sendMail({
      from: `"21 Acres Website" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Lead: ${name} – Callback Request`,
      html: ownerLeadHtml({ name, email, phone, type: 'Callback Request' }),
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email error (contact):', err.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/site-visit', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await transporter.sendMail({
      from: `"Vinayak 21 Acres" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Site Visit Request Received – Vinayak 21 Acres',
      html: clientThankYouHtml(name, true),
    });

    await transporter.sendMail({
      from: `"21 Acres Website" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Lead: ${name} – Site Visit Request`,
      html: ownerLeadHtml({ name, email, phone, message, type: 'Site Visit Request' }),
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email error (site-visit):', err.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
