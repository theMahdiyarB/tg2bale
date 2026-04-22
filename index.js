// ==================== Embedded HTML ====================
const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>File Reassembler</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Space+Grotesk:wght@300;400;600&display=swap');

  :root {
    --bg: #0a0a0c;
    --surface: #111114;
    --surface2: #18181d;
    --border: #2a2a35;
    --border-bright: #3d3d50;
    --accent: #5b7bff;
    --accent2: #a78bfa;
    --green: #34d399;
    --red: #f87171;
    --yellow: #fbbf24;
    --text: #e8e8f0;
    --text-dim: #6b6b80;
    --text-muted: #3a3a4a;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Space Grotesk', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 20px 80px;
    position: relative;
    overflow-x: hidden;
  }

  /* Background grid */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(var(--text-muted) 1px, transparent 1px),
      linear-gradient(90deg, var(--text-muted) 1px, transparent 1px);
    background-size: 48px 48px;
    opacity: 0.12;
    pointer-events: none;
  }

  /* Glow blobs */
  body::after {
    content: '';
    position: fixed;
    top: -200px;
    left: -200px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(91,123,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .glow-blob {
    position: fixed;
    bottom: -150px;
    right: -150px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Header */
  header {
    text-align: center;
    margin-bottom: 52px;
    position: relative;
    z-index: 1;
  }

  .logo-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 12px;
  }

  .logo-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    box-shadow: 0 0 32px rgba(91,123,255,0.35);
  }

  h1 {
    font-family: var(--mono);
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--text);
  }

  .subtitle {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text-dim);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 6px;
  }

  /* Badge */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(91,123,255,0.1);
    border: 1px solid rgba(91,123,255,0.25);
    border-radius: 20px;
    padding: 4px 12px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent);
    margin-top: 14px;
  }

  .badge::before { content: '●'; font-size: 8px; animation: pulse 2s ease-in-out infinite; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* Main card */
  .card {
    width: 100%;
    max-width: 680px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  .card-header {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface2);
  }

  .traffic-lights { display: flex; gap: 7px; }
  .dot {
    width: 12px; height: 12px;
    border-radius: 50%;
  }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }

  .card-title {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text-dim);
    margin-left: 6px;
    letter-spacing: 0.04em;
  }

  .card-body { padding: 32px 28px; }

  /* Drop zone */
  .dropzone {
    border: 2px dashed var(--border-bright);
    border-radius: 14px;
    padding: 48px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    background: rgba(255,255,255,0.01);
  }

  .dropzone:hover, .dropzone.drag-over {
    border-color: var(--accent);
    background: rgba(91,123,255,0.05);
    box-shadow: 0 0 0 4px rgba(91,123,255,0.08);
  }

  .dropzone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .drop-icon {
    font-size: 40px;
    margin-bottom: 16px;
    display: block;
    transition: transform 0.2s;
  }

  .dropzone:hover .drop-icon { transform: translateY(-4px); }

  .drop-title {
    font-family: var(--mono);
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 6px;
  }

  .drop-sub {
    font-size: 12px;
    color: var(--text-dim);
    font-family: var(--mono);
    line-height: 1.6;
  }

  .drop-sub code {
    color: var(--accent2);
    background: rgba(167,139,250,0.1);
    padding: 1px 6px;
    border-radius: 4px;
  }

  /* File list */
  .file-list-section {
    margin-top: 28px;
    display: none;
  }

  .file-list-section.visible { display: block; }

  .section-label {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .clear-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-family: var(--mono);
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .clear-btn:hover {
    border-color: var(--red);
    color: var(--red);
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .file-item {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: border-color 0.2s;
    animation: slideIn 0.2s ease forwards;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .file-item.valid { border-color: rgba(52,211,153,0.2); }
  .file-item.invalid { border-color: rgba(248,113,113,0.2); }
  .file-item.unknown { border-color: var(--border); }

  .file-part-badge {
    font-family: var(--mono);
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    min-width: 60px;
    text-align: center;
    flex-shrink: 0;
  }

  .file-part-badge.ok {
    background: rgba(52,211,153,0.12);
    color: var(--green);
    border: 1px solid rgba(52,211,153,0.25);
  }

  .file-part-badge.bad {
    background: rgba(248,113,113,0.12);
    color: var(--red);
    border: 1px solid rgba(248,113,113,0.25);
  }

  .file-part-badge.unk {
    background: rgba(251,191,36,0.12);
    color: var(--yellow);
    border: 1px solid rgba(251,191,36,0.25);
  }

  .file-info {
    flex: 1;
    min-width: 0;
  }

  .file-name {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file-meta {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-dim);
    margin-top: 3px;
  }

  .remove-file {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s;
    flex-shrink: 0;
  }

  .remove-file:hover { color: var(--red); }

  /* Status / diagnostics */
  .status-box {
    margin-top: 20px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 18px;
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.7;
    display: none;
  }

  .status-box.visible { display: block; }

  .status-line {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .status-icon { flex-shrink: 0; }
  .status-ok    { color: var(--green); }
  .status-warn  { color: var(--yellow); }
  .status-err   { color: var(--red); }
  .status-info  { color: var(--accent); }

  /* Assemble button */
  .assemble-btn {
    margin-top: 24px;
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: var(--mono);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    display: none;
  }

  .assemble-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .assemble-btn:hover::before { opacity: 1; }
  .assemble-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(91,123,255,0.4); }
  .assemble-btn:active { transform: translateY(0); }
  .assemble-btn.visible { display: block; }
  .assemble-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* Progress */
  .progress-section {
    margin-top: 24px;
    display: none;
  }

  .progress-section.visible { display: block; }

  .progress-label {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }

  .progress-bar-bg {
    height: 6px;
    background: var(--surface2);
    border-radius: 99px;
    overflow: hidden;
    border: 1px solid var(--border);
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 99px;
    width: 0%;
    transition: width 0.3s ease;
    box-shadow: 0 0 12px rgba(91,123,255,0.5);
  }

  /* Download card */
  .download-card {
    margin-top: 28px;
    background: rgba(52,211,153,0.06);
    border: 1px solid rgba(52,211,153,0.2);
    border-radius: 14px;
    padding: 24px;
    text-align: center;
    display: none;
    animation: fadeUp 0.35s ease forwards;
  }

  .download-card.visible { display: block; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .download-card .check {
    font-size: 36px;
    margin-bottom: 10px;
  }

  .download-card h3 {
    font-family: var(--mono);
    font-size: 14px;
    color: var(--green);
    margin-bottom: 4px;
  }

  .download-card p {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    margin-bottom: 18px;
  }

  .download-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--green);
    color: #000;
    padding: 11px 24px;
    border-radius: 10px;
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }

  .download-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(52,211,153,0.35);
  }

  /* Info section */
  .info-section {
    margin-top: 48px;
    width: 100%;
    max-width: 680px;
    position: relative;
    z-index: 1;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @media (max-width: 500px) { .info-grid { grid-template-columns: 1fr; } }

  .info-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px 18px;
  }

  .info-card h4 {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }

  .info-card p {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.6;
  }

  .info-card code {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--accent2);
    background: rgba(167,139,250,0.1);
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
    margin-top: 4px;
  }

  /* Terminal log */
  .log {
    margin-top: 20px;
    background: #080808;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    max-height: 140px;
    overflow-y: auto;
    display: none;
  }

  .log.visible { display: block; }

  .log-line { line-height: 1.8; }
  .log-line .ts { color: var(--text-muted); }
  .log-line .ok { color: var(--green); }
  .log-line .err { color: var(--red); }
  .log-line .inf { color: var(--accent); }

  /* Rename section */
  .rename-card {
    width: 100%;
    max-width: 680px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    margin-top: 28px;
  }

  .rename-body { padding: 28px 28px; }

  .rename-intro {
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.6;
    margin-bottom: 22px;
    font-family: var(--mono);
  }

  .rename-intro strong { color: var(--accent2); }

  .rename-drop {
    border: 2px dashed var(--border-bright);
    border-radius: 14px;
    padding: 36px 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    background: rgba(255,255,255,0.01);
  }

  .rename-drop:hover, .rename-drop.drag-over {
    border-color: var(--accent2);
    background: rgba(167,139,250,0.05);
    box-shadow: 0 0 0 4px rgba(167,139,250,0.08);
  }

  .rename-drop input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .rename-drop .drop-icon { font-size: 32px; margin-bottom: 10px; }

  .rename-queue {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .rename-item {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    animation: slideIn 0.2s ease forwards;
  }

  .rename-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .rename-original {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rename-arrow { color: var(--text-muted); font-size: 14px; flex-shrink: 0; }

  .rename-input-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 2;
    min-width: 160px;
  }

  .rename-input {
    flex: 1;
    background: var(--bg);
    border: 1px solid var(--border-bright);
    border-radius: 8px;
    padding: 7px 11px;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
    min-width: 0;
  }

  .rename-input:focus { border-color: var(--accent2); }

  .rename-dl-btn {
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    border: none;
    border-radius: 8px;
    color: #fff;
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    padding: 8px 14px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .rename-dl-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(167,139,250,0.35);
  }

  .rename-size {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-muted);
    margin-top: 5px;
  }

  .rename-clear-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-family: var(--mono);
    font-size: 10px;
    padding: 3px 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .rename-clear-btn:hover { border-color: var(--red); color: var(--red); }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 99px; }
