// Builds research/video-templates.xlsx: one timeline-sliced sheet per video format,
// plus an overview "strip" sheet and a format comparison sheet with render estimates.
const ExcelJS = require('exceljs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'research', 'video-templates.xlsx');
const FONT = 'Arial';

// Segment types -> colour + Persian label + short code
const TYPES = {
  HOOK:   {fa: 'قلاب',            color: 'E53935', code: 'H'},
  TEASE:  {fa: 'پیش‌نمایش/وعده',   color: 'FBC02D', code: 'T'},
  CTX:    {fa: 'زمینه',           color: 'FB8C00', code: 'C'},
  CH:     {fa: 'فصل اصلی',        color: '1E88E5', code: 'F'},
  BREATH: {fa: 'تنفس/جمع‌بندی کوتاه', color: 'B0BEC5', code: 'B'},
  REVEAL: {fa: 'اوج/افشا',        color: '8E24AA', code: 'R'},
  HUMAN:  {fa: 'لحظه‌ی انسانی',    color: 'D81B60', code: 'M'},
  CTA:    {fa: 'سؤال/دعوت',       color: '43A047', code: 'Q'},
  OUTRO:  {fa: 'پایان/اند‌اسکرین',  color: '424242', code: 'E'},
};

const s = (t) => { const [m, sec] = t.split(':').map(Number); return m * 60 + sec; };

// [start, end, type, title, goal, narration(EN sample), visual, components, audio, retention, assets, effort 1-5]
const FORMATS = [
  {
    id: 'FS', sheet: 'FS داستان کامل', name: 'The Full Story — زندگی‌نامه‌ی تصویرسازی‌شده (HERO)',
    title: 'The Full Story of Johan Cruyff at Barça (Illustrated)',
    cadence: 'ماهانه', pillar: 'HERO / همیشه‌سبز', risk: 'کم (عکس CC0 + تصویرسازی)',
    segs: [
      ['0:00','0:30','HOOK','عکس آرشیوی ← تبدیل به تصویرسازی + یک ادعای بزرگ','حس «سند» + کنجکاوی','He changed this club twice — once with his feet, once with a whiteboard.','عکس CC0 با وایپ به فیلتر جوهر/دوتون (پروتوتایپ StoryHook)','IllustratedPhoto, Wipe, Halftone, Grain','پیانو + صدای شاتر قدیمی','تبدیل بصری عکس جلوی چشم','Anefo/Nationaal Archief CC0 — licenses.tsv',3],
      ['0:30','1:10','TEASE','نقشه‌ی سفر و سه پرده','قول ساختار','Three acts: the player, the exile, the architect. And one decision in 1988 that still shapes every Barça team.','کارت سه پرده + فلش‌فوروارد سریع','ActCards, MontageFlash','موزیک اینترو بدون لوگو','وعده‌ی «تصمیم ۱۹۸۸»','—',2],
      ['1:10','5:00','CTX','ریشه‌ها: آمستردام، آژاکس، فوتبال توتال','بنای شخصیت','[Childhood fact]. A boy who lived [X] metres from the Ajax ground...','نقشه + عکس‌های آزاد + تخته‌ی ساده‌ی فوتبال توتال','MapRoute, IllustratedPhoto, Pitch','موزیک دهه‌ی ۶۰','کاراکتر با خواسته و مانع','حقایق عمومی + عکس آزاد',3],
      ['5:00','5:20','BREATH','کارت «پرده‌ی ۱: بازیکن»','ریست','—','ChapterTitle','ChapterTitle','سکوت کوتاه','—','—',1],
      ['5:20','12:00','CH','۱۹۷۳: انتقال، ۰-۵ برنابئو، قهرمانی','اوج بازیکنی','[Date]. The most expensive transfer in the world lands in a city that needed a reason to believe.','تیتر روزنامه (بازسازی) + اسکوربورد قدیمی + عکس‌های CC0 بارسا ۱۹۷۴–۷۸','NewspaperHeadline, ScoreBug(retro), IllustratedPhoto','جمعیت آرشیوی (CC0)','نقطه‌ی اوج اول','Mundo Deportivo (نقل کوتاه) + CC0',4],
      ['12:00','12:20','BREATH','«پرده‌ی ۲: تبعید»','پرش زمانی','—','TimeJump','TimeJump','tick ساعت','—','—',1],
      ['12:20','17:00','CH','سال‌های دور: آمریکا، بازگشت به هلند','لایه‌ی انسانی و شکست','[Fact about later career]. Few expected him back in Barcelona.','عکس‌های آزاد + تایم‌لاین','Timeline, IllustratedPhoto','موزیک تأملی','تعلیق','حقایق عمومی',3],
      ['17:00','17:20','BREATH','«پرده‌ی ۳: معمار» — عکس CC0 خروج از اسخیپول به بارسلونا (۱۹۸۸)','تحول','1988. Schiphol airport. A one-way ticket.','عکس CC0 cruyff-01','IllustratedPhoto','پیانو','عکس واقعی همان لحظه','CC0 (Rob Croes/Anefo)',1],
      ['17:20','26:00','CH','تیم رؤیایی: ۳-۴-۳، ومبلی ۱۹۹۲','اوج مربیگری + آموزش سیستم','His team attacked with a back three and a goalkeeper who played like a defender.','تخته‌ی گچی ۳-۴-۳، حرکت مثلث‌ها، بازسازی گل ومبلی (از حقایق عمومی)','Pitch, Formation, Arrow, ScoreBug','موزیک حماسی','بازسازی لحظه‌ی بزرگ','حقایق عمومی',5],
      ['26:00','31:00','REVEAL','میراث: ماسیا، گواردیولا، امروز','پرداخت وعده‌ی «تصمیم ۱۹۸۸»','That decision in 1988 is why [current player] plays the way he does tonight.','شجره‌ی تأثیر تا بازیکنان امروز','InfluenceTree','موزیک اوج','اتصال گذشته به امروز','حقایق عمومی',3],
      ['31:00','33:30','HUMAN','خاطره‌ی هوادار / نقل‌قول کوتاه','احساس','"[Fan memory]" — [name], [city].','پارالاکس عمق روی آخرین عکس + کارت نقل','ParallaxPhoto(depth), QuoteCard','پیانو','سکوت در پایان','فرم رضایت',2],
      ['33:30','34:10','CTA','قسمت بعد را انتخاب کنید','کامنت + جهت سری','Who gets the next Full Story — Kubala, Ronaldinho, or Xavi?','سه کارت گزینه','PollCards','—','مشارکت','—',1],
      ['34:10','35:00','OUTRO','اند‌اسکرین','ارجاع','The night his idea finally won everything — the 2-6 — is right here.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'PL', sheet: 'PL بازی مثل بارسا', name: 'Play Like Barça — آموزشی (CORE هفتگی)',
    title: 'Play Like Pedri: The 3 Habits Nobody Teaches',
    cadence: 'هفتگی', pillar: 'جستجو / همیشه‌سبز', risk: 'کم',
    segs: [
      ['0:00','0:12','HOOK','خطای رایج در برابر عادت پدری','ارزش فوری برای بازیکن','Most midfielders look at the ball. Pedri looks at everything else first.','دو مهره کنار هم: یکی بدون اسکن، یکی با قوس‌های اسکن','Token, ScanArcs, SplitPitch','ضربه + whoosh','مقایسه‌ی فوری','انیمیشن خودمان',2],
      ['0:12','0:35','TEASE','سه عادت + تمرین در پایان','قول مشخص و کاربردی','Three habits — and a 10-minute drill at the end you can do tomorrow.','سه کارت عادت + آیکون تمرین','HabitCards','موزیک ریتمیک','وعده‌ی تمرین (نگه‌داشت تا آخر)','—',1],
      ['0:35','3:00','CH','عادت ۱: اسکن قبل از دریافت','آموزش یک اصل','Before the ball arrives: left shoulder, right shoulder, then receive.','قوس‌های اسکن، شمارنده‌ی نگاه، فریز','Token, ScanArcs, Counter, Freeze','SFX گچ','شمارش اسکن روی صفحه','اصول عمومی مربیگری',3],
      ['3:00','5:20','CH','عادت ۲: بدن باز (half-turn)','آموزش یک اصل','Receive on the half-turn and the whole pitch opens in front of you.','زاویه‌ی بدن با نقاله، دو گزینه‌ی پاس','Token, Protractor, Arrow','—','نقاله و زاویه','اصول عمومی',3],
      ['5:20','5:35','BREATH','جمع‌بندی ۲ عادت','ریست','—','کارت','ChapterTitle','—','—','—',1],
      ['5:35','7:40','CH','عادت ۳: پاس بعدی را آسان کن','عمیق‌ترین ایده','The best pass is the one that makes the next pass easy.','زنجیره‌ی پاس شماره‌گذاری‌شده','PassChain, Arrow','موزیک اوج','ایده‌ی «آها»','اصول عمومی',3],
      ['7:40','9:30','REVEAL','تمرین ۱۰ دقیقه‌ای (rondo/اسکن)','پرداخت وعده','Set up four cones like this. Every time you receive, call out the colour behind you.','دیاگرام تمرین متحرک + تایمر','DrillDiagram, Timer','موزیک ریتمیک','کاربردی و قابل ذخیره (save)','طراحی خودمان (بازبینی مربی)',3],
      ['9:30','9:50','CTA','«کدام بازیکن بعدی؟»','کامنت','Which Barça player should we break down next?','کارت سؤال','QuestionCard','—','—','—',1],
      ['9:50','10:00','OUTRO','اند‌اسکرین','ارجاع','Now learn how Lamine beats a defender before the touch.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'A', sheet: 'A تحلیل تاکتیکی', name: 'تحلیل تاکتیکی بعد از بازی بزرگ (TX)',
    title: 'The Tactics Behind [Clásico result] — Explained',
    cadence: 'بعد از بازی‌های بزرگ (۴۸ ساعت)', pillar: 'TIMELY / جستجو', risk: 'کم',
    segs: [
      ['0:00','0:15','HOOK','بازسازی یک ضدحمله‌ی خطرناک','در ۱۵ ثانیه ارزش ویدیو را نشان بده',"One step. That's the distance between Barça's best weapon and their biggest risk.",'تخته‌ی گچی: خط دفاعی بالا، یک پاس بلند، ایست روی آفساید','Pitch, PlayerDot, Arrow, OffsideLine, Freeze','ضربه‌ی بیس + سکوت ناگهانی','قطع ناگهانی تصویر در لحظه‌ی حساس','انیمیشن خودمان',3],
      ['0:15','0:45','TEASE','سه کلید بازی','قول مشخص: ۳ چیز یاد می‌گیری',"Three things will decide Sunday. The third one is the one nobody's talking about.",'سه کارت شماره‌دار که یکی‌یکی می‌آیند؛ سومی مات','StatCard x3, ChapterTitle','موزیک ریتمیک ملایم','ایجاد کنجکاوی برای کلید سوم','—',1],
      ['0:45','1:45','CTX','فرم، جدول، مصدومیت‌ها','بیننده را در وضعیت فعلی قرار بده',"Barça arrive [X] points clear, but without [injured player] the right side looks different.",'جدول لیگ متحرک، کارت مصدومان، ترکیب احتمالی','Table, LineupCard, InjuryTag','موزیک زیر صدا (−20dB)','اعداد با شمارنده‌ی متحرک','حقایق عمومی + منبع',2],
      ['1:45','4:15','CH','کلید ۱: خط بالا و تله‌ی آفساید','شواهد تاکتیکی با ۲ تا ۳ صحنه‌ی بازسازی‌شده',"Watch the back four. They don't drop when the ball-carrier lifts his head — they step.",'۳ سکانس بازسازی‌شده + زوم روی فاصله‌ها + خط‌کش متری','Pitch, PlayerDot(keyframes), Zone, Ruler, OffsideLine','SFX کشیدن گچ، whoosh روی زوم','تغییر زاویه‌ی دوربین هر ۲۰ تا ۳۰ ثانیه','کدگذاری دستی صحنه‌ها',4],
      ['4:15','4:30','BREATH','جمع‌بندی کلید ۱','ریست توجه','So that is key one: the line is a weapon, and a gamble.','کارت خلاصه‌ی یک‌خطی','ChapterTitle','افت موزیک','مکث کوتاه قبل از فصل بعد','—',1],
      ['4:30','6:45','CH','کلید ۲: دوئل یامال با جناح چپ حریف','تقابل بازیکن به بازیکن','[Full-back] has faced Lamine [X] times. Here is what he tried, and what happened.','تصویر تقسیم‌شده: دو مهره، مسیرهای حرکت، نقشه‌ی گرمایی ساده','PlayerDot, Trail, Heatmap(manual), SplitScreen','موزیک کمی بالاتر','مقایسه‌ی تصویری دو نفر','داده‌ی پایه + مشاهده',4],
      ['6:45','9:00','CH','کلید ۳: تهدید ضدحمله‌ی حریف','کلید غافلگیرکننده (همان وعده‌ی قلاب)','This is the one nobody talks about: the second ball after the press is broken.','بازسازی ۲ ضدحمله؛ ناحیه‌ی خالی پشت خط','Zone, Arrow(path draw), Ghost players','ضربان قلب ملایم (SFX)','پاسخ به کنجکاوی ابتدای ویدیو','کدگذاری دستی',4],
      ['9:00','10:30','REVEAL','دو سناریو: برد بارسا / باخت بارسا','جمع‌بندی تحلیلی با تصویر','If Barça win, it looks like this. If they lose, it will almost certainly look like this.','تخته‌ی دو نیمه: سناریو A و B','SplitPitch, ScenarioTag','موزیک اوج','دو تصویر متضاد','—',3],
      ['10:30','11:20','CTA','پیش‌بینی نتیجه','کامنت گرفتن','Give me your score prediction. I will pin the closest one after the match.','کارت نتیجه‌ی خالی ؟ - ؟','ScoreBug','موزیک کم','وعده‌ی پین کامنت','—',1],
      ['11:20','12:00','OUTRO','اند‌اسکرین','ارجاع به ویدیوی بعدی','If you want to see how the 2-6 was built, that story is right here.','دو کارت ویدیو + سابسکرایب','EndScreen','موزیک امضای کانال','اند‌اسکرین هدفمند','—',1],
    ],
  },
  {
    id: 'B', sheet: 'B کالبدشکافی بازیکن', name: 'کالبدشکافی بازیکن',
    title: 'Why Lamine Yamal Is Impossible to Defend — Explained',
    cadence: 'دو هفته یک بار', pillar: 'جستجو/همیشه‌سبز نسبی', risk: 'کم',
    segs: [
      ['0:00','0:20','HOOK','یک حرکت، فریم به فریم','«چطور این کار را می‌کند؟»','Watch his hips, not the ball. The defender is already beaten here — half a second before the touch.','بازسازی یک دریبل با ghost trail و اسلوموشن','PlayerDot, GhostTrail, SlowMo, Freeze','tick-tick ساعت + whoosh','اسلوموشن و توقف','انیمیشن خودمان',4],
      ['0:20','0:50','TEASE','سه راز','قول مشخص','There are three things defenders cannot fix. The last one is not physical at all.','سه آیکون قفل‌شده','StatCard x3','موزیک ریتمیک','کنجکاوی','—',1],
      ['0:50','2:30','CTX','مسیر: ماسیا تا تیم اول','داستان انسانی کوتاه','[Year]: a kid from [neighbourhood] walks into La Masia...','تایم‌لاین + عکس آزاد (CC) با پارالاکس','Timeline, ParallaxPhoto, MapPin','موزیک احساسی ملایم','شروع داستان شخصی','عکس CC BY/CC0 + ثبت لایسنس',3],
      ['2:30','5:30','CH','راز ۱: فریب بدن و برش به داخل','تحلیل تکنیک','Every defender knows he cuts inside. Here is why knowing does not help.','۳ نمونه کنار هم؛ زاویه‌ی بدن با نقاله','PlayerDot, Protractor, SplitScreen','SFX گچ','نقاله و اندازه‌گیری، حس علمی','کدگذاری دستی',4],
      ['5:30','5:45','BREATH','جمع‌بندی ۱','ریست','Secret one: the decision is made before the touch.','کارت','ChapterTitle','افت موزیک','—','—',1],
      ['5:45','8:45','CH','راز ۲: کجا توپ می‌گیرد','موقعیت‌یابی بین خطوط','He receives where nobody is responsible for him: between the lines, on the half-turn.','نقشه‌ی مناطق دریافت (دستی) + سایه‌ی مسئولیت مدافعان','Zone, Heatmap(manual), ShadowCover','موزیک متوسط','تصویرسازی مفهوم «منطقه‌ی بی‌صاحب»','مشاهده‌ی خودمان',4],
      ['8:45','11:30','CH','راز ۳: تصمیم‌گیری (غیرفیزیکی)','پاسخ به وعده‌ی قلاب','The third secret: he chooses the pass that makes the next pass easy.','زنجیره‌ی پاس با شماره‌گذاری','PassChain, Arrow(path draw)','موزیک اوج','پرداخت وعده','آمار پایه + مشاهده',4],
      ['11:30','13:00','REVEAL','مدافع‌ها چه می‌کنند و چرا شکست می‌خورند','نقشه‌ی ضد','Here is the plan most teams try. And here is the exact moment it breaks.','دو مدافع / دوبل‌کاور و شکافش','PlayerDot, Zone, Freeze','ضربه‌ی بیس','لحظه‌ی «آها»','—',3],
      ['13:00','14:15','HUMAN','مقایسه‌ی منصفانه با گذشته','زاویه‌ی میراث','At the same age, [legend] had [fact]. Different paths, same question.','کارت‌های مقایسه + نقل‌قول کوتاه با منبع','QuoteCard, StatCompare','موزیک احساسی','نقل‌قول واقعی با منبع','حقیقت عمومی + منبع',2],
      ['14:15','14:40','CTA','سؤال','کامنت','Which of the three secrets did you notice first? Tell me below.','کارت سؤال','QuestionCard','—','—','—',1],
      ['14:40','15:00','OUTRO','اند‌اسکرین','ارجاع','The player who taught him that move? His story is here.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'C', sheet: 'C مستند تاریخی', name: 'TM — بازی‌ای که… / مستند تاریخی بلند',
    title: "The 2-6: How Guardiola's Barça Broke Real Madrid",
    cadence: 'ماهانه', pillar: 'همیشه‌سبز/اعتبار', risk: 'کم-متوسط (عکس)',
    segs: [
      ['0:00','0:30','HOOK','تیتر روزنامه‌ی فردای بازی','حس «سند تاریخی»','2 May 2009. The next morning, the headline needed only [N] words.','بازسازی تایپوگرافی تیتر + صدای چاپخانه','NewspaperHeadline, Grain, Vignette','صدای جمعیت دور + چاپخانه','تیتر واقعی (نقل کوتاه)','آرشیو Mundo Deportivo (نقل کوتاه+منبع)',3],
      ['0:30','1:30','TEASE','تز ویدیو','ادعای اصلی','This was not a win. It was a manifesto — and you can still see it in every team that presses today.','چند فریم از آینده‌ی ویدیو (مونتاژ سریع)','MontageFlash','موزیک اینترو بدون لوگو','وعده‌ی بزرگ','—',2],
      ['1:30','4:30','CTX','پرده‌ی ۱: بحران ۲۰۰۸ و انتخاب گواردیولا','بنای داستان','[Context]: a dressing room in decline, and a coach with [N] games of experience.','تایم‌لاین + عکس‌های آزاد + نقل‌قول‌های کوتاه','Timeline, ParallaxPhoto, QuoteCard','موزیک تیره','ریسک و تعلیق','عکس CC + منابع کتاب (فقط تحقیق)',3],
      ['4:30','5:00','BREATH','کارت فصل «Act II»','ریست','—','کارت عنوان پرده','ChapterTitle','سکوت کوتاه','نقطه‌ی ورود دوباره','—',1],
      ['5:00','9:00','CH','پرده‌ی ۲: سیستم','توضیح ایده (false 9، پرس)','The idea was simple to draw and almost impossible to stop.','تخته‌ی گچی: شکل تیم، حرکت مسی به مرکز','Pitch, Formation, Arrow, Zone','SFX گچ','آموزش مفهوم با انیمیشن','کدگذاری از روی منابع عمومی',4],
      ['9:00','15:00','CH','پرده‌ی ۳: بازی، گل به گل','اوج روایت','Minute [X]. [Player] receives... and the Bernabéu goes silent.','۶ گل بازسازی‌شده + اسکوربورد + ساعت','ScoreBug, Pitch, PlayerDot, Clock','جمعیت + موزیک حماسی','ریتم سریع، هر گل یک مینی‌داستان','حقایق عمومی (دقیقه/گلزن)',5],
      ['15:00','15:30','BREATH','روزنامه‌ها فردای آن روز','مکث و بازتاب','Across Spain the next day, the reaction was [summary].','کلاژ تیترها (بازسازی)','NewspaperHeadline x3','—','سند','نقل کوتاه + منبع',2],
      ['15:30','19:30','CH','پرده‌ی ۴: سه‌گانه و پیامد','بزرگ کردن قاب','Within [N] weeks, the same idea won everything.','نقشه‌ی جام‌ها، تایم‌لاین فصل','Timeline, TrophyCount','موزیک پیروزی','شمارنده‌ی جام‌ها','حقایق عمومی',3],
      ['19:30','22:30','REVEAL','چه چیزی را در فوتبال عوض کرد','ادعای تحلیلی بزرگ','Look at how teams pressed before 2009, and after.','نمودار شجره‌ی تأثیر (مربیان و تیم‌ها)','InfluenceTree, Arrow','موزیک تأملی','ارتباط گذشته با امروز','حقایق عمومی + منبع',3],
      ['22:30','24:20','HUMAN','پایان انسانی','احساس','A fan who was in the stadium that night wrote to us: "[quote]".','عکس آزاد/پارالاکس + نقل هوادار (با رضایت)','ParallaxPhoto, QuoteCard','پیانو','لحظه‌ی احساسی','خاطره‌ی هوادار با فرم رضایت',2],
      ['24:20','25:00','OUTRO','اند‌اسکرین','ارجاع','The man who planted this idea 20 years earlier? His story is next.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'D', sheet: 'D سری تاریخی با عکس', name: 'سری تاریخی «روایت با عکس»',
    title: 'Barça Eras, Ep.1 — Johan Cruyff: The Man Who Built Barça',
    cadence: 'هفتگی/دو هفته (سری)', pillar: 'همیشه‌سبز/سری', risk: 'کم (فقط عکس آزاد)',
    segs: [
      ['0:00','0:20','HOOK','یک عکس آرشیوی + نقل‌قول','حس سند و احساس','"[Short real quote]" — said a man who would change this club twice.','عکس Anefo با پارالاکس عمیق؛ کارت نقل‌قول','ParallaxPhoto(depth), QuoteCard, Grain','پیانو + صدای فلاش دوربین قدیمی','پارالاکس واقعی (امضای بصری)','Commons/Anefo (CC0/CC BY-SA) — ثبت لایسنس',3],
      ['0:20','0:40','TEASE','تیتراژ سری','برند سری','Barça Eras. Episode one.','کارت عنوان سری (تایپوگرافی ثابت)','SeriesTitle','موزیک امضای سری','تکرار برند در همه‌ی قسمت‌ها','—',1],
      ['0:40','2:30','CTX','آمستردام ← بارسلونا، ۱۹۷۳','آغاز سفر','[Year]. The most expensive transfer in the world, and a city waiting for a reason to believe.','نقشه‌ی متحرک آمستردام→بارسلونا + عکس‌ها','MapRoute, ParallaxPhoto, Timeline','موزیک دهه‌ی ۷۰ (تولیدی)','حرکت روی نقشه','حقایق عمومی + عکس آزاد',3],
      ['2:30','5:00','CH','فصل ۱۹۷۳-۷۴ و ۰-۵ برنابئو','اوج بازیکنی','The night of [date]: zero... five.','اسکوربورد قدیمی + تیتر روزنامه (بازسازی) + تخته','ScoreBug(retro), NewspaperHeadline, Pitch','جمعیت آرشیوی (SFX آزاد)','اسکوربورد شمارنده','حقایق عمومی',3],
      ['5:00','5:15','BREATH','کارت گذر زمان: «پانزده سال بعد…»','پرش زمانی','Fifteen years later, he came back. Not to play — to rebuild.','کارت تاریخ با افکت ورق تقویم','TimeJump','tick ساعت','پرش زمانی','—',1],
      ['5:15','8:00','CH','مربی: «تیم رؤیایی»، ومبلی ۱۹۹۲','اوج مربیگری','His team played with three at the back and an idea nobody else dared to try.','تخته‌ی گچی ۳-۴-۳ + عکس‌های آزاد','Formation(3-4-3), Pitch, ParallaxPhoto','موزیک حماسی','آموزش سیستم','عکس آزاد + حقایق عمومی',4],
      ['8:00','10:00','REVEAL','میراث: ماسیا، گواردیولا، فلسفه','پیوند به امروز','Every Barça team since carries his fingerprints. Here is the family tree.','شجره‌ی متحرک: کرایف → گواردیولا → … → امروز','InfluenceTree','موزیک تأملی','ارتباط با بازیکنان امروز','حقایق عمومی',3],
      ['10:00','11:20','HUMAN','پایان احساسی','احساس','[Short real quote], he once said. The club still lives by it.','آخرین عکس با زوم آهسته + نقل‌قول','ParallaxPhoto, QuoteCard','پیانو','سکوت در پایان جمله','نقل کوتاه + منبع',2],
      ['11:20','11:40','CTA','«دوره‌ی بعدی کدام باشد؟»','کامنت و جهت‌دهی سری','Which era should Episode two cover? Kubala? The Dream Team? Tell me.','سه کارت گزینه','PollCards','—','مشارکت در انتخاب قسمت بعد','—',1],
      ['11:40','12:00','OUTRO','پیش‌نمایش قسمت بعد','ادامه‌ی سری','Next time: [teaser].','کارت «قسمت بعد» + اند‌اسکرین','NextEpisode, EndScreen','امضای سری','تعلیق','—',1],
    ],
  },
  {
    id: 'E', sheet: 'E تاریخ شفاهی هوادار', name: 'تاریخ شفاهی هوادار — فقط به‌صورت بخش داخل FS/TM',
    title: 'Where Were You? The 6-1 Night, Told by Fans',
    cadence: 'ماهانه', pillar: 'جامعه/احساس', risk: 'متوسط (رضایت‌نامه)',
    segs: [
      ['0:00','0:25','HOOK','پیام صوتی یک هوادار روی صفحه‌ی سیاه','اصالت انسانی فوری','(Fan voice note) "I had already switched off the TV at 3-1..."','صفحه‌ی سیاه + موج صدا + زیرنویس','Waveform, Captions','فقط صدای هوادار','صدای واقعی انسان','پیام صوتی با فرم رضایت',2],
      ['0:25','1:00','CTX','۴-۰ پاریس: ناامیدی','زمینه','Three weeks earlier, in Paris, it had ended four-nil. Nobody had ever come back from that.','تیترهای بازسازی‌شده + اسکور ۴-۰','NewspaperHeadline, ScoreBug','موزیک تیره','تضاد احساسی','حقایق عمومی',2],
      ['1:00','3:00','HUMAN','صداها ۱: قبل از بازی','معرفی شخصیت‌ها','Meet [name] in [city], [name] in [city], and [name] in [city].','نقشه‌ی جهان با پین هوادارها + کارت هر نفر','WorldMap, MapPin, PersonCard','موزیک ملایم','شخصیت‌پردازی','فرم رضایت + عکس خود هوادار (اختیاری)',3],
      ['3:00','7:00','CH','بازی در ۴ موومان','روایت بازی + واکنش‌ها','Goal by goal, the voices change.','اسکوربورد + بازسازی گل‌ها، بین هر گل یک واکنش','ScoreBug, Pitch, Captions','جمعیت + موزیک بالارونده','تناوب بازی/انسان','حقایق عمومی + خاطرات',4],
      ['7:00','10:00','REVEAL','۷ دقیقه‌ی آخر، ثانیه به ثانیه','اوج','88:00. 89:00. Every second now, someone somewhere is screaming.','ساعت بزرگ، اسلوموشن تخته، تقسیم صفحه با واکنش‌ها','Clock, Pitch, SplitScreen','ضربان قلب → انفجار','کش دادن زمان','حقایق عمومی',5],
      ['10:00','10:20','BREATH','سکوت','تخلیه‌ی احساس','—','صفحه‌ی سفید، فقط نتیجه ۶-۱','ScoreBug','سکوت کامل','سکوت به‌عنوان افکت','—',1],
      ['10:20','12:40','HUMAN','صداها ۲: این شب برای من چه معنی داشت','عمق شخصی','"[What it meant]" — [name], [city].','کارت‌های نقل + عکس شخصی (با رضایت)','QuoteCard, PersonCard','پیانو','داستان شخصی','فرم رضایت',2],
      ['12:40','13:30','CTA','داستان خودت را بفرست','جمع‌آوری برای قسمت بعد','Next episode: [moment]. Send us your story — link in the description.','کارت فرم/لینک','QuestionCard','—','حلقه‌ی مشارکت','—',1],
      ['13:30','14:00','OUTRO','اند‌اسکرین','ارجاع','The tactics behind that night are explained here.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'F', sheet: 'F شبیه‌ساز «اگر…»', name: 'WI — شبیه‌ساز شفاف «اگر…»',
    title: 'What If Neymar Never Left? We Simulated 1,000 Seasons',
    cadence: 'ماهانه', pillar: 'ویروسی/بحث', risk: 'کم (برچسب فرضی)',
    segs: [
      ['0:00','0:20','HOOK','لحظه‌ی دوشاخه','سؤال بزرگ','August 2017. In our version of history, he says no.','خط زمان که دو شاخه می‌شود','TimelineFork','افکت شیشه','تصویر انشعاب تاریخ','—',2],
      ['0:20','1:00','TEASE','قواعد بازی (فرض‌ها)','شفافیت = اعتبار','Everything here is a model, not a prophecy. These are the assumptions — pause and check them.','لیست فرض‌ها روی صفحه','AssumptionList','موزیک ملایم','دعوت به چالش','—',1],
      ['1:00','3:00','CTX','آنچه واقعاً اتفاق افتاد','پایه‌ی مقایسه','In reality, the money went to [players]. Here is what it bought.','تایم‌لاین واقعی ۲۰۱۷-۲۰۲۱','Timeline, StatCard','—','—','حقایق عمومی',2],
      ['3:00','6:00','CH','ساخت مدل (Elo + پواسون) به زبان ساده','آموزش جذاب','Think of every match as rolling two loaded dice...','انیمیشن تاس، توزیع گل','DiceAnim, Distribution','SFX تاس','ساده‌سازی بصری','ClubElo (چک شرایط) یا مدل خودمان',4],
      ['6:00','6:15','BREATH','«و حالا، شبیه‌سازی»','ریست','Let us run it.','شمارنده ۰ تا ۱۰۰۰','Counter','tick سریع','انتظار','—',1],
      ['6:15','10:00','REVEAL','۱۰۰۰ فصل شبیه‌سازی‌شده','اوج داده','In [X]% of our worlds, Barça win the Champions League at least once.','هیستوگرام زنده که پر می‌شود؛ جام‌ها روی هم','LiveHistogram, TrophyStack','موزیک بالارونده','داده‌ی زنده روی صفحه','خروجی مدل خودمان',5],
      ['10:00','12:30','CH','موج‌های بعدی (برچسب: گمانه‌زنی)','عمق روایت','And then the questions get harder: does Messi still leave in 2021?','درخت تصمیم با برچسب «speculation»','DecisionTree, Label','موزیک تأملی','بحث‌برانگیز','—',3],
      ['12:30','13:20','CTA','حکم + سؤال','کامنت','My verdict: [one line]. What counterfactual should we run next?','کارت حکم','VerdictCard','—','پیشنهاد قسمت بعد','—',1],
      ['13:20','14:00','OUTRO','اند‌اسکرین','ارجاع','The real story of that summer is here.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'G', sheet: 'G رتبه‌بندی', name: 'رتبه‌بندی / شمارش معکوس — ❌ حذف در دور ۲ (فقط مرجع)',
    title: '10 Clásico Goals That Changed History',
    cadence: 'ماهانه', pillar: 'کلیک/سرگرمی', risk: 'کم',
    segs: [
      ['0:00','0:15','HOOK','نیم‌نگاه مات به رتبه‌ی ۱','کنجکاوی','Number one is not the goal you think it is.','فریم مات‌شده‌ی رتبه ۱','Blur, Pitch','افکت مرموز','پنهان‌کاری','—',1],
      ['0:15','0:40','TEASE','معیار انتخاب','اعتبار','Not the prettiest. The ones that changed what happened next.','سه معیار با آیکون','CriteriaCards','—','—','—',1],
      ['0:40','5:40','CH','رتبه‌های ۱۰ تا ۶ (هر کدام ۶۰ ثانیه)','ریتم ثابت: بازسازی ۲۰ث + زمینه ۲۵ث + تأثیر ۱۵ث','Number [N]: [Player], [Year]. To understand why it matters, rewind [X] weeks.','بازسازی گل + کارت سال + تیتر','Pitch, ScoreBug, RankBadge','ریتم سریع، تغییر موزیک هر ۲ آیتم','ریتم قابل پیش‌بینی + شگفتی','حقایق عمومی',4],
      ['5:40','6:00','BREATH','نام‌های افتخاری','تنفس','A few that just missed out...','کلاژ سریع','Montage','—','—','—',1],
      ['6:00','10:00','CH','رتبه‌های ۵ تا ۲','بالا رفتن تنش','Number [N]...','همان قالب با شدت بیشتر','Pitch, ScoreBug, RankBadge','موزیک بالارونده','افزایش شدت','حقایق عمومی',4],
      ['10:00','11:20','REVEAL','رتبه‌ی ۱ (۸۰ ثانیه)','پرداخت وعده','Number one. The goal that changed not a match, but an era.','بازسازی کامل + تیتر روزنامه + پیامد','Pitch, NewspaperHeadline','اوج','پاسخ به قلاب','حقایق عمومی',4],
      ['11:20','11:45','CTA','«رتبه‌ی ۱ تو کدام است؟»','کامنت','What is your number one? I already know someone will say [X].','کارت سؤال','QuestionCard','—','بحث در کامنت','—',1],
      ['11:45','12:00','OUTRO','اند‌اسکرین','ارجاع','The full story of number one is here.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'H', sheet: 'H یک لحظه ده زاویه', name: 'یک لحظه، ده زاویه',
    title: 'Iniesta, Stamford Bridge, 93rd Minute — 10 Angles on One Moment',
    cadence: 'ماهانه', pillar: 'امضای کانال', risk: 'کم',
    segs: [
      ['0:00','0:15','HOOK','لحظه، منجمد','میخکوب کردن','Ten seconds. We are going to look at them ten different ways.','تخته با یک فریم ثابت؛ ساعت ۹۲:۴۸','Freeze, Clock, Pitch','سکوت + ضربان','ثابت‌ماندن تصویر','حقایق عمومی',2],
      ['0:15','0:30','TEASE','قاعده‌ی بازی','ساختار','Each angle gets under a minute. By the end, you will never see this goal the same way.','نوار ۱۰ خانه‌ای پیشرفت','ProgressStrip(10)','—','نوار پیشرفت (ماندگاری)','—',1],
      ['0:30','3:00','CH','زاویه‌های ۱ تا ۳: پاس، دوندگی، مدافع','تحلیل فنی','Angle one: the pass that should not have been possible.','هر زاویه: یک دوربین/لایه‌ی متفاوت روی همان لحظه','Pitch, PlayerDot, Arrow, CameraMove','تغییر رنگ موزیک برای هر زاویه','تغییر الگو هر ~۵۰ث','کدگذاری دستی',4],
      ['3:00','5:30','CH','زاویه‌های ۴ تا ۶: ساعت، فصل، داوری','زمینه','Angle five: what this season had cost them before this second.','تایم‌لاین فصل، کارت داوری (فقط حقایق)','Timeline, StatCard','—','—','حقایق عمومی + منبع',3],
      ['5:30','5:45','BREATH','نیمه‌ی راه','ریست','Halfway. Now it gets personal.','نوار پیشرفت ۶/۱۰','ProgressStrip','—','—','—',1],
      ['5:45','8:00','HUMAN','زاویه‌های ۷ تا ۹: جمعیت، فیزیک شوت، روزنامه‌ها','انسانی + علمی','Angle eight: at that distance, the ball took about [X] seconds to reach the net.','فیزیک ساده‌ی شوت + تیتر بازسازی‌شده + خاطره‌ی هوادار','Physics, NewspaperHeadline, QuoteCard','جمعیت آرشیوی','تنوع زاویه‌ها','محاسبه‌ی خودمان + نقل کوتاه',4],
      ['8:00','9:00','REVEAL','زاویه‌ی ۱۰: آنچه بعدش آمد','پیامد بزرگ','Angle ten: without this second, maybe no treble — and maybe no idea that took over football.','شجره‌ی پیامد','InfluenceTree','اوج','پیوند به امروز','حقایق عمومی',3],
      ['9:00','9:35','CTA','«کدام زاویه برایت تازه بود؟»','کامنت','Which angle was new to you? Which moment should get the ten-angle treatment next?','کارت سؤال','QuestionCard','—','پیشنهاد قسمت بعد','—',1],
      ['9:35','10:00','OUTRO','اند‌اسکرین','ارجاع','The full story of that season is here.','EndScreen','EndScreen','امضا','—','—',1],
    ],
  },
  {
    id: 'I', sheet: 'I شورتز مشتق', name: 'Short مشتق از ویدیوی بلند (۹:۱۶)',
    title: 'The Offside Trap in 45 Seconds (from video A)',
    cadence: '۲ تا ۳ عدد برای هر ویدیوی بلند', pillar: 'قیف جذب', risk: 'کم',
    segs: [
      ['0:00','0:02','HOOK','متن درشت + حرکت فوری','توقف اسکرول','Barça\'s riskiest weapon.','تخته‌ی عمودی، اولین فریم پرحرکت','Pitch(vertical), BigText','ضربه','بدون مقدمه','از ویدیوی A',2],
      ['0:02','0:08','CTX','مسئله','چرا مهم است','They defend almost at halfway. Why?','دو خط و فاصله','OffsideLine, Ruler','—','—','—',1],
      ['0:08','0:35','CH','صحنه‌ی اصلی','پرداخت سریع','Watch the line step — and the striker is offside by half a metre.','بازسازی + زیرنویس کلمه‌به‌کلمه','Pitch, Captions(word-level)','موزیک سریع','زیرنویس پویا','از ویدیوی A',2],
      ['0:35','0:42','REVEAL','پانچ‌لاین','لحظه‌ی آها','Weapon. And gamble.','فریز + متن','Freeze, BigText','ضربه','—','—',1],
      ['0:42','0:45','CTA','لوپ / ارجاع به ویدیوی کامل','بازپخش + کلیک','Full breakdown on the channel.','کارت لینک ویدیوی مرتبط','RelatedVideoTag','—','لوپ به ابتدا','—',1],
    ],
  },
];

// ---------- helpers ----------
const thin = {style: 'thin', color: {argb: 'FFCFD8DC'}};
const border = {top: thin, left: thin, bottom: thin, right: thin};
const toSerial = (sec) => sec / 86400;

const wb = new ExcelJS.Workbook();
wb.creator = 'Claude for barca-yt';
wb.calcProperties.fullCalcOnLoad = true;

// ---------- 1. Guide ----------
const guide = wb.addWorksheet('راهنما', {views: [{rightToLeft: true}]});
guide.columns = [{width: 26}, {width: 90}];
const gRows = [
  ['قالب‌های ویدیوی کانال بارسا — نسخه‌ی ۱', ''],
  ['تاریخ', '۱۵ اکتبر ۲۰۲۶'],
  ['چطور بخوانید', 'هر تب یک فرمت است و طول ویدیو را برش زده: هر ردیف یک بخش با زمان شروع/پایان، هدف، نمونه‌ی روایت انگلیسی، تصویر، کامپوننت‌های Remotion، صدا، ترفند ماندگاری و منبع/لایسنس.'],
  ['ستون‌های قابل ویرایش', 'شروع و پایان (به صورت mm:ss) و همه‌ی متن‌ها. «مدت» و «٪ از کل» فرمول‌اند و خودکار حساب می‌شوند.'],
  ['[ ] در روایت', 'هر چیزی داخل [ ] جای حقیقت/عددی است که باید از فکت‌شیت منبع‌دار پر شود. عدد ساختگی ممنوع.'],
  ['رنگ‌ها', 'هر نوع بخش رنگ خودش را دارد (جدول زیر). تب «نمای برش‌ها» همه‌ی فرمت‌ها را به‌صورت نوار رنگی ۱۵ثانیه‌ای کنار هم نشان می‌دهد.'],
  ['تلاش (۱ تا ۵)', 'برآورد زمان تولید آن بخش: ۱ = کارت ساده، ۵ = بازسازی سنگین چند صحنه‌ای.'],
  ['رندر ابری', 'تب «مقایسه‌ی فرمت‌ها» زمان رندر را برای سیستم محلی و GitHub Actions / Google Colab حساب می‌کند؛ سرعت ابری فعلاً فرض است و بعد از اولین تست اندازه‌گیری می‌شود (خانه‌ی زرد).'],
  ['', ''],
  ['نوع بخش', 'معنا'],
];
gRows.forEach((r) => guide.addRow(r));
Object.values(TYPES).forEach((t) => {
  const row = guide.addRow([`${t.code} — ${t.fa}`, '']);
  row.getCell(1).fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + t.color}};
  row.getCell(1).font = {name: FONT, bold: true, color: {argb: 'FFFFFFFF'}};
});
const typeHelp = {
  HOOK: '۰ تا ۲۰ ثانیه: یک لحظه‌ی مشخص یا ادعای تند، بدون اینترو.',
  TEASE: 'قول مشخص به بیننده (مثلاً ۳ چیز) و ایجاد کنجکاوی که بعداً پرداخت می‌شود.',
  CTX: 'زمینه‌ی لازم برای فهم؛ کوتاه.',
  CH: 'بدنه‌ی اصلی؛ هر فصل یک سؤال ← شواهد انیمیشنی ← پاسخ.',
  BREATH: '۱۵ تا ۳۰ ثانیه جمع‌بندی/مکث برای ریست توجه.',
  REVEAL: 'اوج: پرداخت وعده‌ی قلاب یا بزرگ‌ترین بینش.',
  HUMAN: 'نقل‌قول واقعی، خاطره‌ی هوادار، لحظه‌ی احساسی.',
  CTA: 'یک سؤال مشخص برای کامنت (نه «لایک کنید»).',
  OUTRO: 'اند‌اسکرین هدفمند به ویدیوی مرتبط بعدی.',
};
let r0 = gRows.length + 1;
Object.keys(TYPES).forEach((k, i) => { guide.getCell(r0 + i, 2).value = typeHelp[k]; });
guide.getCell('A1').font = {name: FONT, bold: true, size: 16};
guide.eachRow((row) => row.eachCell((c) => { c.alignment = {wrapText: true, vertical: 'top'}; if (!c.font || !c.font.bold) c.font = {name: FONT, size: 11, ...(c.font || {})}; }));
for (let i = 2; i <= 10; i++) guide.getCell(i, 1).font = {name: FONT, bold: true};

// ---------- 2. Per-format sheets ----------
const HEAD = ['#', 'شروع', 'پایان', 'مدت', '٪ از کل', 'نوع', 'بخش', 'هدف', 'نمونه‌ی روایت (EN)', 'تصویر روی صفحه', 'کامپوننت‌های Remotion', 'صدا/موزیک/SFX', 'ترفند ماندگاری', 'منبع/لایسنس', 'تلاش ۱-۵'];
const WID = [4, 8, 8, 7, 8, 14, 26, 24, 46, 34, 28, 22, 22, 26, 8];

const buildFormatSheets = () => FORMATS.forEach((f) => {
  const ws = wb.addWorksheet(f.sheet, {views: [{rightToLeft: true, state: 'frozen', ySplit: 4}]});
  ws.columns = WID.map((w) => ({width: w}));
  ws.mergeCells(1, 1, 1, 15);
  ws.getCell(1, 1).value = `${f.id} — ${f.name}`;
  ws.getCell(1, 1).font = {name: FONT, bold: true, size: 15};
  ws.mergeCells(2, 1, 2, 15);
  ws.getCell(2, 1).value = `نمونه‌ی عنوان: ${f.title}   |   ریتم انتشار: ${f.cadence}   |   ستون محتوایی: ${f.pillar}   |   ریسک حقوقی: ${f.risk}`;
  ws.getCell(2, 1).font = {name: FONT, size: 11, color: {argb: 'FF37474F'}};
  const first = 5, last = first + f.segs.length - 1;
  ws.getCell(3, 1).value = 'طول کل:';
  ws.getCell(3, 2).value = {formula: `MAX(C${first}:C${last})`};
  ws.getCell(3, 2).numFmt = 'mm:ss';
  ws.getCell(3, 4).value = 'جمع تلاش:';
  ws.getCell(3, 5).value = {formula: `SUM(O${first}:O${last})`};
  [1, 2, 4, 5].forEach((c) => (ws.getCell(3, c).font = {name: FONT, bold: true}));
  const hr = ws.getRow(4);
  HEAD.forEach((h, i) => {
    const c = hr.getCell(i + 1);
    c.value = h;
    c.font = {name: FONT, bold: true, color: {argb: 'FFFFFFFF'}};
    c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF263238'}};
    c.alignment = {horizontal: 'center', vertical: 'middle', wrapText: true};
    c.border = border;
  });
  hr.height = 30;
  f.segs.forEach((sg, i) => {
    const rn = first + i;
    const [st, en, type, title, goal, narr, vis, comp, audio, ret, assets, eff] = sg;
    const row = ws.getRow(rn);
    row.values = [i + 1, toSerial(s(st)), toSerial(s(en)), null, null, TYPES[type].fa, title, goal, narr, vis, comp, audio, ret, assets, eff];
    row.getCell(4).value = {formula: `C${rn}-B${rn}`};
    row.getCell(5).value = {formula: `IF($B$3=0,0,(C${rn}-B${rn})/$B$3)`};
    row.getCell(2).numFmt = 'mm:ss';
    row.getCell(3).numFmt = 'mm:ss';
    row.getCell(4).numFmt = 'm:ss';
    row.getCell(5).numFmt = '0%';
    row.eachCell({includeEmpty: true}, (c, col) => {
      c.font = {name: FONT, size: 10};
      c.alignment = {wrapText: true, vertical: 'top', horizontal: col <= 5 || col === 15 ? 'center' : 'right'};
      c.border = border;
    });
    row.getCell(9).alignment = {wrapText: true, vertical: 'top', horizontal: 'left', readingOrder: 'ltr'};
    row.getCell(9).font = {name: FONT, size: 10, italic: true};
    [2, 3].forEach((c) => (row.getCell(c).font = {name: FONT, size: 10, color: {argb: 'FF0000FF'}})); // inputs in blue
    const tc = row.getCell(6);
    tc.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + TYPES[type].color}};
    tc.font = {name: FONT, size: 10, bold: true, color: {argb: 'FFFFFFFF'}};
    row.height = 58;
  });
  ws.getCell(last + 2, 1).value = 'نکته: شروع/پایان (آبی) را ویرایش کنید؛ مدت و درصد خودکار حساب می‌شوند. [ ] = حقیقتی که باید از فکت‌شیت منبع‌دار پر شود.';
  ws.mergeCells(last + 2, 1, last + 2, 15);
  ws.getCell(last + 2, 1).font = {name: FONT, size: 9, italic: true, color: {argb: 'FF607D8B'}};
});

// ---------- 3. Overview strip (15-second buckets) ----------
const BUCKET = 15;
const maxLen = Math.max(...FORMATS.map((f) => s(f.segs[f.segs.length - 1][1])));
const nB = Math.ceil(maxLen / BUCKET);
const ov = wb.addWorksheet('نمای برش‌ها', {views: [{state: 'frozen', xSplit: 1, ySplit: 2}]});
ov.getColumn(1).width = 34;
for (let b = 0; b < nB; b++) ov.getColumn(b + 2).width = 2.6;
ov.getCell(1, 1).value = 'هر خانه = ۱۵ ثانیه. حروف: نوع بخش (راهنما). عددهای بالا = دقیقه.';
ov.getCell(1, 1).font = {name: FONT, size: 9, italic: true};
for (let b = 0; b < nB; b++) {
  if ((b * BUCKET) % 60 === 0) {
    const c = ov.getCell(2, b + 2);
    c.value = (b * BUCKET) / 60;
    c.font = {name: FONT, size: 8, bold: true};
    c.alignment = {horizontal: 'left'};
  }
}
FORMATS.forEach((f, fi) => {
  const rn = 3 + fi;
  const row = ov.getRow(rn);
  row.height = 26;
  const lc = row.getCell(1);
  lc.value = `${f.id} — ${f.name}`;
  lc.font = {name: FONT, size: 10, bold: true};
  lc.alignment = {vertical: 'middle', horizontal: 'right', wrapText: true};
  f.segs.forEach((sg) => {
    const st = s(sg[0]), en = s(sg[1]);
    const bStart = Math.floor(st / BUCKET), bEnd = Math.max(bStart + 1, Math.ceil(en / BUCKET));
    for (let b = bStart; b < bEnd; b++) {
      const c = row.getCell(b + 2);
      c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + TYPES[sg[2]].color}};
      c.border = {left: b === bStart ? {style: 'medium', color: {argb: 'FFFFFFFF'}} : undefined};
      if (b === bStart) {
        c.value = TYPES[sg[2]].code;
        c.font = {name: FONT, size: 8, bold: true, color: {argb: 'FFFFFFFF'}};
        c.alignment = {horizontal: 'center', vertical: 'middle'};
      }
    }
  });
});
const legendRow = 3 + FORMATS.length + 1;
ov.getCell(legendRow, 1).value = 'راهنمای رنگ:';
ov.getCell(legendRow, 1).font = {name: FONT, bold: true};
Object.values(TYPES).forEach((t, i) => {
  const c = ov.getCell(legendRow + 1 + i, 1);
  c.value = `${t.code} — ${t.fa}`;
  c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF' + t.color}};
  c.font = {name: FONT, size: 10, bold: true, color: {argb: 'FFFFFFFF'}};
});

// ---------- 4. Comparison + render estimate ----------
const cmp = wb.addWorksheet('مقایسه‌ی فرمت‌ها', {views: [{rightToLeft: true, state: 'frozen', ySplit: 8}]});
cmp.columns = [{width: 30}, {width: 50}, {width: 11}, {width: 22}, {width: 18}, {width: 14}, {width: 12}, {width: 14}, {width: 14}, {width: 16}];
cmp.getCell('A1').value = 'مقایسه‌ی فرمت‌ها و برآورد زمان رندر';
cmp.getCell('A1').font = {name: FONT, bold: true, size: 15};
const assum = [
  ['فرض‌ها (خانه‌های زرد را ویرایش کنید)', ''],
  ['فریم‌ریت ویدیو (fps)', 30, 'استاندارد کانال'],
  ['سرعت رندر محلی (فریم بر ثانیه)', 1.9, 'اندازه‌گیری‌شده ۱۵ اکتبر ۲۰۲۶: پروتوتایپ تخته‌ی گچی ۱.۶ fps و قلاب آرشیوی ۲.۲ fps (1920×1080، concurrency=2). پروژه‌ی اهواز ۳.۵ fps بود ولی فیلترهای SVG سنگین‌ترند'],
  ['سرعت رندر ابری GitHub Actions / Colab (فریم بر ثانیه)', 6, 'فرض اولیه — باید بعد از اولین رندر آزمایشی اندازه‌گیری و جایگزین شود'],
  ['تعداد قطعه‌های موازی در ابر (jobs)', 4, 'فرض: رندر تکه‌تکه‌ی ویدیو در چند job هم‌زمان (matrix) — محدودیت‌های پلن چک شود'],
];
assum.forEach((a, i) => {
  const rn = 2 + i;
  cmp.getCell(rn, 1).value = a[0];
  cmp.getCell(rn, 1).font = {name: FONT, bold: i === 0};
  if (i > 0) {
    const v = cmp.getCell(rn, 2);
    v.value = a[1];
    v.font = {name: FONT, color: {argb: 'FF0000FF'}};
    v.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FFFFFF00'}};
    v.alignment = {horizontal: 'center'};
    cmp.getCell(rn, 3).value = a[2];
    cmp.getCell(rn, 3).font = {name: FONT, size: 9, italic: true, color: {argb: 'FF607D8B'}};
  }
});
const CH = ['فرمت', 'نمونه‌ی عنوان', 'طول (دقیقه)', 'ریتم انتشار', 'ستون محتوایی', 'ریسک حقوقی', 'جمع تلاش', 'رندر محلی (ساعت)', 'رندر ابری (ساعت)', 'تعداد بخش‌ها'];
const hrow = cmp.getRow(8);
CH.forEach((h, i) => {
  const c = hrow.getCell(i + 1);
  c.value = h;
  c.font = {name: FONT, bold: true, color: {argb: 'FFFFFFFF'}};
  c.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: 'FF263238'}};
  c.alignment = {horizontal: 'center', vertical: 'middle', wrapText: true};
  c.border = border;
});
hrow.height = 30;
FORMATS.forEach((f, i) => {
  const rn = 9 + i;
  const q = `'${f.sheet}'`;
  const row = cmp.getRow(rn);
  row.getCell(1).value = `${f.id} — ${f.name}`;
  row.getCell(2).value = f.title;
  row.getCell(3).value = {formula: `${q}!B3*1440`};
  row.getCell(3).numFmt = '0.0';
  row.getCell(4).value = f.cadence;
  row.getCell(5).value = f.pillar;
  row.getCell(6).value = f.risk;
  row.getCell(7).value = {formula: `${q}!E3`};
  row.getCell(8).value = {formula: `C${rn}*60*$B$3/$B$4/3600`};
  row.getCell(8).numFmt = '0.0';
  row.getCell(9).value = {formula: `C${rn}*60*$B$3/($B$5*$B$6)/3600`};
  row.getCell(9).numFmt = '0.00';
  row.getCell(10).value = {formula: `COUNTA(${q}!G5:G40)`};
  row.eachCell({includeEmpty: true}, (c, col) => {
    c.font = {name: FONT, size: 10, color: {argb: [3, 7, 8, 9, 10].includes(col) ? 'FF008000' : 'FF000000'}};
    c.alignment = {wrapText: true, vertical: 'top', horizontal: col === 2 ? 'left' : col <= 1 ? 'right' : 'center'};
    c.border = border;
  });
  row.height = 32;
});
const note = 9 + FORMATS.length + 1;
cmp.getCell(note, 1).value = 'رنگ سبز = فرمول/لینک به تب دیگر. رندر ابری = (طول × ۶۰ × fps) ÷ (سرعت ابری × تعداد job موازی). زمان آپلود و دانلود خروجی از ابر حساب نشده.';
cmp.mergeCells(note, 1, note, 10);
cmp.getCell(note, 1).font = {name: FONT, size: 9, italic: true, color: {argb: 'FF607D8B'}};

// Format tabs come after guide / overview / comparison
buildFormatSheets();

wb.xlsx.writeFile(OUT).then(() => console.log('wrote', OUT, 'sheets:', wb.worksheets.map((w) => w.name).join(' | ')));
