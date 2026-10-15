# EP04 — PL · Play Like Lamine Yamal: Beat Your Defender Before the Touch

انتشار: جمعه ۳۱ اکتبر ۲۰۲۶ · حدود ۸:۳۰ · پلی‌لیست Play Like Barça
**حقایق:** تولد ۱۳ ژوئیه ۲۰۰۷؛ قهرمانی یورو ۲۰۲۴ و جوان‌ترین گلزن تاریخ یورو؛ Kopa ۲۰۲۴ و ۲۰۲۵؛ نایب‌قهرمان توپ طلای ۲۰۲۵. بقیه‌ی محتوا اصول عمومی مربیگری دریبل است.

```json
{"id": "EP04-PL", "code": "LY", "title": "Play Like Lamine Yamal: Beat Your Defender Before the Touch", "music": "chalk.mp3",
 "thumb": {"kicker": "PLAY LIKE LAMINE", "title": "BEFORE\nTHE TOUCH", "accent": "TOUCH", "style": "board"}}
```

@scene board title="THE 1v1" lead=0.6
```json
{"camera": [{"at": 0, "zoom": 1.7, "focus": [80, 52]}],
 "tokens": [
  {"id": "y", "side": "barca", "label": "19", "path": [[0, 72, 60], ["LY-002", 76, 58], ["LY-002+0.6", 77, 57.5], ["LY-003", 77, 57.5], ["LY-003+1", 84, 49]], "hi": [["LY-001", "LY-003+2", "#f2c230"]]},
  {"id": "d", "side": "opp", "label": "3", "path": [[0, 82, 56], ["LY-002+0.6", 81, 56.5], ["LY-003+0.4", 81.5, 59]]}],
 "ball": {"path": [[0, 72.6, 60.4], ["LY-002", 76.6, 58.3], ["LY-003", 77.6, 57.8], ["LY-003+1", 84.6, 49.3]]},
 "labels": [{"text": "WEIGHT SHIFTS", "at": "LY-002+0.6", "x": 82, "y": 66, "color": "#ff4d4d"}],
 "overlay": [{"text": "GONE.", "at": "LY-003+1", "pos": "top"}],
 "sfx": [{"name": "whoosh", "at": "LY-003+0.3", "volume": 0.6}]}
```
> [LY-001] Watch the defender, not the winger. [pause 0.5]
> [LY-002] Lamine Yamal slows down. The defender's weight drops onto his heels. [pause 0.4]
> [LY-003] And in that half-second, the duel is already over. [pause 0.8]

@scene list title="THREE SECRETS"
```json
{"items": [{"at": "LY-004+1", "text": "THE APPROACH", "sub": "choose the angle before you arrive"}, {"at": "LY-004+2", "text": "THE BRAKE", "sub": "slow down to speed up"}, {"at": "LY-004+3", "text": "THE READ", "sub": "let the defender's weight decide"}, {"at": "LY-005", "text": "+ A 10-MINUTE DRILL"}]}
```
> [LY-004] Most players think dribbling is about tricks. Step-overs, flicks, skills. [pause 0.4]
> [LY-005] The best dribblers in the world win most of their duels before they even touch the ball. In this video you'll learn the three secrets behind that — and a drill to practise them.
> [LY-005a] And this matters more than ever. Modern defences are compact and well organised. A player who can beat his man one against one breaks that organisation open — he creates the extra player that tactics alone cannot. [pause 0.5]

@scene timeline title="THE RISE"
```json
{"events": [{"at": 0.3, "year": "2007", "text": "Born in Esplugues de Llobregat"}, {"at": "LY-007", "year": "2023", "text": "First-team debut at 15"}, {"at": "LY-008", "year": "2024", "text": "European champion · Kopa Trophy"}, {"at": "LY-009", "year": "2025", "text": "Kopa again · Ballon d'Or runner-up"}]}
```
> [LY-006] Lamine Yamal came through La Masia and made his first-team debut at just fifteen. [pause 0.4]
> [LY-007] A year later he was starting for Spain. [pause 0.3]
> [LY-008] At Euro twenty-twenty-four he became the youngest goalscorer in the tournament's history, and won it. [pause 0.4]
> [LY-009] He has won the Kopa Trophy for the world's best young player twice, and in twenty-twenty-five he finished second in the Ballon d'Or. [pause 0.5]
> [LY-010] But you don't need his talent to steal his habits. Let's break them down.

