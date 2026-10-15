# EP02 — TX · How Flick's Barça Actually Works

انتشار: جمعه ۲۴ اکتبر ۲۰۲۶ (یک روز قبل از ال‌کلاسیکو) · طول هدف حدود ۱۳ دقیقه · پلی‌لیست Tactics Explained
**حقایق:** فقط موارد عمومی و منبع‌دار. همه‌ی صحنه‌های تخته «ILLUSTRATION» هستند و بازسازی بازی مشخصی نیستند.

```json
{"id": "EP02-TX", "code": "TX", "title": "How Flick's Barça Actually Works (Explained on a Chalkboard)", "music": "chalk.mp3",
 "thumb": {"kicker": "FLICK'S BARÇA", "title": "THE ONE\nSTEP", "accent": "STEP", "style": "board"}}
```

@scene board title="FLICK'S BARÇA · THE HIGH LINE" lead=0.5
```json
{"camera": [{"at": 0, "zoom": 1.25, "focus": [50, 34]}, {"at": "TX-003", "zoom": 1.45, "focus": [44, 34]}],
 "tokens": [
  {"id": "d2", "side": "barca", "label": "2", "path": [[0, 44, 12], ["TX-002", 44, 12], ["TX-002+1", 47.5, 12]]},
  {"id": "d4", "side": "barca", "label": "4", "path": [[0, 44, 26], ["TX-002", 44, 26], ["TX-002+1", 47.5, 26]]},
  {"id": "d5", "side": "barca", "label": "5", "path": [[0, 44, 42], ["TX-002", 44, 42], ["TX-002+1", 47.5, 42]]},
  {"id": "d3", "side": "barca", "label": "3", "path": [[0, 44, 56], ["TX-002", 44, 56], ["TX-002+1", 47.5, 56]]},
  {"id": "gk", "side": "barca", "label": "1", "path": [[0, 20, 34]]},
  {"id": "o9", "side": "opp", "label": "9", "path": [[0, 46, 35], ["TX-003", 45.6, 36], ["TX-003+2", 30, 38]], "hi": [["TX-003+1", 30, "#ff4d4d"]]},
  {"id": "o8", "side": "opp", "label": "8", "path": [[0, 64, 30]]}],
 "ball": {"path": [[0, 64, 30], ["TX-003", 64, 30], ["TX-003+1.6", 28, 38]], "lift": ["TX-003", "TX-003+1.6"]},
 "offside": [{"x": 47.5, "at": "TX-003+1.2"}],
 "overlay": [{"text": "ONE STEP", "at": "TX-003+1.4", "pos": "top"}],
 "sfx": [{"name": "chalk", "at": "TX-002"}, {"name": "impact", "at": "TX-003+1.4", "volume": 0.4}]}
```
> [TX-001] Every time an opponent lifts his head to play the long ball, Barça's back four do something most coaches would never dare. [pause 0.4]
> [TX-002] They don't drop. They step forward. [pause 0.6]
> [TX-003] One step — and the striker who was onside a second ago is offside. [pause 1.0]

@scene list title="THREE KEYS"
```json
{"items": [{"at": "TX-004+1", "text": "THE LINE", "sub": "defend by stepping forward"}, {"at": "TX-004+2", "text": "THE HUNT", "sub": "win the ball where it hurts"}, {"at": "TX-005", "text": "THE ROUTE", "sub": "attack before the opponent is set"}],
 "sfx": [{"name": "pop", "at": "TX-004+1"}, {"name": "pop", "at": "TX-004+2"}, {"name": "pop", "at": "TX-005"}]}
```
> [TX-004] Hansi Flick's Barcelona is built on three ideas that work together: the line, the hunt, and the route. [pause 0.4]
> [TX-005] Understand those three, and every Barça match starts to make sense — including the risks. [pause 0.5]
> [TX-006] Let's put them on the chalkboard.

