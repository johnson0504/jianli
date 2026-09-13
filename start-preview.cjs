const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = __dirname;
const url = 'http://127.0.0.1:5173/';
const logs = path.resolve(root, '../../work/preview');
function ready() {
  return new Promise(resolve => {
    const request = http.get(url, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', data => body += data);
      response.on('end', () => resolve(response.statusCode === 200 && body.includes('/src/main.jsx') && body.includes('Johnson')));
    });
    request.setTimeout(1200, () => request.destroy());
    request.on('error', () => resolve(false));
  });
}
(async () => {
  fs.mkdirSync(logs, { recursive: true });
  if (!await ready()) {
    const vite = path.join(root, 'node_modules/vite/bin/vite.js');
    if (!fs.existsSync(vite)) throw new Error('Run npm install in the portfolio folder first.');
    const stdout = fs.openSync(path.join(logs, 'vite.stdout.log'), 'a');
    const stderr = fs.openSync(path.join(logs, 'vite.stderr.log'), 'a');
    const child = spawn(process.execPath, [vite, '--host', '127.0.0.1', '--port', '5173', '--strictPort'], {
      cwd: root, detached: true, windowsHide: true, stdio: ['ignore', stdout, stderr]
    });
    child.on('error', error => console.error(error.message));
    child.unref();
    fs.closeSync(stdout); fs.closeSync(stderr);
    if (child.pid) fs.writeFileSync(path.join(logs, 'vite.pid'), String(child.pid));
    let running = false;
    for (let i = 0; i < 30; i++) {
      if (await ready()) { running = true; break; }
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    if (!running) throw new Error('Preview failed to start. Check port 5173 and logs in ' + logs);
  }
  console.log('Portfolio ready: ' + url);
  if (process.argv.includes('--open')) {
    const browser = spawn('rundll32.exe', ['url.dll,FileProtocolHandler', url], { detached: true, windowsHide: true, stdio: 'ignore' });
    browser.on('error', error => console.error('Open the URL manually: ' + error.message));
    browser.unref();
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