</style>
</head>
<body>
<div class="glow-blob"></div>

<header>
  <div class="logo-row">
    <div class="logo-icon">🧩</div>
    <h1>reassemble</h1>
  </div>
  <p class="subtitle">Chunk File Assembler — Runs 100% in your browser</p>
  <div class="badge">no upload · no server · private</div>
</header>

<div class="card">
  <div class="card-header">
    <div class="traffic-lights">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
    </div>
    <span class="card-title">assembler.js — ready</span>
  </div>
  <div class="card-body">

    <div class="dropzone" id="dropzone">
      <input type="file" id="fileInput" multiple accept="*/*">
      <span class="drop-icon">📂</span>
      <div class="drop-title">Drop your chunk files here</div>
      <div class="drop-sub">
        or click to browse<br><br>
        Expects files named like<br>
        <code>filename.part1of3.ext</code> &nbsp;·&nbsp; <code>filename.part2of3.ext</code> &nbsp;·&nbsp; <code>filename.part3of3.ext</code>
      </div>
    </div>

    <div class="file-list-section" id="fileListSection">
      <div class="section-label">
        <span id="fileCountLabel">0 files loaded</span>
        <button class="clear-btn" onclick="clearAll()">✕ clear all</button>
      </div>
      <div class="file-list" id="fileList"></div>
    </div>

    <div class="status-box" id="statusBox"></div>

    <div class="log" id="log"></div>

    <div class="progress-section" id="progressSection">
      <div class="progress-label">
        <span id="progressLabel">Assembling...</span>
        <span id="progressPct">0%</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="progressFill"></div>
      </div>
    </div>

    <button class="assemble-btn" id="assembleBtn" onclick="assemble()">
      ⚡ Assemble File
    </button>

    <div class="download-card" id="downloadCard">
      <div class="check">✅</div>
      <h3>Assembly complete!</h3>
      <p id="downloadMeta"></p>
      <a id="downloadLink" class="download-btn" href="#">
        ⬇ Download File
      </a>
    </div>

  </div>
</div>

<div class="info-section">
  <div class="info-grid">
    <div class="info-card">
      <h4>How it works</h4>
      <p>Upload all chunk files at once. The assembler sorts them by part number, merges the bytes, and triggers a browser download — nothing leaves your device.</p>
    </div>
    <div class="info-card">
      <h4>Expected format</h4>
      <p>Chunk files must follow the naming pattern generated by the bot:</p>
      <code>name.partNofM.ext</code>
    </div>
    <div class="info-card">
      <h4>Manual reassembly</h4>
      <p>On Linux/macOS you can also run:</p>
      <code>cat file.part*of3.ext &gt; file.ext</code>
    </div>
    <div class="info-card">
      <h4>Privacy</h4>
      <p>All processing is done locally in your browser using the File API. No data is ever transmitted to any server.</p>
    </div>
  </div>
</div>

<!-- ==================== Rename Tool ==================== -->
<div class="rename-card">
  <div class="card-header">
    <div class="traffic-lights">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
    </div>
    <span class="card-title">rename.js — manual file renamer</span>
  </div>
  <div class="rename-body">
    <div class="rename-intro">
      Most files are delivered as <strong>.zip</strong> — just extract them normally.<br>
      If you received a file that needs manual renaming, drop it here and set the correct filename.
    </div>

    <div class="rename-drop" id="renameDrop">
      <input type="file" id="renameInput" multiple accept="*/*">
      <div class="drop-icon">🏷️</div>
      <div class="drop-title">Drop file to rename</div>
      <div class="drop-sub">Type the correct filename, then click Save to download it</div>
    </div>

    <div id="renameQueue" class="rename-queue"></div>
  </div>