@scene timeline title="THE FLICK ERA"
```json
{"events": [{"at": 0.3, "year": "2024", "text": "Flick appointed"}, {"at": "TX-008", "year": "2024–25", "text": "Liga, Copa, Supercopa"}, {"at": "TX-009", "year": "2025–26", "text": "Supercopa again"}]}
```
> [TX-007] Flick arrived in the summer of 2024, inheriting a young squad and very little money to spend. [pause 0.4]
> [TX-008] In his first season, Barça won the league, the Copa del Rey and the Spanish Super Cup. [pause 0.4]
> [TX-009] And they did it with a style that looked nothing like the slow possession Barça had become famous for.

@scene chapter num="ORIGINS" title="The man who beat Barça 8–2"
> [TX-009a] To understand the idea, you have to go back to one of the worst nights in Barça's history. [pause 0.6]

@scene score home="BARCELONA" away="BAYERN" venue="LISBON" date="14 AUG 2020"
```json
{"events": [{"at": 0.6, "minute": "4", "side": "away", "who": "Müller"}, {"at": 1.0, "minute": "7", "side": "home", "who": "Alaba (og)"}, {"at": 1.4, "minute": "22", "side": "away", "who": "Perišić"}, {"at": 1.8, "minute": "27", "side": "away", "who": "Gnabry"}, {"at": 2.2, "minute": "31", "side": "away", "who": "Müller"}, {"at": 2.6, "minute": "57", "side": "home", "who": "Suárez"}, {"at": 3.0, "minute": "63", "side": "away", "who": "Kimmich"}, {"at": 3.4, "minute": "82", "side": "away", "who": "Lewandowski"}, {"at": 3.8, "minute": "85", "side": "away", "who": "Coutinho"}, {"at": 4.2, "minute": "89", "side": "away", "who": "Coutinho"}],
 "sfx": [{"name": "impact", "at": 4.4, "volume": 0.5}]}
```
> [TX-009b] August 2020. A Champions League quarter-final, played in an empty stadium in Lisbon. Bayern Munich beat Barcelona eight–two. [pause 0.6]
> [TX-009c] Bayern's coach that night was Hansi Flick. [pause 0.5]
> [TX-009d] His Bayern defended with a high line, pressed in packs, and attacked the space the moment they won the ball. Within a year, they had won six trophies. [pause 0.5]
> [TX-009e] Four years later, the club he humiliated asked him to rebuild it. And he brought the same three ideas with him.

@scene chapter num="KEY 1" title="The line"
> [TX-010] Key one. The line. [pause 0.6]

@scene board title="KEY 1 · WHY STEP FORWARD?"
```json
{"camera": [{"at": 0, "zoom": 1.2, "focus": [52, 34]}],
 "tokens": [
  {"id": "d2", "side": "barca", "label": "2", "path": [[0, 46, 12]]}, {"id": "d4", "side": "barca", "label": "4", "path": [[0, 46, 26]]},
  {"id": "d5", "side": "barca", "label": "5", "path": [[0, 46, 42]]}, {"id": "d3", "side": "barca", "label": "3", "path": [[0, 46, 56]]},
  {"id": "m6", "side": "barca", "label": "6", "path": [[0, 58, 34]]}, {"id": "m8", "side": "barca", "label": "8", "path": [[0, 63, 22]]}, {"id": "m10", "side": "barca", "label": "10", "path": [[0, 63, 46]]},
  {"id": "f7", "side": "barca", "label": "19", "path": [[0, 76, 12]]}, {"id": "f9", "side": "barca", "label": "9", "path": [[0, 79, 34]]}, {"id": "f11", "side": "barca", "label": "11", "path": [[0, 76, 56]]}],
 "zones": [{"x": 46, "y": 4, "w": 34, "h": 60, "color": "#1f5fd6", "at": "TX-012", "opacity": 0.18}],
 "labels": [{"text": "COMPACT: ~30 METRES", "at": "TX-012+0.6", "x": 63, "y": 66, "color": "#f2c230"}],
 "arrows": [{"from": [46, 64], "to": [80, 64], "at": "TX-012", "color": "#f2c230"}]}
```
> [TX-011] Most teams defend by dropping back towards their own goal. It's safe. But it leaves huge gaps between the defence and the midfield. [pause 0.5]
> [TX-012] Flick does the opposite. By pushing the back four up near the halfway line, he squeezes the whole team into a block of around thirty metres. [pause 0.5]
> [TX-013] In that small space, the opponent has almost no time on the ball — and Barça's players are always close enough to help each other.

