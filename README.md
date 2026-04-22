# Telegram to Bale File Transfer Bot

A Cloudflare Worker that bridges Telegram and Bale messenger — forwarding files, media, and download links from authorized Telegram users to their mapped Bale recipients. Only one file (`worker.js`) needs to be deployed.

## Features

- **File Forwarding** — Forwards Documents, Photos, Videos, and Audio files from Telegram to Bale
- **Direct Link Downloads (Telegram)** — Send any `http/https` URL to the Telegram bot and it will download and forward the file to Bale automatically
- **Direct Link Downloads (Bale)** — Send any `http/https` URL directly in Bale and the bot will download and send the file back to you — no Telegram needed
- **Auto-Zip** — Files with formats that Bale filters (e.g. APK, EXE, ISO) are automatically wrapped in a `.zip` before sending. The original filename is preserved inside the zip — the recipient just extracts it normally
- **Chunked Transfers** — Files larger than 19 MB are automatically split into numbered parts and sent sequentially. A reassembly tool is built into the web UI
- **Built-in Web UI** — Opening your Worker URL in a browser serves a reassembly/rename tool page (no separate hosting needed)
- **Authorization** — Only users defined in `USER_MAPPING` can use the bot on both Telegram and Bale
- **Serverless** — Runs entirely on Cloudflare Workers. No VPS required

---

## Prerequisites

1. **Cloudflare Account** — [Sign up here](https://dash.cloudflare.com/sign-up)
2. **Telegram Bot Token** — Get it from [@BotFather](https://t.me/BotFather)
3. **Bale Bot Token** — Get it from [@BotFather](https://ble.ir/botfather) on Bale
4. **User IDs**
   - Telegram User ID: use [@userinfobot](https://t.me/userinfobot)
   - Bale User ID: use [@userinfo_idbot](https://ble.ir/userinfo_idbot) or [@ShowChatdBot](https://ble.ir/ShowChatdBot)

---

## Configuration

Open `worker.js` and edit the variables at the top of the file:

```javascript
const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const BALE_BOT_TOKEN = "YOUR_BALE_BOT_TOKEN";
const BOT_WEBHOOK = "/endpoint";       // Telegram webhook path
const BALE_WEBHOOK = "/bale-endpoint"; // Bale webhook path

// User Mapping: Telegram Sender ID → Bale Recipient ID
const USER_MAPPING = {
  "123456789": "987654321", // Add more pairs as needed
};
```

Also update the web UI link in the `/start` welcome message (search for `your-pages-site.pages.dev`) and replace it with your actual Worker URL.

---

## Deployment

There is only **one file** to deploy: `worker.js`. The web UI is embedded inside it.

### Method 1: Wrangler CLI (Recommended)

Requires [Node.js](https://nodejs.org/) installed.

```bash
npm install
npx wrangler login
npm run deploy
```

Wrangler will output your live Worker URL (e.g. `https://tg2bale.<your-subdomain>.workers.dev`).

### Method 2: Cloudflare Dashboard (Manual)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Create Application** → **Start with Hello World**
3. Name your worker (e.g. `tg2bale`) and click **Deploy**
4. Click **Edit Code** in the top right
5. Delete all the default code in the editor
6. Open `worker.js`, copy everything, and paste it into the editor
7. Update `BOT_TOKEN`, `BALE_BOT_TOKEN`, and `USER_MAPPING` directly in the editor
8. Click **Save and Deploy**

---

## Setting Up the Webhooks

After deploying, you need to register webhooks for **both** Telegram and Bale. Visit each URL once in your browser:

### Telegram
```
https://YOUR_WORKER_DOMAIN.workers.dev/registerWebhook
```
Expected response:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### Bale
```
https://YOUR_WORKER_DOMAIN.workers.dev/registerBaleWebhook
```
Expected response:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

Both must be registered before the bot will respond on either platform.

---

## Web UI

Opening your Worker URL in a browser (e.g. `https://tg2bale.<your-subdomain>.workers.dev/`) serves a built-in tools page with two features:

- **Chunk Reassembler** — Upload all received `.partNofM` chunk files and download the reassembled original file, entirely in-browser with no server upload
- **File Renamer** — A simple tool to rename any file and download it with the corrected name

No separate hosting is needed. The page runs 100% client-side.

---

## Usage

### Telegram Bot
1. Send `/start` to verify it's working
2. **Send a file** (photo, video, audio, or document under 20 MB) — it will be forwarded to the mapped Bale user automatically
3. **Send a URL** — the bot downloads it and forwards it to Bale (no size limit beyond Cloudflare's CPU timeout)
4. Files Bale would normally block (APK, EXE, etc.) are automatically zipped — the recipient just extracts the zip

### Bale Bot
1. Send `/start` to verify it's working
2. **Send a direct download URL** — the bot downloads it and sends the file back to you in Bale
3. Large files are split into chunks automatically — use the web UI or the shown `cat` command to reassemble them

---

## Notes

- Telegram's Bot API has a hard **20 MB limit** for file downloads by bots. Files larger than this sent directly via Telegram cannot be forwarded — use a direct download URL instead
- There is no size limit when forwarding via URL, as long as the download completes within Cloudflare's Worker CPU time limits (typically sufficient for files up to a few hundred MB)
- The auto-zip feature wraps only non-media, non-archive files. Images, videos, audio, PDFs, and existing archives are always forwarded as-is
- The Bale bot only accepts URLs — it does not forward files sent directly to it, since Bale users are the recipients, not the senders