</div>

<script>
// ==================== State ====================
const state = {
  files: [],       // { file: File, partNum: number, totalParts: number, baseName: string, ext: string }
  objectUrl: null,
};

// ==================== DOM ====================
const dropzone      = document.getElementById('dropzone');
const fileInput     = document.getElementById('fileInput');
const fileListSec   = document.getElementById('fileListSection');
const fileList      = document.getElementById('fileList');
const fileCountLbl  = document.getElementById('fileCountLabel');
const statusBox     = document.getElementById('statusBox');
const assembleBtn   = document.getElementById('assembleBtn');
const progressSec   = document.getElementById('progressSection');
const progressLbl   = document.getElementById('progressLabel');
const progressPct   = document.getElementById('progressPct');
const progressFill  = document.getElementById('progressFill');
const downloadCard  = document.getElementById('downloadCard');
const downloadLink  = document.getElementById('downloadLink');
const downloadMeta  = document.getElementById('downloadMeta');
const logEl         = document.getElementById('log');

// ==================== Drag & Drop ====================
dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('drag-over');
  handleFiles([...e.dataTransfer.files]);
});
fileInput.addEventListener('change', e => handleFiles([...e.target.files]));

// ==================== File Handling ====================
const CHUNK_PATTERN = /^(.+)\\.part(\\d+)of(\\d+)(\\.\\w+)?$/i;

function parseChunkName(filename) {
  const m = filename.match(CHUNK_PATTERN);
  if (!m) return null;
  return {
    baseName:   m[1],
    partNum:    parseInt(m[2]),
    totalParts: parseInt(m[3]),
    ext:        m[4] || '',
  };
}

function handleFiles(newFiles) {
  // Reset download state when new files are added
  if (state.objectUrl) {
    URL.revokeObjectURL(state.objectUrl);
    state.objectUrl = null;
  }
  downloadCard.classList.remove('visible');
  progressSec.classList.remove('visible');

  for (const file of newFiles) {
    // Avoid duplicates
    if (state.files.find(f => f.file.name === file.name && f.file.size === file.size)) continue;
    const parsed = parseChunkName(file.name);
    state.files.push({ file, ...parsed });
  }

  renderFileList();
  updateStatus();
}

function removeFile(index) {
  state.files.splice(index, 1);
  renderFileList();
  updateStatus();
}

function clearAll() {
  state.files = [];
  if (state.objectUrl) { URL.revokeObjectURL(state.objectUrl); state.objectUrl = null; }
  renderFileList();
  updateStatus();
  downloadCard.classList.remove('visible');
  progressSec.classList.remove('visible');
  logEl.classList.remove('visible');
  logEl.innerHTML = '';
  fileInput.value = '';
}