@scene board title="KEY 1 · THE OFFSIDE TRIGGER"
```json
{"camera": [{"at": 0, "zoom": 1.4, "focus": [48, 34]}],
 "tokens": [
  {"id": "d2", "side": "barca", "label": "2", "path": [[0, 45, 14], ["TX-015", 45, 14], ["TX-015+0.8", 48, 14]]},
  {"id": "d4", "side": "barca", "label": "4", "path": [[0, 45, 27], ["TX-015", 45, 27], ["TX-015+0.8", 48, 27]]},
  {"id": "d5", "side": "barca", "label": "5", "path": [[0, 45, 41], ["TX-015", 45, 41], ["TX-015+0.8", 48, 41]]},
  {"id": "d3", "side": "barca", "label": "3", "path": [[0, 45, 54], ["TX-015", 45, 54], ["TX-015+0.8", 48, 54]]},
  {"id": "o8", "side": "opp", "label": "8", "path": [[0, 62, 30]], "hi": [["TX-014", "TX-015+1", "#f2c230"]]},
  {"id": "o9", "side": "opp", "label": "9", "path": [[0, 46.5, 35]]}],
 "labels": [{"text": "HEAD UP = TRIGGER", "at": "TX-014+0.5", "x": 62, "y": 22, "color": "#f2c230"}],
 "offside": [{"x": 48, "at": "TX-016"}],
 "overlay": [{"text": "OFFSIDE", "at": "TX-016+0.5", "pos": "bottom", "color": "#ff4d4d"}]}
```
> [TX-014] The trigger is the passer. The moment an opponent in midfield has time to look up, the four defenders read it together. [pause 0.4]
> [TX-015] Instead of turning to run back, they take one coordinated step up. [pause 0.4]
> [TX-016] Any attacker who started his run a fraction early is left stranded in an offside position. [pause 0.5]
> [TX-017] Over Flick's first season, opponents were flagged offside again and again — it became one of the defining images of the team.

@scene board title="KEY 1 · THE RISK"
```json
{"camera": [{"at": 0, "zoom": 1.4, "focus": [44, 34]}],
 "tokens": [
  {"id": "d2", "side": "barca", "label": "2", "path": [[0, 48, 14]]}, {"id": "d4", "side": "barca", "label": "4", "path": [[0, 48, 27]]},
  {"id": "d5", "side": "barca", "label": "5", "path": [[0, 45, 41]], "hi": [["TX-018", 30, "#ff4d4d"]]}, {"id": "d3", "side": "barca", "label": "3", "path": [[0, 48, 54]]},
  {"id": "o9", "side": "opp", "label": "9", "path": [[0, 46.5, 36], ["TX-019", 46.5, 36], ["TX-019+2", 28, 38]]}],
 "zones": [{"x": 0, "y": 0, "w": 45, "h": 68, "color": "#b3123f", "at": "TX-019", "opacity": 0.22}],
 "ball": {"path": [[0, 62, 30], ["TX-019", 62, 30], ["TX-019+1.6", 30, 38]]},
 "overlay": [{"text": "ONE MAN LATE", "at": "TX-018+0.5", "pos": "top", "color": "#ff4d4d"}]}
```
> [TX-018] But the line only works if all four move at once. If one defender hesitates — just one — the trap becomes an open door. [pause 0.5]
> [TX-019] Now there's forty metres of grass behind the defence, and a striker running onto the ball with only the goalkeeper to beat. [pause 0.5]
> [TX-020] That's the deal Flick has made: dominate most moments, and accept that a few will look terrifying.

