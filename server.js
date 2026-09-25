require('dotenv').config();
const http = require('http');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const smtpRequired = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_TO'];
const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allowedOrigin });
  res.end(JSON.stringify(body));
};
const hasSmtpConfig = () => smtpRequired.every(key => Boolean(process.env[key]));
const createTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': allowedOrigin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }
  if (req.method === 'GET' && req.url === '/api/health') return json(res, 200, { ok: true, smtpConfigured: hasSmtpConfig() });
  if (req.method !== 'POST' || req.url !== '/api/leads') return json(res, 404, { message: 'Not found' });
  let raw = '';
  req.on('data', chunk => { raw += chunk; if (raw.length > 20000) req.destroy(); });
  req.on('end', async () => {
    try {
      const { name, phone, projectType, brief = '' } = JSON.parse(raw);
      if (!name?.trim() || !phone?.trim() || !projectType?.trim()) return json(res, 400, { message: 'Заполните обязательные поля.' });
      if (!hasSmtpConfig()) return json(res, 503, { message: 'SMTP-сервер не настроен. Заполните SMTP_HOST, SMTP_USER, SMTP_PASS и SMTP_TO в .env.' });
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        replyTo: process.env.SMTP_REPLY_TO || undefined,
        subject: `Новая заявка с сайта: ${projectType}`,
        text: `Имя: ${name}\nТелефон / WhatsApp: ${phone}\nТип проекта: ${projectType}\n\nОписание:\n${brief || 'Не указано'}`,
      });
      json(res, 200, { ok: true });
    } catch (error) {
      console.error('Lead email error:', error.code || error.message);
      json(res, 502, { message: 'Не удалось подключиться к SMTP. Проверьте SMTP_HOST, порт, пароль приложения и SMTP_SECURE.' });
    }
  });
});
server.listen(port, () => console.log(`Lead API is listening on http://localhost:${port}`));