function renderFileList() {
  if (state.files.length === 0) {
    fileListSec.classList.remove('visible');
    return;
  }

  fileListSec.classList.add('visible');
  fileCountLbl.textContent = \`\${state.files.length} file\${state.files.length > 1 ? 's' : ''} loaded\`;

  fileList.innerHTML = '';
  // Sort by part number for display
  const sorted = [...state.files].sort((a, b) => {
    if (a.partNum && b.partNum) return a.partNum - b.partNum;
    return a.file.name.localeCompare(b.file.name);
  });

  sorted.forEach((entry, _) => {
    const origIdx = state.files.indexOf(entry);
    const div = document.createElement('div');
    const isValid = entry.partNum !== null && entry.totalParts !== null;
    div.className = \`file-item \${isValid ? 'valid' : 'unknown'}\`;

    const badgeClass = isValid ? 'ok' : 'unk';
    const badgeText  = isValid ? \`\${entry.partNum}/\${entry.totalParts}\` : '?/?';

    div.innerHTML = \`
      <div class="file-part-badge \${badgeClass}">\${badgeText}</div>
      <div class="file-info">
        <div class="file-name" title="\${entry.file.name}">\${entry.file.name}</div>
        <div class="file-meta">\${formatSize(entry.file.size)}\${isValid ? '' : ' · non-chunk file'}</div>
      </div>
      <button class="remove-file" title="Remove" onclick="removeFile(\${origIdx})">×</button>
    \`;
    fileList.appendChild(div);
  });
}

// ==================== Status & Validation ====================
function updateStatus() {
  const validChunks = state.files.filter(f => f.partNum !== null);
  const nonChunks   = state.files.filter(f => f.partNum === null);

  statusBox.innerHTML = '';
  statusBox.classList.remove('visible');
  assembleBtn.classList.remove('visible');

  if (state.files.length === 0) return;

  const lines = [];

  if (nonChunks.length > 0) {
    lines.push({ cls: 'status-warn', icon: '⚠', text: \`\${nonChunks.length} file(s) don't match chunk naming — they'll be ignored.\` });
  }

  if (validChunks.length === 0) {
    lines.push({ cls: 'status-err', icon: '✕', text: 'No valid chunk files detected. Make sure files follow the <code>name.partNofM.ext</code> pattern.' });
    renderStatus(lines);
    return;
  }

  // Group by (baseName + totalParts)
  const groups = {};
  for (const c of validChunks) {
    const key = \`\${c.baseName}|\${c.totalParts}|\${c.ext}\`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  }

  let anyReady = false;

  for (const [key, chunks] of Object.entries(groups)) {
    const { baseName, totalParts, ext } = chunks[0];
    const outputName = \`\${baseName}\${ext}\`;
    const nums = chunks.map(c => c.partNum).sort((a,b) => a - b);
    const missing = [];
    for (let i = 1; i <= totalParts; i++) {
      if (!nums.includes(i)) missing.push(i);
    }
    const dupes = nums.filter((v, i, a) => a.indexOf(v) !== i);

    if (dupes.length > 0) {
      lines.push({ cls: 'status-err', icon: '✕', text: \`Duplicate parts found: \${dupes.join(', ')} for <code>\${outputName}</code>\` });
    } else if (missing.length > 0) {
      lines.push({ cls: 'status-warn', icon: '⚠', text: \`Missing parts \${missing.join(', ')} of \${totalParts} for <code>\${outputName}</code>\` });
    } else {
      lines.push({ cls: 'status-ok', icon: '✓', text: \`All \${totalParts} part\${totalParts>1?'s':''} present for <code>\${outputName}</code> — ready to assemble!\` });
      anyReady = true;
    }
  }

  renderStatus(lines);
  if (anyReady) assembleBtn.classList.add('visible');
}

function renderStatus(lines) {
  if (lines.length === 0) return;
  statusBox.classList.add('visible');
  statusBox.innerHTML = lines.map(l =>
    \`<div class="status-line \${l.cls}"><span class="status-icon">\${l.icon}</span><span>\${l.text}</span></div>\`
  ).join('');
}

// ==================== Assembly ====================
async function assemble() {
  const validChunks = state.files.filter(f => f.partNum !== null);

  // Group
  const groups = {};
  for (const c of validChunks) {
    const key = \`\${c.baseName}|\${c.totalParts}|\${c.ext}\`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  }

  // Find first complete group
  let targetGroup = null;
  for (const [, chunks] of Object.entries(groups)) {
    const { totalParts } = chunks[0];
    const nums = chunks.map(c => c.partNum);
    const allPresent = Array.from({length: totalParts}, (_, i) => i + 1).every(n => nums.includes(n));
    if (allPresent) { targetGroup = chunks; break; }
  }

  if (!targetGroup) return;

  const sorted = targetGroup.sort((a, b) => a.partNum - b.partNum);
  const outputName = \`\${sorted[0].baseName}\${sorted[0].ext}\`;
  const totalParts = sorted[0].totalParts;

  assembleBtn.disabled = true;
  downloadCard.classList.remove('visible');
  progressSec.classList.add('visible');
  logEl.classList.add('visible');
  logEl.innerHTML = '';

  appendLog('inf', \`Starting assembly of \${outputName} from \${totalParts} parts...\`);

  const buffers = [];
  let totalBytes = 0;

  for (let i = 0; i < sorted.length; i++) {
    const entry = sorted[i];
    progressLbl.textContent = \`Reading part \${i + 1} of \${totalParts}...\`;
    const pct = Math.round(((i) / totalParts) * 80);
    setProgress(pct);
    progressPct.textContent = \`\${pct}%\`;

    try {
      const buf = await readFileAsBuffer(entry.file);
      buffers.push(buf);
      totalBytes += buf.byteLength;
      appendLog('ok', \`Part \${entry.partNum}/\${totalParts} — \${formatSize(buf.byteLength)}\`);
    } catch (e) {
      appendLog('err', \`Failed to read part \${entry.partNum}: \${e.message}\`);
      assembleBtn.disabled = false;
      return;
    }
  }

  progressLbl.textContent = 'Merging buffers...';
  setProgress(90);
  progressPct.textContent = '90%';
  appendLog('inf', \`Merging \${formatSize(totalBytes)} total...\`);

  // Merge
  await sleep(30); // let UI update
  const merged = new Uint8Array(totalBytes);
  let offset = 0;
  for (const buf of buffers) {
    merged.set(new Uint8Array(buf), offset);
    offset += buf.byteLength;
  }

  setProgress(100);
  progressPct.textContent = '100%';
  progressLbl.textContent = 'Done!';

  appendLog('ok', \`Assembly complete — \${formatSize(totalBytes)}\`);

  // Create download
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  const blob = new Blob([merged]);
  state.objectUrl = URL.createObjectURL(blob);

  downloadLink.href = state.objectUrl;
  downloadLink.download = outputName;
  downloadMeta.textContent = \`\${outputName} · \${formatSize(totalBytes)}\`;
  downloadCard.classList.add('visible');

  assembleBtn.disabled = false;
}

function readFileAsBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('FileReader error'));
    reader.readAsArrayBuffer(file);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ==================== Log ====================
function appendLog(type, msg) {
  const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
  const div = document.createElement('div');
  div.className = 'log-line';
  div.innerHTML = \`<span class="ts">[\${ts}]</span> <span class="\${type}">\${msg}</span>\`;
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
}

// ==================== Progress ====================
function setProgress(pct) {
  progressFill.style.width = pct + '%';
}

// ==================== Utils ====================
function formatSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ==================== Rename Tool ====================

const renameDrop  = document.getElementById('renameDrop');
const renameInput = document.getElementById('renameInput');
const renameQueue = document.getElementById('renameQueue');

let renameFiles = []; // { file, suggestedName }

renameDrop.addEventListener('dragover', e => { e.preventDefault(); renameDrop.classList.add('drag-over'); });
renameDrop.addEventListener('dragleave', () => renameDrop.classList.remove('drag-over'));
renameDrop.addEventListener('drop', e => {
  e.preventDefault();
  renameDrop.classList.remove('drag-over');
  handleRenameFiles([...e.dataTransfer.files]);
});
renameInput.addEventListener('change', e => handleRenameFiles([...e.target.files]));

function suggestRename(name) {
  // The disguised file is sent as "basename.pdf" with no original extension embedded.
  // We can't guess the real name — the user must read it from the Bale caption.
  // We just pre-fill with the current name so the input is ready to edit.
  return name;
}

function handleRenameFiles(files) {
  for (const file of files) {
    if (renameFiles.find(f => f.file.name === file.name && f.file.size === file.size)) continue;
    renameFiles.push({ file, suggestedName: suggestRename(file.name) });
  }
  renderRenameQueue();
}

function renderRenameQueue() {
  renameQueue.innerHTML = '';
  if (renameFiles.length === 0) return;

  // Header row
  const hdr = document.createElement('div');
  hdr.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px';
  hdr.innerHTML = \`
    <span style="font-family:var(--mono);font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.08em">
      \${renameFiles.length} file\${renameFiles.length > 1 ? 's' : ''}
    </span>
    <button class="rename-clear-btn" onclick="clearRename()">✕ clear</button>\`;
  renameQueue.appendChild(hdr);

  renameFiles.forEach((entry, idx) => {
    const item = document.createElement('div');
    item.className = 'rename-item';
    item.innerHTML = \`
      <div class="rename-row">
        <span class="rename-original" title="\${entry.file.name}">\${entry.file.name}</span>
        <span class="rename-arrow">→</span>
        <div class="rename-input-wrap">
          <input class="rename-input" id="rname-\${idx}" value="\${entry.suggestedName}"
            placeholder="Paste original name from Bale caption…" spellcheck="false"
            oninput="renameFiles[\${idx}].suggestedName = this.value">
          <button class="rename-dl-btn" onclick="downloadRenamed(\${idx})">⬇ Save</button>
        </div>
      </div>
      <div class="rename-size">\${formatSize(entry.file.size)} · <span style="color:var(--text-dim)">edit the name above, then click Save</span></div>\`;
    renameQueue.appendChild(item);
  });
}

function clearRename() {
  renameFiles = [];
  renameQueue.innerHTML = '';
  renameInput.value = '';
}

function downloadRenamed(idx) {
  const { file, suggestedName } = renameFiles[idx];
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName || file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ==================== end of rename ====================

window.addEventListener('beforeunload', () => {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
});
</script>
</body>
</html>
`;

// ==================== Configuration ====================

const BOT_TOKEN = "ENTER_YOUR_TELEGRAM_BOT_TOKEN";
const BALE_BOT_TOKEN = "ENTER_YOUR_BALE_BOT_TOKEN";
const BOT_WEBHOOK = "/endpoint";
const BALE_WEBHOOK = "/bale-endpoint";

// User Mapping: Telegram Sender → Bale Recipient
const USER_MAPPING = {
  "TELEGRAM_USER_ID": "BALE_USER_ID",
};

const TELEGRAM_MAX_DOWNLOAD = 20 * 1024 * 1024; // Telegram hard limit: 20 MB
const CHUNK_SIZE = 19 * 1024 * 1024;            // Each chunk sent to Bale: 19 MB
const URL_REGEX = /https?:\/\/[^\s]+/i;

// ==================== Event Listener ====================

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === BOT_WEBHOOK) return handleWebhook(request);
  if (url.pathname === BALE_WEBHOOK) return handleBaleWebhook(request);
  if (url.pathname === '/registerWebhook') return registerWebhook(request);
  if (url.pathname === '/registerBaleWebhook') return registerBaleWebhook(request);
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return new Response(INDEX_HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  return new Response('Not Found', { status: 404 });
}