@scene statement text="Dominate most moments. Survive a few terrifying ones." accent="terrifying"
> [TX-021] That's why Barça's goalkeeper matters so much in this system — he has to play as a sweeper, covering the space behind the line. [pause 0.8]

@scene chapter num="KEY 2" title="The hunt"
> [TX-022] Key two. The hunt. [pause 0.6]

@scene board title="KEY 2 · PRESS THE TRIGGER"
```json
{"camera": [{"at": 0, "zoom": 1.35, "focus": [70, 34]}],
 "tokens": [
  {"id": "ocb", "side": "opp", "label": "4", "path": [[0, 88, 40]], "hi": [["TX-024", "TX-025+2", "#f2c230"]]},
  {"id": "ocb2", "side": "opp", "label": "5", "path": [[0, 88, 26]]},
  {"id": "olb", "side": "opp", "label": "3", "path": [[0, 80, 58]]},
  {"id": "ocm", "side": "opp", "label": "6", "path": [[0, 76, 34]]},
  {"id": "f9", "side": "barca", "label": "9", "path": [[0, 78, 30], ["TX-024", 78, 30], ["TX-024+1", 84, 34]]},
  {"id": "f19", "side": "barca", "label": "19", "path": [[0, 72, 52], ["TX-025", 72, 52], ["TX-025+1", 78, 56]]},
  {"id": "m8", "side": "barca", "label": "8", "path": [[0, 66, 38], ["TX-025", 66, 38], ["TX-025+1", 73, 35]]}],
 "ball": {"path": [[0, 88, 26], ["TX-023+1", 88, 26], ["TX-023+2", 88, 40], ["TX-025", 88, 40], ["TX-025+1.2", 80, 57]]},
 "arrows": [{"from": [84, 34], "to": [86, 39], "at": "TX-024+1", "color": "#f2c230"}],
 "labels": [{"text": "TRAP", "at": "TX-025+1.4", "x": 80, "y": 64, "color": "#f2c230"}],
 "sfx": [{"name": "chalk", "at": "TX-024"}]}
```
> [TX-023] When Barça lose the ball, they don't run back. They hunt. [pause 0.4]
> [TX-024] The press usually starts with a trigger: a pass sideways to a centre-back, a bad touch, a player facing his own goal. [pause 0.4]
> [TX-025] The forward curves his run to block the easy pass, and the players behind him jump onto the next options, herding the ball towards the touchline. [pause 0.4]
> [TX-026] The touchline becomes an extra defender. The opponent runs out of space before he runs out of ideas.

@scene compare
```json
{"left": {"title": "DEEP DEFENCE", "points": ["Win the ball 60 metres from goal", "Long way to attack", "Opponent has time to reorganise"]},
 "right": {"title": "THE HUNT", "points": ["Win the ball 30 metres from goal", "One or two passes to a shot", "Opponent still out of shape"]}}
```
> [TX-027] Why go to all this effort? Because where you win the ball decides what you can do with it. [pause 0.4]
> [TX-028] Win it deep in your own half, and you need ten passes to reach goal. Win it high, and you might need two — against a defence that was set up to attack, not to defend.

@scene chapter num="KEY 3" title="The route"
> [TX-029] Key three. The route. [pause 0.6]

