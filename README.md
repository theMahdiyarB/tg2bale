# Telegram to Bale File Transfer Bot

A Cloudflare Worker that bridges Telegram and Bale messenger — forwarding files, media, and download links from authorized Telegram users to their mapped Bale recipients. Only one file (`worker.js`) needs to be deployed.

## Features

- **File Forwarding** — Forwards Documents, Photos, Videos, and Audio files from Telegram to Bale
- **Direct Link Downloads** — Send any `http/https` URL and the bot will download and forward the file automatically (no size limit)
- **Auto-Zip** — Files with formats that Bale filters (e.g. APK, EXE, ISO) are automatically wrapped in a `.zip` before sending. The original filename is preserved inside the zip — the recipient just extracts it normally
- **Chunked Transfers** — Files larger than 19 MB are automatically split into numbered parts and sent sequentially. A reassembly tool is built into the web UI
- **Built-in Web UI** — Opening your Worker URL in a browser serves a reassembly/rename tool page (no separate hosting needed)
- **Authorization** — Only users defined in `USER_MAPPING` can use the bot
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
const BOT_WEBHOOK = "/endpoint"; // Leave as-is unless you have a reason to change it

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

## Setting Up the Webhook

After deploying, you need to register your Worker URL with Telegram once:

1. Visit the following URL in your browser:
   ```
   https://tg2bale.<your-subdomain>.workers.dev/registerWebhook
   ```
2. You should see:
   ```json
   {"ok":true,"result":true,"description":"Webhook was set"}
   ```

That's it — Telegram will now forward all bot messages to your Worker.

---

## Web UI

Opening your Worker URL in a browser (e.g. `https://tg2bale.<your-subdomain>.workers.dev/`) serves a built-in tools page with two features:

- **Chunk Reassembler** — Upload all received `.partNofM` chunk files and download the reassembled original file, entirely in-browser with no server upload
- **File Renamer** — A simple tool to rename any file and download it with the corrected name

No separate hosting is needed. The page runs 100% client-side.

---

## Usage

1. Open your Telegram bot and send `/start` to verify it's working
2. **Send a file** (photo, video, audio, or document under 20 MB) — it will be forwarded to Bale automatically
3. **Send a URL** (starting with `http://` or `https://`) — the bot will download it and forward it to Bale
4. Files that Bale would normally block (APK, EXE, etc.) are automatically zipped — the recipient extracts the zip to get the original file
5. Files over 19 MB from a URL are split into chunks — the recipient uses the web UI or runs the shown `cat` command to reassemble them

---

## Notes

- Telegram's Bot API has a hard **20 MB limit** for file downloads. Files larger than this sent directly via Telegram cannot be forwarded — send a direct download URL instead
- There is no size limit when forwarding via URL, as long as the download completes within Cloudflare's Worker CPU time limits (typically sufficient for files up to a few hundred MB)
- The auto-zip feature wraps only non-media, non-archive files. Images, videos, audio, PDFs, and existing archives are always forwarded as-is