// ==================== Webhook Handlers ====================

async function handleWebhook(request) {
  const update = await request.json();
  if (update.message) await processMessage(update.message);
  return new Response('OK');
}

async function registerWebhook(request) {
  const url = new URL(request.url);
  const webhookUrl = `${url.protocol}//${url.hostname}${BOT_WEBHOOK}`;

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl })
  });

  return new Response(await response.text(), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Bale
async function handleBaleWebhook(request) {
  const update = await request.json();
  if (update.message) await processBaleMessage(update.message);
  return new Response('OK');
}

async function registerBaleWebhook(request) {
  const url = new URL(request.url);
  const webhookUrl = `${url.protocol}//${url.hostname}${BALE_WEBHOOK}`;

  const response = await fetch(`https://tapi.bale.ai/bot${BALE_BOT_TOKEN}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl })
  });

  return new Response(await response.text(), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// ==================== Message Processing ====================

async function processMessage(message) {
  const userId = message.chat.id;
  const recipientId = USER_MAPPING[userId];

  if (!recipientId) {
    await sendTelegramMessage(userId, message.message_id, '❌ You are not authorized to use this bot.');
    return;
  }

  // /start command
  if (message.text && message.text === '/start') {
    const welcomeText =
      '👋 Welcome!\n\n' +
      'Send a file or a download link to forward it to the recipient.\n\n' +
      '📁 Files over 20 MB will be split into chunks automatically.\n' +
      '🔗 Send a URL (starting with http/https) to download & forward it.\n\n' +
      '🗜 *Auto-zip:* Some files (e.g. APK, EXE, ISO) are automatically zipped before sending to bypass Bale filters. ' +
      'The recipient just needs to extract the zip — the original file with its correct name is inside.\n' +
      'Use the reassembly/tools page: https://your-pages-site.pages.dev';
    await sendTelegramMessage(userId, message.message_id, welcomeText);
    return;
  }

  // URL download
  if (message.text) {
    const match = message.text.match(URL_REGEX);
    if (match) {
      await handleUrlTransfer(userId, recipientId, match[0]);
      return;
    }
    await sendTelegramMessage(userId, message.message_id, '❌ Please send a file or a valid URL.');
    return;
  }

  if (message.document) { await handleFileTransfer(userId, recipientId, message.document); return; }
  if (message.photo)    { await handlePhotoTransfer(userId, recipientId, message.photo);   return; }
  if (message.video)    { await handleVideoTransfer(userId, recipientId, message.video);   return; }
  if (message.audio)    { await handleAudioTransfer(userId, recipientId, message.audio);   return; }

  await sendTelegramMessage(userId, message.message_id, '❌ Please send a file or a valid URL.');
}

// ==================== Bale Message Processing ====================

// Reverse mapping: Bale user → Telegram user (for authorization)
const BALE_TO_TG = Object.fromEntries(
  Object.entries(USER_MAPPING).map(([tg, bale]) => [bale, tg])
);

async function processBaleMessage(message) {
  const baleUserId = String(message.chat.id);

  // Only accept messages from known Bale recipients
  if (!BALE_TO_TG[baleUserId]) {
    await sendBaleMessage(baleUserId, '❌ You are not authorized to use this bot.');
    return;
  }

  // /start command
  if (message.text && message.text === '/start') {
    await sendBaleMessage(baleUserId,
      '👋 سلام!\n\n' +
      'لینک دانلود مستقیم خود را بفرستید تا فایل دریافت و برای شما ارسال شود.\n\n' +
      '🔗 لینک باید با http یا https شروع شود.\n' +
      '📦 فایل‌های بزرگ به صورت خودکار تکه‌تکه ارسال می‌شوند.'
    );
    return;
  }

  // URL download
  if (message.text) {
    const match = message.text.match(URL_REGEX);
    if (match) {
      await handleBaleUrlTransfer(baleUserId, match[0]);
      return;
    }
    await sendBaleMessage(baleUserId, '❌ لطفاً یک لینک دانلود مستقیم ارسال کنید.');
    return;
  }

  await sendBaleMessage(baleUserId, '❌ لطفاً یک لینک دانلود مستقیم ارسال کنید.');
}

async function handleBaleUrlTransfer(baleUserId, url) {
  try {
    await sendBaleMessage(baleUserId, `🔗 در حال دانلود...\n\`${url}\``);

    let response;
    try {
      response = await fetch(url, { redirect: 'follow' });
    } catch (e) {
      await sendBaleMessage(baleUserId, '❌ لینک قابل دسترسی نیست. مطمئن شوید لینک مستقیم و عمومی است.');
      return;
    }

    if (!response.ok) {
      await sendBaleMessage(baleUserId, `❌ سرور خطای HTTP ${response.status} برگرداند.`);
      return;
    }

    // Detect filename
    const disposition = response.headers.get('Content-Disposition') || '';
    let fileName = 'file';
    const dispMatch = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)/i);
    if (dispMatch) {
      fileName = decodeURIComponent(dispMatch[1].trim());
    } else {
      const urlPath = new URL(url).pathname;
      const urlFileName = urlPath.split('/').pop();
      if (urlFileName && urlFileName.includes('.')) fileName = decodeURIComponent(urlFileName);
    }

    const contentLength = response.headers.get('Content-Length');
    if (contentLength) {
      await sendBaleMessage(baleUserId, `📦 حجم فایل: ${formatSize(parseInt(contentLength))}\n⏳ در حال پردازش...`);
    }

    let fileBuffer = await response.arrayBuffer();
    let totalSize = fileBuffer.byteLength;

    let sendName = fileName;
    if (shouldWrap(fileName)) {
      await sendBaleMessage(baleUserId, `📦 در حال زیپ کردن \`${fileName}\`...`);
      fileBuffer = buildZip(fileBuffer, fileName);
      totalSize = fileBuffer.byteLength;
      sendName = fileName.replace(/(\.[^.]+)+$/, '') + '.zip';
    }

    const chunks = Math.ceil(totalSize / CHUNK_SIZE);
    await sendBaleMessage(baleUserId,
      `✅ دانلود شد: ${formatSize(totalSize)}\n📤 در حال ارسال${chunks > 1 ? ` در ${chunks} بخش` : ''}...`
    );

    await sendBufferToBaleDirectly(baleUserId, fileBuffer, sendName);
  } catch (error) {
    console.error('Bale URL transfer error:', error);
    await sendBaleMessage(baleUserId, '❌ خطای غیرمنتظره‌ای رخ داد.');
  }
}

