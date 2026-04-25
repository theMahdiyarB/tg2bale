<div dir="rtl">

# ربات انتقال فایل تلگرام به بله و روبیکا

یک Cloudflare Worker که پل ارتباطی بین تلگرام، بله و روبیکا است — فایل‌ها، رسانه‌ها و لینک‌های دانلود را از کاربران مجاز تلگرام به گیرندگان تعریف‌شده در بله و/یا روبیکا ارسال می‌کند. فقط یک فایل (`index.js`) نیاز به استقرار دارد.

---

## 🌐 زبان / Language

<div dir="ltr">

[🇬🇧 English](README.md) | [🇮🇷 فارسی](README.fa.md)

</div>

---

## امکانات

- **ارسال فایل** — اسناد، عکس، ویدیو و فایل‌های صوتی را از تلگرام به بله و/یا روبیکا به‌صورت همزمان ارسال می‌کند
- **دانلود لینک مستقیم (تلگرام)** — هر لینک `http/https` را به ربات تلگرام بفرستید تا فایل دانلود و ارسال شود
- **دانلود لینک مستقیم (بله)** — لینک دانلود مستقیم را در بله بفرستید تا فایل دریافت و برای شما ارسال شود
- **دانلود لینک مستقیم (روبیکا)** — لینک دانلود مستقیم را در روبیکا بفرستید تا فایل دریافت و برای شما ارسال شود
- **زیپ خودکار** — فایل‌هایی که توسط بله یا روبیکا فیلتر می‌شوند (مثل APK، EXE، ISO) قبل از ارسال به‌صورت خودکار زیپ می‌شوند. نام فایل اصلی داخل زیپ حفظ می‌شود — گیرنده فقط باید آن را از حالت فشرده خارج کند
- **ارسال تکه‌تکه** — فایل‌های بزرگ‌تر از ۱۹ مگابایت به‌صورت خودکار به بخش‌های شماره‌گذاری‌شده تقسیم و به ترتیب ارسال می‌شوند. ابزار ترکیب فایل‌ها در رابط وب تعبیه شده است
- **رابط وب داخلی** — با باز کردن آدرس Worker در مرورگر، صفحه ابزارهای ترکیب و تغییر نام فایل نمایش داده می‌شود
- **احراز هویت** — فقط کاربران تعریف‌شده در `USER_MAPPING` می‌توانند از ربات در هر سه پلتفرم استفاده کنند
- **بدون سرور** — کاملاً روی Cloudflare Workers اجرا می‌شود. نیازی به VPS نیست

---

## پیش‌نیازها