@scene board title="KEY 3 · VERTICAL FIRST"
```json
{"camera": [{"at": 0, "zoom": 1.2, "focus": [60, 34]}],
 "tokens": [
  {"id": "m8", "side": "barca", "label": "8", "path": [[0, 52, 34]], "hi": [["TX-030", "TX-031", "#f2c230"]]},
  {"id": "f19", "side": "barca", "label": "19", "path": [[0, 68, 60], ["TX-031", 68, 60], ["TX-031+1.2", 76, 50]]},
  {"id": "f11", "side": "barca", "label": "11", "path": [[0, 68, 10], ["TX-031", 68, 10], ["TX-031+1.2", 82, 22]]},
  {"id": "f9", "side": "barca", "label": "9", "path": [[0, 74, 34], ["TX-031", 74, 34], ["TX-031+1.2", 70, 34]]},
  {"id": "o1", "side": "opp", "label": "6", "path": [[0, 60, 30]]}, {"id": "o2", "side": "opp", "label": "4", "path": [[0, 80, 30]]}, {"id": "o3", "side": "opp", "label": "5", "path": [[0, 80, 42]]}],
 "arrows": [{"from": [52, 34], "to": [82, 22], "at": "TX-032", "dur": 1.0, "color": "#f2c230", "curve": -60}],
 "ball": {"path": [[0, 52, 34], ["TX-032", 52, 34], ["TX-032+1", 82, 22]]},
 "overlay": [{"text": "FORWARD FIRST", "at": "TX-033", "pos": "top"}]}
```
> [TX-030] The old Barça stereotype is endless sideways passing. Flick's Barça asks a different first question every time a midfielder receives the ball: [pause 0.3]
> [TX-031] can I play forward right now? [pause 0.4]
> [TX-032] The wingers stretch the pitch, the centre-forward drops to pull a defender with him, and the space that opens behind is attacked immediately. [pause 0.4]
> [TX-033] If the forward pass is on, it's played. If not — then they keep the ball, and wait for the next chance.

@scene board title="KEY 3 · THE RIGHT SIDE"
```json
{"camera": [{"at": 0, "zoom": 1.5, "focus": [74, 50]}],
 "tokens": [
  {"id": "y19", "side": "barca", "label": "19", "path": [[0, 74, 60], ["TX-035", 74, 60], ["TX-035+1.4", 80, 48]], "hi": [["TX-034", "TX-036+2", "#f2c230"]]},
  {"id": "rb", "side": "barca", "label": "2", "path": [[0, 64, 62], ["TX-036", 64, 62], ["TX-036+1.5", 82, 63]]},
  {"id": "olb", "side": "opp", "label": "3", "path": [[0, 80, 58], ["TX-035+1", 81, 52]]},
  {"id": "ocb", "side": "opp", "label": "4", "path": [[0, 88, 44]]}],
 "arrows": [{"from": [80, 48], "to": [94, 38], "at": "TX-036+0.8", "color": "#f2c230", "dashed": true}],
 "labels": [{"text": "CUT INSIDE", "at": "TX-035+0.5", "x": 72, "y": 44, "color": "#f2c230"}, {"text": "OVERLAP", "at": "TX-036+1", "x": 76, "y": 68, "color": "#ecebe4"}]}
```
> [TX-034] A lot of that route runs through the right side, where Lamine Yamal starts wide on the touchline. [pause 0.4]
> [TX-035] He receives facing the defender, shapes to cut inside onto his left foot — and that's the moment the defender has to choose. [pause 0.4]
> [TX-036] Show him inside, and he shoots or slides a pass through. Show him outside, and the full-back overlaps into the space he just created.

@scene chapter num="THE PLAYERS" title="What it asks of each player"
> [TX-036a] A system like this is only as good as the players running it. And it asks something different of every position. [pause 0.5]

@scene list title="THE JOB DESCRIPTION"
```json
{"items": [{"at": "TX-036b", "text": "GOALKEEPER", "sub": "a sweeper: cover the space behind the line"}, {"at": "TX-036c", "text": "CENTRE-BACKS", "sub": "pace + courage to step, not drop"}, {"at": "TX-036d", "text": "MIDFIELD", "sub": "win second balls, turn, play forward"}, {"at": "TX-036e", "text": "FORWARDS", "sub": "the first defenders: curve the press"}]}
```
> [TX-036b] The goalkeeper has to be comfortable thirty metres off his line, sweeping up every ball played over the top. [pause 0.4]
> [TX-036c] The centre-backs need pace — but even more, they need nerve. Stepping forward when every instinct says run back is a decision, not a reflex. [pause 0.4]
> [TX-036d] The midfielders are the engine of the hunt: they win the second balls, and when they win them, their first touch has to go forward. [pause 0.4]
> [TX-036e] And the forwards are the first defenders. Every run they make without the ball decides where the opponent is allowed to play. [pause 0.5]
> [TX-036f] That's why Flick's line-ups can look surprising. He isn't just picking the best players. He's picking the players who fit the machine.