// Like sendBufferToBaleInChunks but sends directly to Bale user (no Telegram feedback)
async function sendBufferToBaleDirectly(baleUserId, buffer, fileName) {
  const totalSize = buffer.byteLength;

  if (totalSize <= CHUNK_SIZE) {
    const ok = await sendChunkToBale(baleUserId, buffer, fileName, 'document');
    if (ok) {
      await sendBaleMessage(baleUserId, '✅ فایل با موفقیت ارسال شد.');
    } else {
      await sendBaleMessage(baleUserId, '❌ بله فایل را رد کرد.');
    }
    return;
  }

  const totalChunks = Math.ceil(totalSize / CHUNK_SIZE);
  const ext = fileName.includes('.') ? '.' + fileName.split('.').pop() : '';
  const baseName = fileName.includes('.') ? fileName.slice(0, fileName.lastIndexOf('.')) : fileName;

  let allOk = true;
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, totalSize);
    const chunk = buffer.slice(start, end);
    const chunkName = `${baseName}.part${i + 1}of${totalChunks}${ext}`;

    await sendBaleMessage(baleUserId, `📤 ارسال بخش ${i + 1} از ${totalChunks} (${formatSize(chunk.byteLength)})...`);

    const ok = await sendChunkToBale(baleUserId, chunk, chunkName, 'document');
    if (!ok) {
      await sendBaleMessage(baleUserId, `❌ ارسال بخش ${i + 1} از ${totalChunks} ناموفق بود.`);
      allOk = false;
      break;
    }
  }

  if (allOk) {
    await sendBaleMessage(baleUserId,
      `✅ همه ${totalChunks} بخش با موفقیت ارسال شدند!\n\n` +
      `ℹ️ برای ترکیب فایل‌ها از ابزار وب یا دستور زیر استفاده کنید:\n` +
      `\`cat ${baseName}.part*of${totalChunks}${ext} > ${fileName}\``
    );
  }
}

async function sendBaleMessage(chatId, text) {
  await fetch(`https://tapi.bale.ai/bot${BALE_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
  });
}

// ==================== File Transfer Handlers ====================

async function handleFileTransfer(senderId, recipientId, document) {
  // Telegram itself won't give us files >20 MB via getFile, so we inform the user.
  if (document.file_size && document.file_size > TELEGRAM_MAX_DOWNLOAD) {
    await sendTelegramMessage(senderId, null,
      `⚠️ Telegram's API does not allow bots to download files larger than 20 MB.\n` +
      `📦 File size: ${formatSize(document.file_size)}\n\n` +
      `Please upload the file somewhere (e.g. Google Drive, Dropbox) and send me the direct download link instead.`
    );
    return;
  }

  try {
    await sendTelegramMessage(senderId, null, '⏳ Downloading from Telegram...');
    const file = await getFile(document.file_id);
    let fileBuffer = await downloadFile(file.file_path);
    const rawName = document.file_name || 'file';

    let sendName = rawName;
    if (shouldWrap(rawName)) {
      await sendTelegramMessage(senderId, null, `📦 Zipping \`${rawName}\` for delivery...`);
      fileBuffer = buildZip(fileBuffer, rawName);
      sendName = rawName.replace(/(\.[^.]+)+$/, '') + '.zip';
    }

    await sendTelegramMessage(senderId, null, `📤 Sending to Bale${fileBuffer.byteLength > CHUNK_SIZE ? ' (splitting into chunks)' : ''}...`);
    await sendBufferToBaleInChunks(senderId, recipientId, fileBuffer, sendName, 'document');
  } catch (error) {
    console.error('Error transferring file:', error);
    await sendTelegramMessage(senderId, null, '❌ Error while transferring file.');
  }
}

async function handlePhotoTransfer(senderId, recipientId, photos) {
  try {
    await sendTelegramMessage(senderId, null, '⏳ Processing...');
    const largestPhoto = photos[photos.length - 1];
    const file = await getFile(largestPhoto.file_id);
    const fileBuffer = await downloadFile(file.file_path);

    const formData = new FormData();
    formData.append('chat_id', recipientId);
    formData.append('photo', new Blob([fileBuffer], { type: 'image/jpeg' }), 'photo.jpg');

    const result = await balePost('sendPhoto', formData);
    if (result.ok) {
      await sendTelegramMessage(senderId, null, '✅ Photo sent successfully.');
    } else {
      await sendTelegramMessage(senderId, null, `❌ Error: ${result.description}`);
    }
  } catch (error) {
    console.error('Error transferring photo:', error);
    await sendTelegramMessage(senderId, null, '❌ Error while transferring photo.');
  }
}

