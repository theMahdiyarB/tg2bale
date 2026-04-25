# Telegram to Bale & Rubika File Transfer Bot

A Cloudflare Worker that bridges Telegram, Bale, and Rubika — forwarding files, media, and download links from authorized Telegram users to their mapped recipients on Bale and/or Rubika. Only one file (`index.js`) needs to be deployed.

## Features

- **File Forwarding** — Forwards Documents, Photos, Videos, and Audio files from Telegram to Bale and/or Rubika simultaneously
- **Direct Link Downloads (Telegram)** — Send any `http/https` URL to the Telegram bot and it will download and forward the file automatically
- **Direct Link Downloads (Bale)** — Send a direct download URL in Bale and the bot will download and send the file back to you
- **Direct Link Downloads (Rubika)** — Send a direct download URL in Rubika and the bot will download and send the file back to you
- **Auto-Zip** — Files with formats that Bale or Rubika filter (e.g. APK, EXE, ISO) are automatically wrapped in a `.zip` before sending. The original filename is preserved inside the zip — the recipient just extracts it normally
- **Chunked Transfers** — Files larger than 19 MB are automatically split into numbered parts and sent sequentially. A reassembly tool is built into the web UI
- **Built-in Web UI** — Opening your Worker URL in a browser serves a reassembly/rename tool page (no separate hosting needed)
- **Authorization** — Only users defined in `USER_MAPPING` can use the bot on all three platforms
- **Serverless** — Runs entirely on Cloudflare Workers. No VPS required

---

## Prerequisites

1. **Cloudflare Account** — [Sign up here](https://dash.cloudflare.com/sign-up)
2. **Telegram Bot Token** — Get it from [@BotFather](https://t.me/BotFather)
3. **Bale Bot Token** — Get it from [@BotFather](https://ble.ir/botfather) on Bale
4. **Rubika Bot Token** — Get it from [@BotFather](https://rubika.ir/botfather) on Rubika
5. **User IDs**
   - Telegram User ID: use [@userinfobot](https://t.me/userinfobot)
   - Bale User ID: use [@userinfo_idbot](https://ble.ir/userinfo_idbot) or [@ShowChatdBot](https://ble.ir/ShowChatdBot)
   - Rubika Chat ID: send `/start` to your Rubika bot after deploying — the bot will reply with your numeric ID

---

## Configuration

Open `index.js` and edit the variables at the top of the file:

```javascript
const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const BALE_BOT_TOKEN = "YOUR_BALE_BOT_TOKEN";
const RUBIKA_BOT_TOKEN = "YOUR_RUBIKA_BOT_TOKEN";
const BOT_WEBHOOK = "/endpoint";          // Telegram webhook path
const BALE_WEBHOOK = "/bale-endpoint";    // Bale webhook path
const RUBIKA_WEBHOOK = "/rubika-endpoint"; // Rubika webhook path

// User Mapping: Telegram Sender ID → { bale, rubika } recipients
// Both bale and rubika are optional — include only the ones you need.
const USER_MAPPING = {
  "TELEGRAM_USER_ID": {
    bale: "BALE_USER_ID",
    rubika: "RUBIKA_CHAT_ID", // remove this line if not using Rubika
  },
};
```

Also update the web UI link in the `/start` welcome message (search for `your-pages-site.pages.dev`) and replace it with your actual Worker URL.

> **Note on Rubika Chat ID:** The easiest way to find it is to temporarily enable the ID-reveal mode in the unauthorized message (see the code comment near the unauthorized check), send any message to your Rubika bot, and read the ID from the reply.

---

## Deployment

There is only **one file** to deploy: `index.js`. The web UI is embedded inside it.

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
6. Open `index.js`, copy everything, and paste it into the editor
7. Update all tokens and `USER_MAPPING` directly in the editor
8. Click **Save and Deploy**

---

## Setting Up the Webhooks

After deploying, register webhooks for every platform you use. Visit each URL once in your browser:

### Telegram
```
https://YOUR_WORKER_DOMAIN/registerWebhook
```
Expected response:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### Bale
```
https://YOUR_WORKER_DOMAIN/registerBaleWebhook
```
Expected response:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

### Rubika
```
https://YOUR_WORKER_DOMAIN/registerRubikaWebhook
```
Expected response:
```json
{"status":"OK","data":{"status":"Done"}}
```

> **Important for Rubika:** Rubika's servers are based in Iran and will validate your webhook URL by sending a test request to it. If you are hosting on `*.workers.dev`, Rubika's servers may not be able to reach it since Cloudflare's default subdomain is filtered in Iran. In that case, add a **custom domain** to your Worker via CF Dashboard → Worker → Settings → Domains & Routes, and register the Rubika webhook using that domain instead.

---

## Web UI

Opening your Worker URL in a browser serves a built-in tools page with two features:

- **Chunk Reassembler** — Upload all received `.partNofM` chunk files and download the reassembled original file, entirely in-browser with no server upload
- **File Renamer** — A simple tool to rename any file and download it with the corrected name

No separate hosting is needed. The page runs 100% client-side.

---

## Usage

### Telegram Bot
1. Send `/start` to verify it's working and see which platforms are configured
2. **Send a file** (photo, video, audio, or document under 20 MB) — it will be forwarded to all configured recipients simultaneously
3. **Send a URL** — the bot downloads it and forwards it to all configured recipients
4. Files that would be blocked (APK, EXE, etc.) are automatically zipped — recipients just extract the zip

### Bale Bot
1. Send `/start` to verify it's working
2. **Send a direct download URL** — the bot downloads it and sends the file back to you in Bale
3. Large files are split into chunks — use the web UI or the `cat` command shown in the message to reassemble

### Rubika Bot
1. Send `/start` to verify it's working
2. **Send a direct download URL** — the bot downloads it and sends the file back to you in Rubika
3. Large files are split into chunks — use the web UI to reassemble them

---

## Debugging

### Viewing Worker Logs
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → your worker
2. Click the **Observability** tab
3. Go to **Settings** and enable **Workers Logs**
4. Return to Observability and click **Live** to stream logs in real time

### Common Issues

| Problem | Cause | Fix |
|---|---|---|
| Rubika returns `InvalidUrl` on webhook registration | Rubika can't reach your `*.workers.dev` URL from inside Iran | Add a custom domain to your Worker and register using that |
| Bale bot doesn't respond to `/start` or URLs | `parse_mode: 'Markdown'` was causing silent API failures | Already fixed — Bale messages are now sent as plain text |
| `Error: Network connection lost` in CF logs | Outbound fetch to Bale/Rubika API timed out mid-transfer | Usually transient — retry the operation |
| Unauthorized message shows wrong/no ID | User ID format differs per platform | Use the temporary ID-reveal mode in the unauthorized message to find the correct numeric ID |

---

## Notes

- Telegram's Bot API has a hard **20 MB limit** for file downloads by bots. Files larger than this sent directly via Telegram cannot be forwarded — use a direct download URL instead
- There is no size limit when forwarding via URL, as long as the download completes within Cloudflare's Worker CPU time limits (typically sufficient for files up to a few hundred MB)
- The auto-zip feature wraps only non-media, non-archive files. Images, videos, audio, PDFs, and existing archives are always forwarded as-is
- Bale and Rubika bots only accept URLs — they do not forward files sent directly to them, since those platform users are the recipients, not the senders
- Each Telegram user can be mapped to a Bale recipient, a Rubika recipient, or both — simply omit the key you don't need in `USER_MAPPING`

---

Thanks to [ixabolfazl](https://github.com/ixabolfazl/telegram-to-bale-file-transfer-bot) for the original idea.