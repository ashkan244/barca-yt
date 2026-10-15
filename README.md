# barca-yt — The Culer Files (کانال انگلیسی هواداران بارسا)

## اسناد (به ترتیب خواندن)
1. [research/03-final-model.md](research/03-final-model.md) — **مدل نهایی:** هویت، فرمت‌ها، ریتم، ۱۲ ویدیوی اول، احتمال موفقیت، شاخص‌ها
2. [research/04-requirements.md](research/04-requirements.md) — **نیازمندی‌ها در ۹ سطح** با اولویت و معیار پذیرش
3. [research/strategy.xlsx](research/strategy.xlsx) — شواهد بازار، بنچمارک کانال‌ها، امتیاز فرمت‌ها، مدل احتمال، تقویم
4. [research/video-templates.xlsx](research/video-templates.xlsx) — الگوی زمانی هر فرمت (برش‌خورده در طول ویدیو) + برآورد رندر
5. [research/01-decisions.md](research/01-decisions.md) و [research/02-tools-ideas.md](research/02-tools-ideas.md) — تحقیق پایه: حقوقی، ابزارها، منابع، ایده‌ها

## کد
- `studio/` — پروژه‌ی Remotion (تخته‌ی گچی، فیلتر آرشیوی، تامبنیل‌ها)
  - پیش‌نمایش: `cd studio && npx remotion studio src/index.ts`
- `.github/workflows/render.yml` — رندر ابری تکه‌تکه و موازی (Actions → Render video)
- `cloud/colab-render.md` — رندر در Google Colab
- `tools/` — سازنده‌ی شیت‌ها (exceljs)
- `assets/photos/` — عکس‌های آزاد + `licenses.tsv`

## قدم‌های بعدی (نیاز به شما)
1. ساخت مخزن GitHub (عمومی = دقیقه‌های رایگان) و push این پوشه، سپس اجرای اولین رندر ابری برای اندازه‌گیری سرعت
2. کلید Gemini API + پلن ElevenLabs Creator در `.env`
3. تأیید نام کانال (The Culer Files) و ساخت کانال
4. سفارش تصویرسازی ۸ تا ۱۰ بازیکن (اختیاری، بعد از تست A/B تامبنیل)