@scene chapter num="SECRET 1" title="The approach"
> [LY-011] Secret one. The approach. [pause 0.6]

@scene board title="SECRET 1 · ANGLE OF ATTACK"
```json
{"camera": [{"at": 0, "zoom": 1.6, "focus": [78, 50]}],
 "tokens": [
  {"id": "y", "side": "barca", "label": "19", "path": [[0, 68, 62], ["LY-013", 68, 62], ["LY-013+2", 76, 55]], "hi": [["LY-013", "LY-015", "#f2c230"]]},
  {"id": "d", "side": "opp", "label": "3", "path": [[0, 80, 56]]}],
 "arrows": [{"from": [68, 62], "to": [80, 62], "at": "LY-012", "color": "#ff4d4d", "until": "LY-013"}, {"from": [68, 62], "to": [77, 55], "at": "LY-013", "color": "#f2c230"}],
 "zones": [{"x": 82, "y": 44, "w": 10, "h": 10, "color": "#f2c230", "at": "LY-014", "opacity": 0.25}, {"x": 82, "y": 58, "w": 10, "h": 8, "color": "#1f5fd6", "at": "LY-014+1", "opacity": 0.25}],
 "labels": [{"text": "STRAIGHT = EASY TO DEFEND", "at": "LY-012+0.5", "until": "LY-013", "x": 74, "y": 68, "color": "#ff4d4d"}, {"text": "INSIDE", "at": "LY-014", "x": 87, "y": 42, "color": "#f2c230"}, {"text": "OUTSIDE", "at": "LY-014+1", "x": 87, "y": 68, "color": "#ecebe4"}]}
```
> [LY-012] Most players run straight at the defender. That's the easiest dribble in the world to defend, because the defender only has to stand still. [pause 0.4]
> [LY-013] Lamine almost never does that. He arrives at a slight angle, aiming at the defender's front foot. [pause 0.4]
> [LY-014] That angle creates two doors at the same time: the space inside, onto his left foot, and the space outside, down the line. [pause 0.4]
> [LY-015] The defender can only close one door. Lamine decides which one, after the defender has moved. [pause 0.6]
> [LY-016] Your takeaway: never arrive straight. Arrive at an angle that threatens both sides.
> [LY-016a] The most common mistake is arriving too fast and too straight, then trying to invent something at the last second. By then the defender is set, and you have nothing left to choose from. [pause 0.4]
> [LY-016b] To practise alone, put a cone where the defender would stand. Approach it twenty times from slightly different angles, and after each run ask yourself: could I have gone both ways from here? [pause 0.4]
> [LY-016c] Next time you watch him play, ignore the ball for one attack. Watch only his line of approach. You will see the angle every single time.

@scene chapter num="SECRET 2" title="The brake"
> [LY-017] Secret two. The brake. [pause 0.6]

@scene compare
```json
{"left": {"title": "FULL SPEED", "points": ["Defender runs with you", "No time to read him", "Easy to show you outside"]},
 "right": {"title": "BRAKE, THEN GO", "points": ["Defender has to stop too", "His weight lands on his heels", "Your first step is faster than his"]}}
```
> [LY-018] Here's the counter-intuitive part. The most dangerous moment for a defender isn't when the winger is sprinting at him. It's when the winger slows down. [pause 0.4]
> [LY-019] When Lamine brakes, the defender has to brake too. And a defender who stops is a defender standing on his heels. [pause 0.4]
> [LY-020] From standing, the attacker always wins the first step — because the attacker knows when he's going to go, and the defender has to react. [pause 0.5]
> [LY-021] Watch any of his dribbles in slow motion. Fast, slow, fast. The change of speed does more damage than any trick.
> [LY-021a] The mistake here is braking too late, right in front of the defender. Brake three or four metres away, while you still have room to accelerate past him. [pause 0.4]
> [LY-021b] Practise it with nothing but a line on the ground: sprint, stop with the ball dead at your feet, explode again. Ten times on your stronger foot, ten on your weaker one.

