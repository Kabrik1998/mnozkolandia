import http from 'node:http';

const pages = await new Promise((resolve, reject) => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => resolve(JSON.parse(data)));
  }).on('error', reject);
});

const page = pages.find((item) => item.title === 'MnożkoLandia' && item.url === 'http://127.0.0.1:5173/');
if (!page) throw new Error('MnożkoLandia page not found');

const ws = new WebSocket(page.webSocketDebuggerUrl);
let nextId = 0;
const pending = new Map();
const events = [];

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.method === 'Runtime.exceptionThrown' || msg.method === 'Log.entryAdded') {
    events.push(msg);
  }
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};

await new Promise((resolve) => {
  ws.onopen = resolve;
});

function send(method, params = {}) {
  const id = ++nextId;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve) => pending.set(id, resolve));
}

await send('Runtime.enable');
await send('Log.enable');
await send('Page.reload', { ignoreCache: true });
await new Promise((resolve) => setTimeout(resolve, 2500));

const root = await send('Runtime.evaluate', {
  expression: 'document.getElementById("root").innerHTML || "ROOT_EMPTY"',
  returnByValue: true
});

const text = await send('Runtime.evaluate', {
  expression: 'document.body.innerText || "NO_TEXT"',
  returnByValue: true
});

console.log(JSON.stringify({
  root: root.result?.result?.value?.slice(0, 600),
  text: text.result?.result?.value?.slice(0, 600),
  events
}, null, 2));

ws.close();