@scene chapter num="THE RISKS" title="How to beat it"
> [TX-037] So how do you beat a team like this? Opponents have found two main answers. [pause 0.5]

@scene list title="TWO ANSWERS"
```json
{"items": [{"at": "TX-038", "text": "RUN EARLY, BEHIND", "sub": "fast forwards timing runs from deep"}, {"at": "TX-040", "text": "BEAT THE FIRST PRESS", "sub": "goalkeeper + calm centre-backs, then go long"}]}
```
> [TX-038] The first is pace in behind: forwards who start their runs from deep, so they arrive at the line at full speed exactly as the ball is played. [pause 0.4]
> [TX-039] Time it perfectly, and the step forward doesn't catch them — it hands them the space. [pause 0.4]
> [TX-040] The second is to survive the press: a calm goalkeeper and centre-backs who can wait, draw Barça forward, and then go long over the top. [pause 0.4]
> [TX-041] Both answers need near-perfect execution. That's the bet Flick makes — that over ninety minutes, the opponent will make more mistakes than his back four.

@scene statement text="The line. The hunt. The route." accent="route" small="One system — three ideas that only work together."
> [TX-042] The line keeps the team compact. The compactness makes the hunt possible. And the hunt creates the chances for the route. [pause 0.5]
> [TX-043] Take one piece away, and the whole thing wobbles. That's what to watch for in the Clásico.

@scene list title="CLÁSICO WATCH-LIST"
```json
{"items": [{"at": "TX-043a", "text": "THE FIRST LONG BALL", "sub": "does the line step together?"}, {"at": "TX-043b", "text": "THE FIRST 10 MINUTES", "sub": "who wins the press — and where?"}, {"at": "TX-043c", "text": "THE RIGHT WING", "sub": "who is left alone with Lamine?"}]}
```
> [TX-043a] So here's what to watch this weekend. First, the opening long ball over the top. Does the line step as one — or does someone hesitate? [pause 0.4]
> [TX-043b] Second, the first ten minutes. If Barça win the ball high early, the opponent starts to play safe, and the hunt gets easier all night. [pause 0.4]
> [TX-043c] And third, the right wing. Watch who is left alone with Lamine Yamal — and how quickly help arrives. [pause 0.6]

@scene question text="WHICH KEY DECIDES THE CLÁSICO?" options="THE LINE,THE HUNT,THE ROUTE"
> [TX-044] So which key do you think decides it this weekend — the line, the hunt or the route? Tell me in the comments. [pause 0.5]

@scene endscreen hold=18 next="THE 2-6: WHEN BARÇA BROKE MADRID →"
> [TX-045] And if you want to see the night Barça broke Real Madrid with a very different idea, the story of the two–six is right here.

---
## فکت‌شیت
| ادعا | منبع |
|---|---|
| فلیک در تابستان ۲۰۲۴ منصوب شد | [ESPN](https://www.espn.com/soccer/story/_/id/49772454/barcelona-lamine-yamal-la-liga-hansi-flick)؛ پوشش عمومی |
| سه‌گانه‌ی داخلی ۲۰۲۴–۲۵ (لیگ، کوپا، سوپرکوپا) | [Wikipedia: Pedri](https://en.wikipedia.org/wiki/Pedri)؛ FotMob |
| سوپرکوپا ۲۰۲۵–۲۶ | [FotMob](https://www.fotmob.com/players/1467236) (فهرست جام‌ها) |
| دفاع با خط بالا و تله‌ی آفساید از امضاهای تیم | پوشش گسترده‌ی تحلیلی ([FMS](https://www.youtube.com/@FootballMadeSimple)). هیچ عدد دقیقی ادعا نشده |
| یامال جناح راست، چپ‌پا | پروفایل عمومی |

> `options` در صحنه‌ی سؤال با کاما جدا شده و بیلدر آن را به آرایه تبدیل می‌کند.