@scene statement text="Slow down to speed up." accent="speed up" hold=1.0
> [LY-022] Slow down to speed up. It sounds too simple. It's the hardest thing to defend in football. [pause 0.6]

@scene chapter num="SECRET 3" title="The read"
> [LY-023] Secret three. The read. [pause 0.6]

@scene board title="SECRET 3 · READ THE WEIGHT"
```json
{"camera": [{"at": 0, "zoom": 1.8, "focus": [80, 54]}],
 "tokens": [
  {"id": "y", "side": "barca", "label": "19", "path": [[0, 76, 58], ["LY-025+1", 76, 58], ["LY-025+2", 83, 50], ["LY-026", 76, 58], ["LY-026+1.5", 86, 62]]},
  {"id": "d", "side": "opp", "label": "3", "path": [[0, 80, 57], ["LY-025", 80.5, 59], ["LY-026", 80, 57], ["LY-026+0.5", 79.5, 55]]}],
 "labels": [{"text": "LEANS OUTSIDE → GO INSIDE", "at": "LY-025", "until": "LY-026", "x": 80, "y": 68, "color": "#f2c230"}, {"text": "LEANS INSIDE → GO OUTSIDE", "at": "LY-026", "x": 80, "y": 68, "color": "#f2c230"}],
 "arrows": [{"from": [76, 58], "to": [83, 50], "at": "LY-025+1", "color": "#f2c230", "until": "LY-026"}, {"from": [76, 58], "to": [86, 62], "at": "LY-026+0.6", "color": "#f2c230"}]}
```
> [LY-024] So how does he decide which door to take? He doesn't guess. He reads the defender's weight. [pause 0.4]
> [LY-025] If the defender leans to protect the outside, the inside opens — cut onto the left foot. [pause 0.4]
> [LY-026] If the defender leans inside to block the cut, the line opens — go outside. [pause 0.5]
> [LY-027] The trick is to keep the ball close enough that you can still go either way at the moment of the read. A heavy touch commits you before the defender does. [pause 0.5]
> [LY-028] That's why his touches look so small. He isn't being fancy. He's keeping both doors open until the last moment.
> [LY-028a] When young players watch highlights, they copy the finish. Coaches watch the moment before it: the tiny pause where the attacker reads the defender. That pause is the skill. [pause 0.4]
> [LY-028b] A simple way to train the read alone is with a friend who stands still and leans left or right at the last moment. Your only job is to go the other way. It sounds easy. At full speed, it is not.

@scene list title="THE OUTSIDE OF THE BOOT"
```json
{"items": [{"at": "LY-029", "text": "PASS WITHOUT OPENING UP", "sub": "the defender never sees it coming"}, {"at": "LY-030", "text": "CURVE AWAY FROM THE KEEPER", "sub": "crosses and shots that bend late"}, {"at": "LY-031", "text": "PRACTISE BOTH WAYS", "sub": "inside and outside of the same foot"}]}
```
> [LY-029] There's one more detail worth stealing: the outside of the boot. Lamine often passes with the outside of his left foot — without changing his body shape. [pause 0.4]
> [LY-030] The defender is reading a dribble, and the ball goes past him as a pass. Or it curves into the box, away from the goalkeeper. [pause 0.4]
> [LY-031] It's a skill you can practise against any wall: the same foot, inside and outside, until both feel natural.

@scene chapter num="BONUS" title="After the 1v1"
> [LY-031a] Beating the defender is only half the job. What you do in the next second decides whether it was worth it. [pause 0.5]