async function handleVideoTransfer(senderId, recipientId, video) {
  if (video.file_size && video.file_size > TELEGRAM_MAX_DOWNLOAD) {
    await sendTelegramMessage(senderId, null,
      `⚠️ Telegram's API does not allow bots to download files larger than 20 MB.\n` +
      `📦 File size: ${formatSize(video.file_size)}\n\n` +
      `Please upload the file somewhere and send me the direct download link instead.`
    );
    return;
  }

  try {
    await sendTelegramMessage(senderId, null, '⏳ Processing...');
    const file = await getFile(video.file_id);
    const fileBuffer = await downloadFile(file.file_path);

    await sendTelegramMessage(senderId, null, `📤 Sending to Bale...`);
    await sendBufferToBaleInChunks(senderId, recipientId, fileBuffer, 'video.mp4', 'video');
  } catch (error) {
    console.error('Error transferring video:', error);
    await sendTelegramMessage(senderId, null, '❌ Error while transferring video.');
  }
}

async function handleAudioTransfer(senderId, recipientId, audio) {
  if (audio.file_size && audio.file_size > TELEGRAM_MAX_DOWNLOAD) {
    await sendTelegramMessage(senderId, null,
      `⚠️ Telegram's API does not allow bots to download files larger than 20 MB.\n\n` +
      `Please send me a direct download link instead.`
    );
    return;
  }

  try {
    await sendTelegramMessage(senderId, null, '⏳ Processing...');
    const file = await getFile(audio.file_id);
    const fileBuffer = await downloadFile(file.file_path);

    await sendTelegramMessage(senderId, null, `📤 Sending to Bale...`);
    await sendBufferToBaleInChunks(senderId, recipientId, fileBuffer, audio.file_name || 'audio.mp3', 'audio');
  } catch (error) {
    console.error('Error transferring audio:', error);
    await sendTelegramMessage(senderId, null, '❌ Error while transferring audio.');
  }
}

// ==================== URL Download & Transfer ====================

async function handleUrlTransfer(senderId, recipientId, url) {
  try {
    await sendTelegramMessage(senderId, null, `🔗 Downloading from URL...\n\`${url}\``);

    let response;
    try {
      response = await fetch(url, { redirect: 'follow' });
    } catch (e) {
      await sendTelegramMessage(senderId, null, `❌ Could not reach the URL. Make sure it is a valid, publicly accessible link.`);
      return;
    }

    if (!response.ok) {
      await sendTelegramMessage(senderId, null, `❌ Server returned HTTP ${response.status}. Make sure the link is a direct download URL.`);
      return;
    }

    // Try to figure out file name from URL or Content-Disposition header
    const disposition = response.headers.get('Content-Disposition') || '';
    let fileName = 'file';
    const dispMatch = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)/i);
    if (dispMatch) {
      fileName = decodeURIComponent(dispMatch[1].trim());
    } else {
      const urlPath = new URL(url).pathname;
      const urlFileName = urlPath.split('/').pop();
      if (urlFileName && urlFileName.includes('.')) fileName = decodeURIComponent(urlFileName);
    }

    const contentLength = response.headers.get('Content-Length');
    if (contentLength) {
      await sendTelegramMessage(senderId, null, `📦 File size: ${formatSize(parseInt(contentLength))}\n⏳ Buffering...`);
    }

    let fileBuffer = await response.arrayBuffer();
    let totalSize = fileBuffer.byteLength;

    let sendName = fileName;
    if (shouldWrap(fileName)) {
      await sendTelegramMessage(senderId, null, `📦 Zipping \`${fileName}\` for delivery...`);
      fileBuffer = buildZip(fileBuffer, fileName);
      totalSize = fileBuffer.byteLength;
      sendName = fileName.replace(/(\.[^.]+)+$/, '') + '.zip';
    }

    const chunks = Math.ceil(totalSize / CHUNK_SIZE);
    await sendTelegramMessage(senderId, null,
      `✅ Downloaded: ${formatSize(totalSize)}\n📤 Sending to Bale${chunks > 1 ? ` in ${chunks} parts` : ''}...`
    );

    await sendBufferToBaleInChunks(senderId, recipientId, fileBuffer, sendName, 'document');
  } catch (error) {
    console.error('Error in URL transfer:', error);
    await sendTelegramMessage(senderId, null, '❌ Unexpected error while processing the URL.');
  }
}

// ==================== Chunked Sender ====================

/**
 * Sends an ArrayBuffer to Bale, splitting into CHUNK_SIZE pieces if needed.
 * Each chunk is sent as a document with a name like "filename.part1of3.ext"
 */
async function sendBufferToBaleInChunks(senderId, recipientId, buffer, fileName, mediaType) {
  const totalSize = buffer.byteLength;

  if (totalSize <= CHUNK_SIZE) {
    const success = await sendChunkToBale(recipientId, buffer, fileName, mediaType);
    if (success) {
      await sendTelegramMessage(senderId, null, '✅ Sent successfully.');
    } else {
      await sendTelegramMessage(senderId, null, '❌ Bale rejected the file.');
    }
    return;
  }

  const totalChunks = Math.ceil(totalSize / CHUNK_SIZE);
  const ext = fileName.includes('.') ? '.' + fileName.split('.').pop() : '';
  const baseName = fileName.includes('.') ? fileName.slice(0, fileName.lastIndexOf('.')) : fileName;

  let allOk = true;
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, totalSize);
    const chunk = buffer.slice(start, end);
    const chunkName = `${baseName}.part${i + 1}of${totalChunks}${ext}`;

    await sendTelegramMessage(senderId, null, `📤 Sending part ${i + 1}/${totalChunks} (${formatSize(chunk.byteLength)})...`);

    const ok = await sendChunkToBale(recipientId, chunk, chunkName, 'document');
    if (!ok) {
      await sendTelegramMessage(senderId, null, `❌ Failed to send part ${i + 1}/${totalChunks}.`);
      allOk = false;
      break;
    }
  }

  if (allOk) {
    await sendTelegramMessage(senderId, null,
      `✅ All ${totalChunks} parts sent successfully!\n\n` +
      `ℹ️ To reassemble, use the tool or run:\n` +
      `\`cat ${baseName}.part*of${totalChunks}${ext} > ${fileName}\``
    );
  }
}

