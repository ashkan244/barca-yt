// Builds research/strategy.xlsx: market evidence, channel benchmarks (outlier ratio),
// weighted format scoring, milestone probability model, and launch calendar.
const ExcelJS = require('exceljs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'research', 'strategy.xlsx');
const FONT = 'Arial';
const thin = {style: 'thin', color: {argb: 'FFCFD8DC'}};
const border = {top: thin, left: thin, bottom: thin, right: thin};
const BLUE = {argb: 'FF0000FF'}, GREEN = {argb: 'FF008000'};
const YELLOW = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF00'}};

const wb = new ExcelJS.Workbook();
wb.calcProperties.fullCalcOnLoad = true;

const header = (ws, row, cols) => {
  const r = ws.getRow(row);
  cols.forEach((h, i) => {
    const c = r.getCell(i + 1);
    c.value = h;
    c.font = {name: FONT, bold: true, color: {argb: 'FFFFFFFF'}};
    c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF263238'}};
    c.alignment = {horizontal: 'center', vertical: 'middle', wrapText: true};
    c.border = border;
  });
  r.height = 32;
};
const style = (row, opts = {}) => row.eachCell({includeEmpty: true}, (c) => {
  c.font = {name: FONT, size: 10, ...(c.font && c.font.color ? {color: c.font.color} : {}), ...(opts.font || {})};
  c.alignment = {wrapText: true, vertical: 'top', ...(opts.align || {})};
  c.border = border;
});
const title = (ws, text, sub) => {
  ws.getCell('A1').value = text;
  ws.getCell('A1').font = {name: FONT, bold: true, size: 15};
  if (sub) { ws.getCell('A2').value = sub; ws.getCell('A2').font = {name: FONT, size: 9, italic: true, color: {argb: 'FF607D8B'}}; }
};

// ---------------- 1. Evidence (YouTube search, 15 Oct 2026) ----------------
const EV = [
  // [query/topic, format code, views, age, length, channel, title]
  ['barcelona tactics flick', 'TX', 558616, '2w', '11:23', 'Football Made Simple', "Flick's Barcelona Tactics Are Crazy"],
  ['barcelona tactics flick', 'TX', 2111272, '2y', '19:08', 'DK FALCON', 'How Barcelona’s NEW Tactic is Breaking Traditions!'],
  ['barcelona tactics flick', 'TX', 89471, '1y', '17:31', 'The Adam Clery Football Channel', "Hansi Flick’s INCREDIBLE Barcelona Tactics Explained"],
  ['barcelona tactics flick', 'TX', 200950, '1y', '11:42', 'The Purist Football', 'Why Barcelona have the best attack in Europe (Analysis)'],
  ['el clasico preview', 'PRE', 57738, '5mo', '12:22', 'TalkFCB', 'BARCELONA VS REAL MADRID, EL CLASICO 2026 - MATCH PREVIEW'],
  ['el clasico preview', 'PRE', 240, '5mo', '15:42', 'The Half Space', 'El Clásico 2026 PREVIEW Barcelona VS Real Madrid'],
  ['el clasico tactics (post-match)', 'TX', 126628, '9mo', '8:19', 'Football Made Simple', 'The Tactics Behind The Insane El Classico'],
  ['lamine yamal analysis', 'PC', 139956, '5mo', '13:49', 'PedTalksFutbol', 'This Video Will Change How You See Yamal Forever'],
  ['lamine yamal analysis', 'PC', 153735, '1y', '11:22', 'intrcpt', 'The Scary Truth About Lamine Yamal...'],
  ['lamine yamal analysis', 'PC', 81826, '8mo', '13:42', 'PedTalksFutbol', 'The Numbers Are Lying to You About Lamine Yamal'],
  ['pedri analysis', 'PC', 344772, '7mo', '8:56', 'The Purist Football', 'Something Strange Happens When Pedri Gets the Ball...'],
  ['pedri analysis', 'PC', 77561, '8mo', '14:13', 'PedTalksFutbol', 'Why Pedri Is Better Than the Numbers Say'],
  ['play like pedri', 'PL', 544891, '1y', '6:37', 'Dribble Dreams Academy', 'How to Play as a Midfielder | ... with Pedri'],
  ['play like pedri', 'PL', 337418, '1y', '7:00', 'Dribble Dreams Academy', 'How to Play as a Midfielder | Movement & Passing with Pedri'],
  ['cruyff documentary', 'FS', 1360496, '4y', '50:58', 'balón - English', 'Cruyff: The Total Footballer'],
  ['cruyff documentary', 'FS', 3398679, '4y', '38:47', 'Eurão', 'Cruyff: The Genius Who Changed Football Forever'],
  ['cruyff documentary', 'FS', 238850, '2y', '37:39', 'TheRetroRoute', "Johan Cruyff's Barcelona: The Dream Team"],
  ['full story biography', 'FS', 48551882, '1y', '1:30:32', 'FDOR', 'The Full Story of Cristiano Ronaldo'],
  ['full story biography', 'FS', 3331315, '1y', '27:01', 'FDOR', 'The Full Story of Diego Maradona'],
  ['messi documentary', 'FS', 2032137, '3y', '52:59', 'balón - English', 'Lionel Messi: Ascending to Greatness'],
  ['barcelona history', 'FS', 2033175, '6y', '29:08', 'balón - English', 'FC Barcelona: An Era Between Two Greats'],
  ['2-6 bernabeu story', 'TM', 2863, '1mo', '16:28', 'FM247 HD', 'The Day Messi Showed No Mercy to Real Madrid at the Bernabéu'],
  ['6-1 psg story', 'TM', 219180, '10mo', '20:26', 'The Football Narrative', 'The Champions League Victory That Made No Sense'],
  ['6-1 psg story', 'TM', 820797, '2mo', '3:19', 'Diablo AMV', 'The Greatest Comeback in Football History… as an ANIME'],
  ['clasico rivalry history', 'TM', 511854, '10mo', '28:10', 'The Football Narrative', 'The Match That Started The Most Violent Era In Football History'],
  ['clasico rivalry history', 'TM', 346960, '7y', '11:10', 'Rabona TV', 'How The Spanish Civil War Shaped El Clásico'],
  ['what if neymar', 'WI', 924448, '1y', '26:05', 'Jechlan', 'What If Neymar Never Left Barcelona?'],
  ['what if neymar', 'WI', 619233, '10mo', '26:12', 'Jechlan', 'What If Neymar Never Got Injured?'],
  ['barca finances', 'BZ', 1053281, '5y', '8:09', 'Tifo Football by The Athletic', "Barcelona's $1.3bn debt"],
  ['barca finances', 'BZ', 750020, '1y', '16:54', 'Live 90 Football', 'Meet the Entrepreneur That Destroyed FC Barcelona in 5 Years'],
  ['barca finances', 'BZ', 339587, '1y', '21:43', 'Simba FC', 'How A Club With NO MONEY Pulled Off An IMPOSSIBLE Rebuild'],
  ['barca finances', 'BZ', 203973, '4mo', '16:31', 'PedTalksFutbol', 'How Can Barca Spend So Much Money?'],
  ['la masia', 'BZ', 283253, '6mo', '12:59', 'PedTalksFutbol', 'Why La Masia Produces 0 Strikers'],
  ['la masia', 'BZ', 279626, '7y', '10:19', 'Tifo Football by The Athletic', 'La Masia: The History of Barcelona’s Academy'],
  ['best clasico goals ranked', 'RK', 541651, '1y', '14:12', 'LALIGA EA SPORTS', 'Top 20 Goals of ELCLÁSICO 2015-2025 (official)'],
  ['best clasico goals ranked', 'RK', 36511, '5mo', '5:00', 'JB fc', 'Every El Clasico Goal Under Hansi Flick - From Worst To Best'],
  ['pep tactics explained', 'TX', 1188689, '10mo', '2:41:33', 'Football Made Simple', 'The Complete Tactical Evolution Of Pep Guardiola'],
  ['pep tactics explained', 'TX', 438267, '2mo', '1:40:03', 'Football Made Simple', 'The Tactics Of Every Post Pep Barca Manager'],
];
const ev = wb.addWorksheet('شواهد بازار', {views: [{state: 'frozen', ySplit: 3}]});
title(ev, 'Market evidence — YouTube search, 15 Oct 2026 (hl=en, gl=US)', 'Source: YouTube search results captured via browser on 2026-10-15. Views are a snapshot. Format codes: FS full story, TX tactics explained, PL play-like, WI what-if, BZ business/club, PC player curiosity, TM the-match story, PRE preview, RK ranking.');
ev.columns = [{width: 26}, {width: 8}, {width: 13}, {width: 7}, {width: 9}, {width: 26}, {width: 62}];
header(ev, 3, ['Topic/query', 'Format', 'Views', 'Age', 'Length', 'Channel', 'Title']);
EV.forEach((e, i) => {
  const r = ev.getRow(4 + i);
  r.values = e;
  r.getCell(3).numFmt = '#,##0';
  style(r);
});

// ---------------- 2. Channel benchmarks (outlier ratio) ----------------
const CH = [
  // channel, subscribers, best video views (from evidence), format, note
  ['Dribble Dreams Academy', 15200, 544891, 'PL', 'educational "play like" – tiny channel, huge search demand'],
  ['FDOR', 1360000, 48551882, 'FS', 'fully illustrated (cartoon) biographies, no footage look'],
  ['Simba FC', 23800, 339587, 'BZ', 'club rebuild/finance story'],
  ['Jechlan', 82700, 924448, 'WI', 'what-if, 26 min'],
  ['The Football Narrative', 62100, 511854, 'TM', 'history narrative, 28 min'],
  ['intrcpt', 61700, 153735, 'PC', 'player curiosity'],
  ['PedTalksFutbol', 174000, 283253, 'BZ/PC', 'contrarian titles'],
  ['The Purist Football', 228000, 344772, 'PC', 'curiosity title'],
  ['DK FALCON', 259000, 2111272, 'TX', 'tactics explained'],
  ['balón - English', 196000, 2033175, 'FS', 'long documentaries'],
  ['Football Made Simple', 805000, 558616, 'TX', 'tactics leader (recent)'],
  ['TalkFCB', 618000, 57738, 'PRE', 'Barça news/preview – low ratio'],
  ['CULES EN', 38900, 11521, 'BZ', 'Barça English, recent'],
];
const bm = wb.addWorksheet('بنچمارک کانال‌ها', {views: [{state: 'frozen', ySplit: 3}]});
title(bm, 'Channel benchmarks — outlier ratio = best video views ÷ subscribers', 'Subscriber counts: YouTube channel search, 15 Oct 2026 (rounded as displayed). Ratio > 3 = format breaks out beyond the existing audience.');
bm.columns = [{width: 26}, {width: 13}, {width: 15}, {width: 9}, {width: 12}, {width: 50}];
header(bm, 3, ['Channel', 'Subscribers', 'Best video views', 'Format', 'Outlier ratio', 'Note']);
CH.forEach((c, i) => {
  const rn = 4 + i;
  const r = bm.getRow(rn);
  r.values = [c[0], c[1], c[2], c[3], {formula: `C${rn}/B${rn}`}, c[4]];
  r.getCell(2).numFmt = '#,##0';
  r.getCell(3).numFmt = '#,##0';
  r.getCell(5).numFmt = '0.0"x"';
  style(r);
  r.getCell(2).font = {name: FONT, size: 10, color: BLUE};
  r.getCell(3).font = {name: FONT, size: 10, color: BLUE};
});
const bmEnd = 3 + CH.length;
bm.getCell(bmEnd + 2, 1).value = 'Median outlier ratio';
bm.getCell(bmEnd + 2, 5).value = {formula: `MEDIAN(E4:E${bmEnd})`};
bm.getCell(bmEnd + 2, 5).numFmt = '0.0"x"';
bm.getCell(bmEnd + 2, 1).font = {name: FONT, bold: true};

// ---------------- 3. Format scoring ----------------
const sc = wb.addWorksheet('امتیاز فرمت‌ها', {views: [{state: 'frozen', ySplit: 6}]});
title(sc, 'Format scoring — weighted (1–5 per criterion). Edit yellow weights and blue scores.', 'Scores are judgment informed by the evidence tabs; weights must sum to 100%.');
const CRIT = [
  ['Demand (top views on topic)', 0.20],
  ['Breakout potential (outlier ratio)', 0.20],
  ['Competition gap', 0.10],
  ['Fit to our strengths (animation, no footage)', 0.15],
  ['Production cost (5 = cheap)', 0.10],
  ['Legal safety', 0.10],
  ['Evergreen / compounding', 0.10],
  ['Series potential', 0.05],
];
sc.columns = [{width: 34}, ...CRIT.map(() => ({width: 13})), {width: 11}, {width: 8}, {width: 14}, {width: 46}];
const wRow = 4;
sc.getCell(wRow, 1).value = 'Weights →';
sc.getCell(wRow, 1).font = {name: FONT, bold: true};
CRIT.forEach((c, i) => {
  const cell = sc.getCell(wRow, i + 2);
  cell.value = c[1];
  cell.numFmt = '0%';
  cell.font = {name: FONT, color: BLUE, bold: true};
  cell.fill = YELLOW;
  cell.alignment = {horizontal: 'center'};
});
const wFirst = 'B', wLast = String.fromCharCode(65 + CRIT.length); // B..I
sc.getCell(wRow, CRIT.length + 2).value = {formula: `SUM(${wFirst}${wRow}:${wLast}${wRow})`};
sc.getCell(wRow, CRIT.length + 2).numFmt = '0%';
sc.getCell(5, 1).value = 'Weight check (must be 100%)';
sc.getCell(5, 1).font = {name: FONT, size: 9, italic: true};
header(sc, 6, ['Format', ...CRIT.map((c) => c[0]), 'Weighted score', 'Rank', 'Decision', 'Why (evidence)']);
const FMT = [
  ['FS — The Full Story (illustrated biography, 30–45 min)', [5, 5, 3, 4, 2, 4, 5, 5], 'HERO (monthly)', 'FDOR 35x, balón ~10x; multi-million views on Cruyff/Messi docs; illustrated look = no footage.'],
  ['TM — The Match That… (history narrative, 20–28 min)', [4, 4, 4, 5, 3, 5, 5, 4], 'CORE (bi-weekly)', 'Football Narrative 8x; no long-form 2-6 story exists (gap); anime 6-1 got 820K in 2 months.'],
  ['WI — What If (transparent simulation, 20–26 min)', [4, 4, 3, 5, 3, 5, 4, 4], 'CORE (monthly)', 'Jechlan 11x (924K, 619K). Our differentiator: on-screen simulation. Avoid already-done topics.'],
  ['PL — Play Like Barça (educational, 8–12 min)', [4, 5, 4, 5, 4, 5, 5, 5], 'CORE (weekly)', 'Dribble Dreams 36x at 15K subs; evergreen search; animation is ideal; brand-safe for ads.'],
  ['TX — Tactics Explained (post-match / system, 12–18 min)', [5, 3, 2, 5, 3, 5, 3, 4], 'CORE (after big matches)', 'Huge demand (FMS 558K in 2w) but strong incumbents; post-match > preview.'],
  ['BZ — Club & Business Stories (16–22 min)', [4, 4, 3, 4, 4, 4, 4, 3], 'ROTATION (monthly)', 'Simba 14x, Live 90 750K, Tifo 1M. Defamation care: reported facts only.'],
  ['PC — Player Curiosity (12–14 min)', [4, 2, 2, 4, 3, 4, 3, 4], 'ROTATION', '1.5–2.5x; works with curiosity titles ("Something strange happens when…").'],
  ['PRE — Match Preview (news)', [2, 1, 1, 3, 4, 4, 1, 2], 'DROP', 'TalkFCB 0.1x; previews die after the match.'],
  ['RK — Rankings / Top 10 goals', [3, 2, 1, 2, 3, 2, 3, 3], 'DROP', 'Official LaLiga channels dominate with footage we cannot use.'],
  ['FO — Fan Oral History (standalone)', [2, 2, 5, 4, 3, 3, 4, 3], 'SEGMENT only', 'No demand evidence standalone; use as HUMAN segments inside FS/TM + community.'],
];
FMT.forEach((f, i) => {
  const rn = 7 + i;
  const r = sc.getRow(rn);
  r.getCell(1).value = f[0];
  f[1].forEach((v, j) => { const c = r.getCell(j + 2); c.value = v; c.font = {name: FONT, size: 10, color: BLUE}; c.alignment = {horizontal: 'center'}; });
  r.getCell(CRIT.length + 2).value = {formula: `SUMPRODUCT(${wFirst}${rn}:${wLast}${rn},$${wFirst}$${wRow}:$${wLast}$${wRow})`};
  r.getCell(CRIT.length + 2).numFmt = '0.00';
  r.getCell(CRIT.length + 3).value = {formula: `RANK(${String.fromCharCode(66 + CRIT.length)}${rn},$${String.fromCharCode(66 + CRIT.length)}$7:$${String.fromCharCode(66 + CRIT.length)}$${6 + FMT.length})`};
  r.getCell(CRIT.length + 4).value = f[2];
  r.getCell(CRIT.length + 5).value = f[3];
  style(r);
  f[1].forEach((v, j) => (r.getCell(j + 2).font = {name: FONT, size: 10, color: BLUE}));
  r.height = 34;
});

// ---------------- 4. Probability model ----------------
const pm = wb.addWorksheet('مدل احتمال موفقیت');
title(pm, 'Milestone probability model — base rate × adjustment multipliers (edit yellow cells)', 'Base rate source: vidIQ Research (Sep 2026): of channels <1K subs, 30.77% with 52+ uploads in 360 days reached 1,000 subs; 8.65% with 12–51 uploads. Multipliers are explicit judgment calls.');
pm.columns = [{width: 52}, {width: 12}, {width: 70}];
const P = [
  ['INPUTS', null, ''],
  ['Base: P(1K subs in 12 months | 52+ uploads/yr)', 0.3077, 'vidIQ Research Sep 2026 — https://vidiq.com/research/youtube-uploads-1000-subscribers/'],
  ['Multiplier: niche demand (Barça = largest global fanbase; proven breakouts)', 1.25, 'Judgment: evidence tab shows 8–36x outliers in our formats'],
  ['Multiplier: differentiation & production quality (animated, no footage)', 1.25, 'Judgment: few Barça-only channels with documentary-grade visuals'],
  ['Multiplier: execution risk (one operator, TTS voice, slow local machine)', 0.80, 'Judgment: consistency is the #1 failure mode; cloud render mitigates'],
  ['Multiplier: format mix weighted to hero formats (FS/TM/WI/PL)', 1.15, 'Judgment: avoids low-ratio formats (preview/news)'],
  ['P(4,000 watch hours | 1K subs) for 15–30 min videos', 0.65, 'Judgment: 4,000 h ≈ 40K views at ~6 min avg view duration'],
  ['P(at least one video ≥ 100K views in 12 months) — base for new channel', 0.12, 'Judgment: breakouts on small channels exist but are rare'],
  ['Multiplier on breakout from hero formats + packaging tests', 1.6, 'Judgment: FS/WI/PL show the highest outlier ratios'],
  ['P(10K subs in 24 months | 1K reached in 12)', 0.35, 'Judgment; no public cohort data found'],
  ['', null, ''],
  ['OUTPUTS', null, ''],
];
P.forEach((p, i) => {
  const rn = 4 + i;
  pm.getCell(rn, 1).value = p[0];
  if (p[1] !== null) {
    const c = pm.getCell(rn, 2);
    c.value = p[1];
    c.numFmt = p[1] > 1.01 || (p[0].startsWith('Multiplier')) ? '0.00"x"' : '0.0%';
    c.font = {name: FONT, color: BLUE};
    c.fill = YELLOW;
    c.alignment = {horizontal: 'center'};
  }
  pm.getCell(rn, 3).value = p[2];
  pm.getCell(rn, 1).font = {name: FONT, bold: p[1] === null};
  pm.getCell(rn, 3).font = {name: FONT, size: 9, italic: true, color: {argb: 'FF607D8B'}};
});
const O = [
  ['P(1,000 subs within 12 months)', 'MIN(0.95,B5*B6*B7*B8*B9)', 'Base × all multipliers, capped at 95%'],
  ['P(YouTube Partner Program within 12 months)', 'B16*B10', '1K subs AND 4,000 watch hours'],
  ['P(≥1 video with 100K+ views within 12 months)', 'MIN(0.95,B11*B12)', 'Breakout probability'],
  ['P(10,000 subs within 24 months)', 'B16*B13', 'Conditional chain'],
];
O.forEach((o, i) => {
  const rn = 16 + i;
  pm.getCell(rn, 1).value = o[0];
  pm.getCell(rn, 2).value = {formula: o[1]};
  pm.getCell(rn, 2).numFmt = '0%';
  pm.getCell(rn, 2).font = {name: FONT, bold: true};
  pm.getCell(rn, 2).alignment = {horizontal: 'center'};
  pm.getCell(rn, 3).value = o[2];
  pm.getCell(rn, 1).font = {name: FONT, bold: true};
  pm.getCell(rn, 3).font = {name: FONT, size: 9, italic: true};
});
pm.getCell(21, 1).value = 'Read as rough planning odds, not forecasts. The biggest lever is consistency: the same base rate is 8.65% at 12–51 uploads/yr.';
pm.getCell(21, 1).font = {name: FONT, size: 9, italic: true, color: {argb: 'FFB71C1C'}};
pm.mergeCells(21, 1, 21, 3);

// ---------------- 5. Launch calendar (first 12 long videos) ----------------
const lc = wb.addWorksheet('تقویم ۱۲ ویدیوی اول', {views: [{state: 'frozen', ySplit: 3}]});
title(lc, 'Launch slate — first 12 long-form videos (+2–3 Shorts each)', 'Order balances quick wins (timely TX) with compounding hero formats (FS/TM/WI/PL).');
lc.columns = [{width: 5}, {width: 12}, {width: 8}, {width: 54}, {width: 30}, {width: 10}, {width: 48}];
header(lc, 3, ['#', 'Target week', 'Format', 'Working title', 'Thumbnail text (≤4 words)', 'Length', 'Why this slot']);
const SLATE = [
  ['W1 (≤27 Oct)', 'TX', 'The Tactics Behind [Clásico result] — Explained', '"THE ONE STEP"', '13 min', 'Timely search spike after 25 Oct Clásico; post-match beats preview (evidence).'],
  ['W1', 'PL', 'Play Like Pedri: The 3 Habits Nobody Teaches', '"SCAN BEFORE"', '10 min', 'Evergreen search; highest outlier ratio format; easy animation.'],
  ['W2', 'TM', 'The 2-6: The Night Guardiola’s Barça Was Born', '"2-6"', '24 min', 'No long-form narrative exists; only highlight reuploads (gap).'],
  ['W3', 'PL', 'Play Like Lamine Yamal: How to Beat a Defender Before the Touch', '"BEFORE THE TOUCH"', '10 min', 'Yamal search demand + education angle.'],
  ['W4', 'FS', 'The Full Story of Johan Cruyff at Barça (Illustrated)', '"HE BUILT BARÇA"', '35 min', 'Hero: Cruyff docs pull millions; CC0 Anefo photos + illustration.'],
  ['W5', 'WI', 'What If Barça Had Kept Messi in 2021? We Simulated It', '"1,000 SEASONS"', '22 min', 'What-if outlier format; transparent simulation is our twist.'],
  ['W5', 'TX', 'How Flick’s Barça Actually Works (System Explained)', '"THE HIGH LINE"', '15 min', 'Evergreen-ish system explainer, updates each season.'],
  ['W6', 'BZ', 'How Barça Escaped a €[X]bn Hole (and What It Cost)', '"THE LEVERS"', '18 min', 'Business stories 14x; reported facts only.'],
  ['W7', 'PL', 'Play Like Frenkie de Jong / [current CM]: Carrying Through Pressure', '"BREAK THE PRESS"', '10 min', 'Keep weekly PL cadence.'],
  ['W8', 'TM', 'The 6-1: The Comeback That Made No Sense (Told by Fans)', '"6-1"', '22 min', 'Fan oral history as HUMAN segments.'],
  ['W9', 'PC', 'Something Strange Happens When [Barça player] Gets the Ball', '"WATCH HIS HIPS"', '13 min', 'Curiosity framing proven (Purist 345K).'],
  ['W10', 'FS', 'The Full Story of Ladislao Kubala: The Refugee Who Saved Barça', '"THE REFUGEE"', '30 min', 'Under-covered in English (gap); strong human story.'],
];
SLATE.forEach((s, i) => {
  const r = lc.getRow(4 + i);
  r.values = [i + 1, ...s];
  style(r);
  r.height = 30;
});

wb.xlsx.writeFile(OUT).then(() => console.log('wrote', OUT));
