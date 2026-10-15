# Render on Google Colab (alternative to GitHub Actions)

Use when a single long render is needed and GitHub runners are busy. Runtime: CPU is enough (Remotion renders in headless Chrome); a high-RAM runtime helps.

```bash
# Cell 1 — get the project (public repo, or upload a zip of barca-yt/studio)
!git clone https://github.com/<you>/barca-yt.git
%cd barca-yt/studio
```

```bash
# Cell 2 — Node 22 + dependencies (Linux libs for headless Chrome)
!curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - > /dev/null
!sudo apt-get install -y -qq nodejs ffmpeg libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2 > /dev/null
!npm ci
```

```bash
# Cell 3 — render (concurrency = number of vCPUs)
!npx remotion render src/index.ts FS-Hook-Cruyff out/FS-Hook-Cruyff.mp4 --codec=h264 --crf=18 --concurrency=$(nproc)
```

```python
# Cell 4 — download the result
from google.colab import files
files.download('out/FS-Hook-Cruyff.mp4')
```

Notes
- Measure speed: Remotion prints frames/s; record it in `research/video-templates.xlsx` → «مقایسه‌ی فرمت‌ها» → cloud speed cell.
- Long videos: render scenes separately (`--frames=a-b`) and concatenate with ffmpeg, same as the GitHub workflow.