async function sendChunkToBale(recipientId, buffer, fileName, mediaType) {
  const mimeType = guessMimeType(fileName);
  const formData = new FormData();
  formData.append('chat_id', recipientId);

  let endpoint, field;
  switch (mediaType) {
    case 'photo':
      endpoint = 'sendPhoto';
      field = 'photo';
      break;
    case 'video':
      endpoint = 'sendVideo';
      field = 'video';
      formData.append('supports_streaming', 'true');
      break;
    case 'audio':
      endpoint = 'sendAudio';
      field = 'audio';
      break;
    default:
      endpoint = 'sendDocument';
      field = 'document';
  }

  formData.append(field, new Blob([buffer], { type: mimeType }), fileName);
  const result = await balePost(endpoint, formData);
  return result.ok;
}

// ==================== Bale API ====================

async function balePost(method, formData) {
  const response = await fetch(`https://tapi.bale.ai/bot${BALE_BOT_TOKEN}/${method}`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

// ==================== Telegram API Methods ====================

async function sendTelegramMessage(chatId, replyId, text) {
  const params = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown'
  };
  if (replyId) params.reply_to_message_id = replyId;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
}

async function getFile(fileId) {
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
  const data = await response.json();
  return data.result;
}

async function downloadFile(filePath) {
  const response = await fetch(`https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`);
  return response.arrayBuffer();
}

// ==================== Utility Functions ====================

function formatSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Extensions that should be sent as-is (no zip wrapping needed)
const EXEMPT_EXTENSIONS = new Set([
  // Images
  'jpg','jpeg','png','gif','webp','bmp','tiff','tif','svg','ico','heic','heif','avif',
  // Videos
  'mp4','mkv','avi','mov','wmv','flv','webm','m4v','3gp','ts','mts',
  // Audio
  'mp3','ogg','wav','flac','m4a','aac','wma','opus','aiff',
  // Already compressed / archives — zip-in-zip is pointless
  'zip','rar','7z','tar','gz','bz2','xz','zst','lz4',
  // Office / document formats Bale accepts fine
  'pdf','doc','docx','xls','xlsx','ppt','pptx','odt','ods','odp','epub',
]);

const CHUNK_NAME_PATTERN = /\.part\d+of\d+\./i;

function shouldWrap(fileName) {
  if (CHUNK_NAME_PATTERN.test(fileName)) return false;
  const ext = (fileName.includes('.') ? fileName.split('.').pop() : '').toLowerCase();
  return !EXEMPT_EXTENSIONS.has(ext);
}

// ==================== Minimal ZIP Builder ====================
// Implements just enough of the ZIP spec (DEFLATE store, no compression)
// to wrap a single file. No external libraries needed.

function buildZip(fileBuffer, entryName) {
  const encoder = new TextEncoder();
  const nameBytes = encoder.encode(entryName);
  const data = new Uint8Array(fileBuffer);
  const now = new Date();

  // DOS date/time
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  const crc = crc32(data);
  const fileSize = data.length;
  const nameLen = nameBytes.length;

  // Local file header
  const lfh = new Uint8Array(30 + nameLen);
  const lfhView = new DataView(lfh.buffer);
  lfhView.setUint32(0, 0x04034b50, true);  // signature
  lfhView.setUint16(4, 20, true);           // version needed
  lfhView.setUint16(6, 0, true);            // flags
  lfhView.setUint16(8, 0, true);            // compression: stored
  lfhView.setUint16(10, dosTime, true);
  lfhView.setUint16(12, dosDate, true);
  lfhView.setUint32(14, crc, true);
  lfhView.setUint32(18, fileSize, true);    // compressed size
  lfhView.setUint32(22, fileSize, true);    // uncompressed size
  lfhView.setUint16(26, nameLen, true);
  lfhView.setUint16(28, 0, true);           // extra field length
  lfh.set(nameBytes, 30);

  // Central directory header
  const cdh = new Uint8Array(46 + nameLen);
  const cdhView = new DataView(cdh.buffer);
  cdhView.setUint32(0, 0x02014b50, true);  // signature
  cdhView.setUint16(4, 20, true);           // version made by
  cdhView.setUint16(6, 20, true);           // version needed
  cdhView.setUint16(8, 0, true);            // flags
  cdhView.setUint16(10, 0, true);           // compression: stored
  cdhView.setUint16(12, dosTime, true);
  cdhView.setUint16(14, dosDate, true);
  cdhView.setUint32(16, crc, true);
  cdhView.setUint32(20, fileSize, true);
  cdhView.setUint32(24, fileSize, true);
  cdhView.setUint16(28, nameLen, true);
  cdhView.setUint16(30, 0, true);           // extra
  cdhView.setUint16(32, 0, true);           // comment
  cdhView.setUint16(34, 0, true);           // disk start
  cdhView.setUint16(36, 0, true);           // internal attr
  cdhView.setUint32(38, 0, true);           // external attr
  cdhView.setUint32(42, 0, true);           // local header offset
  cdh.set(nameBytes, 46);

  const cdOffset = lfh.length + fileSize;
  const cdSize = cdh.length;

  // End of central directory
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true); // signature
  eocdView.setUint16(4, 0, true);           // disk number
  eocdView.setUint16(6, 0, true);           // disk with CD
  eocdView.setUint16(8, 1, true);           // entries on disk
  eocdView.setUint16(10, 1, true);          // total entries
  eocdView.setUint32(12, cdSize, true);
  eocdView.setUint32(16, cdOffset, true);
  eocdView.setUint16(20, 0, true);          // comment length

  // Concatenate all parts
  const total = new Uint8Array(lfh.length + fileSize + cdh.length + eocd.length);
  let off = 0;
  total.set(lfh, off);  off += lfh.length;
  total.set(data, off); off += fileSize;
  total.set(cdh, off);  off += cdh.length;
  total.set(eocd, off);

  return total.buffer;
}

// CRC-32 table
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(data) {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function guessMimeType(fileName) {
  const ext = (fileName.split('.').pop() || '').toLowerCase();
  const map = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp',
    mp4: 'video/mp4', mkv: 'video/x-matroska', avi: 'video/x-msvideo', mov: 'video/quicktime',
    mp3: 'audio/mpeg', ogg: 'audio/ogg', wav: 'audio/wav', flac: 'audio/flac', m4a: 'audio/mp4',
    pdf: 'application/pdf', zip: 'application/zip', rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed', tar: 'application/x-tar',
    txt: 'text/plain', html: 'text/html', css: 'text/css', js: 'application/javascript',
    json: 'application/json', xml: 'application/xml',
  };
  return map[ext] || 'application/octet-stream';
}