۱. **حساب Cloudflare** — [ثبت‌نام](https://dash.cloudflare.com/sign-up)
۲. **توکن ربات تلگرام** — از [@BotFather](https://t.me/BotFather) دریافت کنید
۳. **توکن ربات بله** — از [@BotFather](https://ble.ir/botfather) در بله دریافت کنید
۴. **توکن ربات روبیکا** — از [@BotFather](https://rubika.ir/botfather) در روبیکا دریافت کنید
۵. **شناسه‌های کاربری**
   - شناسه تلگرام: از [@userinfobot](https://t.me/userinfobot) استفاده کنید
   - شناسه بله: از [@userinfo_idbot](https://ble.ir/userinfo_idbot) یا [@ShowChatdBot](https://ble.ir/ShowChatdBot) استفاده کنید
   - شناسه روبیکا: بعد از استقرار، `/start` را به ربات روبیکا بفرستید — ربات شناسه عددی شما را نمایش می‌دهد

---

## پیکربندی

فایل `index.js` را باز کرده و متغیرهای بالای فایل را ویرایش کنید:

<div dir="ltr">

```javascript
const BOT_TOKEN = "توکن_ربات_تلگرام_شما";
const BALE_BOT_TOKEN = "توکن_ربات_بله_شما";
const RUBIKA_BOT_TOKEN = "توکن_ربات_روبیکا_شما";
const BOT_WEBHOOK = "/endpoint";
const BALE_WEBHOOK = "/bale-endpoint";
const RUBIKA_WEBHOOK = "/rubika-endpoint";

// نگاشت کاربری: شناسه تلگرام → { بله، روبیکا }
// هر دو کلید اختیاری هستند — فقط آنچه نیاز دارید را وارد کنید
const USER_MAPPING = {
  "TELEGRAM_USER_ID": {
    bale: "BALE_USER_ID",
    rubika: "RUBIKA_CHAT_ID", // اگر روبیکا ندارید این خط را حذف کنید
  },
};
```

</div>

همچنین لینک رابط وب را در پیام خوش‌آمدگویی `/start` پیدا کرده (عبارت `your-pages-site.pages.dev` را جستجو کنید) و با آدرس واقعی Worker خود جایگزین کنید.

---

## استقرار

فقط **یک فایل** برای استقرار نیاز است: `index.js`. رابط وب داخل آن تعبیه شده است.

### روش ۱: Wrangler CLI (پیشنهادی)

نیاز به [Node.js](https://nodejs.org/) دارد.

<div dir="ltr">

```bash
npm install
npx wrangler login
npm run deploy
```

</div>

Wrangler آدرس Worker شما را نمایش خواهد داد (مثلاً `https://tg2bale.your-subdomain.workers.dev`).

### روش ۲: داشبورد Cloudflare (دستی)

۱. وارد [داشبورد Cloudflare](https://dash.cloudflare.com/) شوید
۲. به **Workers & Pages** → **Create Application** → **Start with Hello World** بروید
۳. نام Worker را وارد کنید (مثلاً `tg2bale`) و روی **Deploy** کلیک کنید
۴. روی **Edit Code** در بالا سمت راست کلیک کنید
۵. تمام کد پیش‌فرض را پاک کنید
۶. فایل `index.js` را باز کنید، تمام محتوا را کپی کرده و در ویرایشگر paste کنید
۷. توکن‌ها و `USER_MAPPING` را مستقیماً در ویرایشگر به‌روز کنید
۸. روی **Save and Deploy** کلیک کنید

---

## تنظیم Webhook ها

بعد از استقرار، باید Webhook هر پلتفرمی که استفاده می‌کنید را ثبت کنید. هر آدرس را یک‌بار در مرورگر باز کنید:

### تلگرام

<div dir="ltr">

```
https://YOUR_WORKER_DOMAIN/registerWebhook
```

پاسخ موفق:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

</div>

### بله

<div dir="ltr">

```
https://YOUR_WORKER_DOMAIN/registerBaleWebhook
```

پاسخ موفق:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

</div>

### روبیکا

<div dir="ltr">

```
https://YOUR_WORKER_DOMAIN/registerRubikaWebhook
```

پاسخ موفق:
```json
{"status":"OK","data":{"status":"Done"}}
```

</div>

> **نکته مهم برای روبیکا:** سرورهای روبیکا داخل ایران هستند و برای تأیید آدرس Webhook شما یک درخواست آزمایشی ارسال می‌کنند. اگر روی `*.workers.dev` هاست می‌کنید، سرورهای روبیکا ممکن است نتوانند به آن دسترسی داشته باشند چون این دامنه در ایران فیلتر است. در این صورت یک **دامنه شخصی** به Worker خود اضافه کنید (از داشبورد CF → Worker → Settings → Domains & Routes) و Webhook روبیکا را با آن دامنه ثبت کنید.

---

## رابط وب

با باز کردن آدرس Worker در مرورگر، صفحه‌ای با دو ابزار نمایش داده می‌شود:

- **ترکیب قطعات** — تمام فایل‌های `.partNofM` دریافتی را آپلود کنید تا فایل اصلی بازسازی و دانلود شود — کاملاً در مرورگر، بدون ارسال به سرور
- **تغییر نام فایل** — ابزار ساده برای تغییر نام هر فایل و دانلود آن با نام صحیح

نیازی به هاست جداگانه نیست. صفحه کاملاً سمت کلاینت اجرا می‌شود.

---

## نحوه استفاده

### ربات تلگرام
۱. `/start` بفرستید تا مطمئن شوید ربات کار می‌کند و پلتفرم‌های پیکربندی‌شده را ببینید
۲. **فایل بفرستید** (عکس، ویدیو، صدا یا سند زیر ۲۰ مگابایت) — به تمام گیرندگان پیکربندی‌شده به‌صورت همزمان ارسال می‌شود
۳. **لینک بفرستید** — ربات آن را دانلود کرده و برای همه گیرندگان ارسال می‌کند
۴. فایل‌هایی که فیلتر می‌شوند (APK، EXE و غیره) به‌صورت خودکار زیپ می‌شوند — گیرنده فقط باید زیپ را باز کند

### ربات بله
۱. `/start` بفرستید تا مطمئن شوید ربات کار می‌کند
۲. **لینک دانلود مستقیم بفرستید** — ربات آن را دانلود کرده و فایل را در بله برای شما ارسال می‌کند
۳. فایل‌های بزرگ به قطعات تقسیم می‌شوند — از ابزار وب یا دستور `cat` نمایش داده‌شده برای ترکیب استفاده کنید

### ربات روبیکا
۱. `/start` بفرستید تا مطمئن شوید ربات کار می‌کند
۲. **لینک دانلود مستقیم بفرستید** — ربات آن را دانلود کرده و فایل را در روبیکا برای شما ارسال می‌کند
۳. فایل‌های بزرگ به قطعات تقسیم می‌شوند — از ابزار وب برای ترکیب آن‌ها استفاده کنید

---

## استقرار روی Vercel

Vercel می‌تواند این پروژه را به‌عنوان یک تابع serverless هاست کند. پلن رایگان محدودیت **۱۰ ثانیه** برای اجرای تابع دارد که برای فایل‌های کوچک و دانلود URL کافی است. برای فایل‌های بزرگ یا منابع کند، به پلن Pro ارتقا دهید یا از VPS استفاده کنید.

### ۱. نصب وابستگی‌ها

<div dir="ltr">

```bash
npm install
```

</div>

### ۲. ایجاد نقطه ورود Vercel

فایل `api/index.js` را در ریشه پروژه بسازید:

<div dir="ltr">

```javascript
import handler from '../index.js';

export default async function (req, res) {
  const url = `https://${req.headers.host}${req.url}`;
  const init = { method: req.method, headers: req.headers };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await new Promise((resolve) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  const request = new Request(url, init);
  const response = await handler.fetch(request);

  res.status(response.status);
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}
```

</div>

### ۳. افزودن فایل `vercel.json`

<div dir="ltr">

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api/index" }]
}
```

</div>

### ۴. به‌روز‌رسانی انتهای `index.js`

بلوک `addEventListener` انتهای `index.js` را با این جایگزین کنید:

<div dir="ltr">

```javascript
if (typeof addEventListener !== 'undefined') {
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
}

export default { fetch: handleRequest };
```

</div>

### ۵. استقرار

<div dir="ltr">

```bash
npm install -g vercel
vercel login
vercel --prod
```

</div>

### ۶. ثبت Webhook ها

<div dir="ltr">

```
https://your-project.vercel.app/registerWebhook
https://your-project.vercel.app/registerBaleWebhook
https://your-project.vercel.app/registerRubikaWebhook
```

</div>

> دامنه `.vercel.app` در ایران فیلتر نیست، بنابراین Webhook روبیکا بدون نیاز به دامنه شخصی کار می‌کند.

---

## استقرار روی VPS

اجرا روی VPS کنترل کامل را به شما می‌دهد — بدون محدودیت زمانی، بدون سرد شدن، بدون محدودیت درخواست. هر VPS اوبونتو/دبیان با ۵۱۲ مگابایت RAM کافی است.

### ۱. راه‌اندازی سرور

<div dir="ltr">

```bash
sudo apt update && sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx
node -v  # باید ۱۸+ باشد
```

</div>

### ۲. کلون پروژه و نصب وابستگی‌ها

<div dir="ltr">

```bash
git clone https://github.com/your/repo.git tgbale && cd tgbale
npm install
```

</div>

### ۳. به‌روز‌رسانی `index.js` برای پشتیبانی از Node.js

بلوک `addEventListener` انتهای `index.js` را با این جایگزین کنید:

<div dir="ltr">

```javascript
if (typeof addEventListener !== 'undefined') {
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
}

if (typeof process !== 'undefined' && process.versions?.node) {
  const { createServer } = await import('node:http');
  const PORT = process.env.PORT || 8787;

  createServer(async (req, res) => {
    const url = `http://${req.headers.host}${req.url}`;
    const init = { method: req.method, headers: req.headers };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = await new Promise((resolve) => {
        const chunks = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', () => resolve(Buffer.concat(chunks)));
      });
    }

    const response = await handleRequest(new Request(url, init));
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  }).listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
```

</div>

### ۴. دریافت گواهی SSL

<div dir="ltr">

```bash
sudo certbot --nginx -d yourdomain.com
```

</div>

### ۵. پیکربندی nginx به‌عنوان پروکسی معکوس

<div dir="ltr">

```bash
sudo nano /etc/nginx/sites-available/tgbale
```

</div>

محتوای زیر را paste کنید:

<div dir="ltr">

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/tgbale /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

</div>

### ۶. اجرا با PM2

<div dir="ltr">

```bash
npm install -g pm2
pm2 start "node index.js" --name tgbale
pm2 save && pm2 startup
```

</div>

### ۷. ثبت Webhook ها

<div dir="ltr">

```
https://yourdomain.com/registerWebhook
https://yourdomain.com/registerBaleWebhook
https://yourdomain.com/registerRubikaWebhook
```

</div>

### دستورات مفید PM2

<div dir="ltr">

```bash
pm2 logs tgbale        # مشاهده لاگ‌های زنده
pm2 restart tgbale     # ری‌استارت بعد از تغییر کد
pm2 stop tgbale        # توقف سرور
```

</div>

---

## مقایسه پلتفرم‌ها

| | Cloudflare Workers | Vercel | VPS |
|---|---|---|---|
| هزینه | پلن رایگان موجود | پلن رایگان موجود | ~۴–۶ دلار در ماه |
| محدودیت زمانی | بر اساس CPU | ۱۰ ثانیه (رایگان) / ۶۰ ثانیه (Pro) | ندارد |
| پشتیبانی از فایل بزرگ | محدود | محدود | ✅ کامل |
| نیاز به دامنه برای روبیکا | بله (workers.dev فیلتر است) | خیر | خیر |
| سختی راه‌اندازی | آسان | آسان | متوسط |

---

## عیب‌یابی

### مشاهده لاگ‌های Worker
۱. [داشبورد Cloudflare](https://dash.cloudflare.com/) → **Workers & Pages** → Worker شما
۲. تب **Observability** را باز کنید
۳. به **Settings** بروید و **Workers Logs** را فعال کنید
۴. به Observability برگردید و روی **Live** کلیک کنید

### مشکلات رایج

| مشکل | علت | راه‌حل |
|---|---|---|
| روبیکا `InvalidUrl` برمی‌گرداند | سرورهای روبیکا نمی‌توانند به `workers.dev` دسترسی داشته باشند | دامنه شخصی به Worker اضافه کنید |
| ربات بله به `/start` یا لینک پاسخ نمی‌دهد | `parse_mode: 'Markdown'` باعث خطای خاموش API می‌شد | رفع شده — پیام‌های بله بدون parse_mode ارسال می‌شوند |
| `Error: Network connection lost` در لاگ‌ها | اتصال خروجی به API بله/روبیکا قطع شد | معمولاً موقتی است — دوباره امتحان کنید |
| پیام خطای عدم مجوز شناسه نمایش نمی‌دهد | فرمت شناسه در هر پلتفرم متفاوت است | حالت نمایش شناسه موقت را در کد فعال کنید |

---

## نکات

- API ربات تلگرام محدودیت سخت **۲۰ مگابایت** برای دانلود فایل دارد. فایل‌های بزرگ‌تر را نمی‌توان مستقیم از تلگرام ارسال کرد — به جای آن از لینک دانلود مستقیم استفاده کنید
- برای ارسال از طریق URL محدودیت حجمی وجود ندارد، تا زمانی که دانلود در محدوده زمانی CPU پلتفرم هاست کامل شود
- ویژگی زیپ خودکار فقط روی فایل‌های غیررسانه‌ای و غیرفشرده اعمال می‌شود. عکس، ویدیو، صدا، PDF و آرشیوهای موجود همان‌طور که هستند ارسال می‌شوند
- ربات‌های بله و روبیکا فقط لینک قبول می‌کنند — فایل ارسال‌شده مستقیم را دریافت نمی‌کنند
- هر کاربر تلگرام می‌تواند به یک گیرنده بله، یک گیرنده روبیکا یا هر دو نگاشت داده شود

---

با تشکر از [ixabolfazl](https://github.com/ixabolfazl/telegram-to-bale-file-transfer-bot) برای ایده اولیه.

</div>