@scene list title="THE NEXT SECOND"
```json
{"items": [{"at": "LY-031b", "text": "THE CUT-BACK", "sub": "low and back, into the space behind the runners"}, {"at": "LY-031c", "text": "THE NEAR POST", "sub": "hard and early, before the keeper sets"}, {"at": "LY-031d", "text": "THE CURLER", "sub": "open the body, bend it into the far corner"}]}
```
> [LY-031b] Option one: the cut-back. When the defenders all sprint back towards their own goal, the space opens behind them, around the penalty spot. A pass rolled back into that space is one of the most dangerous balls in football. [pause 0.4]
> [LY-031c] Option two: the near post. A hard, low ball across the six-yard box, played before the goalkeeper has time to set his feet. [pause 0.4]
> [LY-031d] And option three, the one everyone knows: cut inside onto the left foot, open the body, and curl it towards the far corner. [pause 0.4]
> [LY-031e] The secret is that he decides between them by looking up after the dribble — not before it. That one glance is why defenders can never be sure what comes next.

@scene chapter num="THE DRILL" title="Brake & read"
> [LY-032] Here's the drill. [pause 0.4]

@scene board title="THE BRAKE-AND-READ DRILL" tag="DRILL"
```json
{"camera": [{"at": 0, "zoom": 1.9, "focus": [52, 34]}],
 "tokens": [
  {"id": "g1", "side": "neutral", "label": "L", "path": [[0, 60, 28]]}, {"id": "g2", "side": "neutral", "label": "R", "path": [[0, 60, 40]]},
  {"id": "me", "side": "barca", "label": "YOU", "path": [[0, 42, 34], ["LY-034", 50, 34], ["LY-034+0.8", 52, 34], ["LY-035", 52, 34], ["LY-035+1", 59, 40]]},
  {"id": "df", "side": "opp", "label": "D", "path": [[0, 55, 34], ["LY-035", 55.5, 33], ["LY-035+0.6", 55, 31]]}],
 "arrows": [{"from": [52, 34], "to": [60, 40], "at": "LY-035+0.5", "color": "#f2c230"}],
 "overlay": [{"text": "3 × 3 MINUTES", "at": "LY-036", "pos": "bottom"}]}
```
> [LY-033] Two small goals or cones about five metres apart. A friend defends in front of them. [pause 0.4]
> [LY-034] You dribble in at an angle, brake hard a few metres from the defender, and watch his weight. [pause 0.4]
> [LY-035] The moment he leans one way, you go through the other gate. You only score if your exit was a reaction to him — not a decision you made before. [pause 0.5]
> [LY-036] Three minutes slow. Three minutes at full speed. Three minutes where the defender is allowed to fake. [pause 0.4]
> [LY-037] Then make it harder: smaller gates, a second defender, or only your weaker foot. [pause 0.4]
> [LY-037a] And finish every rep: after you go through the gate, look up and play a cut-back to a cone, or shoot into a small goal. The dribble is never the end of the move.

@scene question text="WHO SHOULD WE BREAK DOWN NEXT?" options="BUSQUETS,XAVI,RAPHINHA"
> [LY-038] Who should we break down next? Tell me in the comments. [pause 0.5]

@scene endscreen hold=18 next="PLAY LIKE PEDRI →"
> [LY-039] And if you missed it, here's how Pedri sees the whole pitch before the ball even reaches him.

---
## فکت‌شیت
| ادعا | منبع |
|---|---|
| تولد ۲۰۰۷، ماسیا، دبیو در ۱۵ سالگی | [FotMob](https://www.fotmob.com/players/1467236)، [The Analyst](https://theanalyst.com/football/player/sc-593109/lamine-yamal) |
| قهرمان یورو ۲۰۲۴ و جوان‌ترین گلزن تاریخ یورو | پوشش عمومی UEFA (گل به فرانسه در نیمه‌نهایی، ۹ ژوئیه ۲۰۲۴) [VERIFY] |
| Kopa ۲۰۲۴ و ۲۰۲۵؛ نایب‌قهرمان توپ طلای ۲۰۲۵ | [Flashscore](https://www.flashscore.dk/news/ballon-dor-2025-winners/2ob5gx7C/)، [SI](https://www.si.com/soccer/ballon-dor-2025-winners-full-list) |
| محل تولد: Esplugues de Llobregat | [VERIFY] (در غیر این صورت فقط «Catalonia») |
