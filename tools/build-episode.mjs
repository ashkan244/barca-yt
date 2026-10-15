// Build an episode spec + narration JSON from one authoring Markdown file.
//
// Front matter (first ```json block before any @scene): {"id","code","title","music","thumb":{...}}
// Scenes:   @scene <type> key="value" key=123 ...      (optional ```json {...}``` right after = merged props)
// Lines:    > [CODE-001] Sentence. [pause 0.8]           (belong to the current scene, in order)
// Lines that appear before the first @scene are ignored. Everything else in the file is free notes.
//
// Usage: node tools/build-episode.mjs episodes/03-TM-2-6.md
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = process.argv[2];
const src = fs.readFileSync(file, 'utf8').split(/\r?\n/);

let front = null; const scenes = []; const narration = [];
let cur = null; let inJson = false; let jsonBuf = []; let jsonTarget = null;

const parseAttrs = (s) => {
  const out = {}; const re = /(\w+)=("([^"]*)"|(\S+))/g; let m;
  while ((m = re.exec(s))) {
    const v = m[3] !== undefined ? m[3] : m[4];
    out[m[1]] = m[3] === undefined && /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v.replace(/\\n/g, '\n');
  }
  return out;
};

for (const raw of src) {
  if (inJson) {
    if (raw.trim() === '```') {
      inJson = false;
      const obj = JSON.parse(jsonBuf.join('\n'));
      if (jsonTarget === 'front') front = obj; else Object.assign(jsonTarget, obj);
      jsonBuf = [];
    } else jsonBuf.push(raw);
    continue;
  }
  if (raw.trim() === '```json') { inJson = true; jsonTarget = cur ?? (front ? null : 'front'); if (!jsonTarget) throw new Error('json block with no target'); continue; }
  const sm = raw.match(/^@scene\s+(\w+)\s*(.*)$/);
  if (sm) {
    cur = {type: sm[1], ...parseAttrs(sm[2]), _ids: []};
    if (typeof cur.options === 'string') cur.options = cur.options.split(',').map((x) => x.trim());
    scenes.push(cur); continue;
  }
  const lm = raw.match(/^>\s*\[([A-Z]{2}-\d{3}[a-z]?)\]\s*(.+)$/);
  if (lm && cur) {
    let text = lm[2].trim(); let speed = 1.0, pause = 0.25;
    const sp = text.match(/^\[speed\s+([\d.]+)\]\s*/); if (sp) { speed = Number(sp[1]); text = text.slice(sp[0].length); }
    const pa = text.match(/\s*\[pause\s+([\d.]+)\]\s*$/); if (pa) { pause = Number(pa[1]); text = text.slice(0, pa.index).trim(); }
    narration.push({id: lm[1], text, voice: front?.voice ?? 'am_michael', speed, pause});
    cur._ids.push(lm[1]);
  }
}
if (!front) throw new Error('missing front-matter json block');
const ids = new Set();
for (const l of narration) { if (ids.has(l.id)) throw new Error(`duplicate ${l.id}`); ids.add(l.id); }
for (const s of scenes) {
  if (s._ids.length) s.lines = s._ids.length === 1 ? s._ids[0] : `${s._ids[0]}..${s._ids[s._ids.length - 1]}`;
  delete s._ids;
}
const spec = {...front, scenes};
delete spec.voice;
const specDir = path.join(root, 'studio/src/episodes/specs');
const narrDir = path.join(root, 'studio/src/episodes/narration');
fs.mkdirSync(specDir, {recursive: true}); fs.mkdirSync(narrDir, {recursive: true});
fs.writeFileSync(path.join(specDir, `${spec.id}.json`), JSON.stringify(spec, null, 1));
fs.writeFileSync(path.join(narrDir, `${spec.code}.json`), JSON.stringify(narration, null, 1));
const words = narration.reduce((a, l) => a + l.text.split(/\s+/).length, 0);
const pauses = narration.reduce((a, l) => a + l.pause, 0);
const holds = scenes.reduce((a, s) => a + (s.lines ? (s.hold ?? 0.4) + (s.lead ?? 0.3) : (s.secs ?? 3)), 0);
const est = words / 2.35 + pauses + holds;
console.log(`${spec.id}: ${scenes.length} scenes, ${narration.length} lines, ${words} words, est. ${Math.floor(est / 60)}:${String(Math.round(est % 60)).padStart(2, '0')}`);
