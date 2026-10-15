#!/usr/bin/env bash
# Mirror only the render-relevant parts of barca-yt into the PUBLIC render repo
# (../barca-yt-render). Research, strategy sheets and episode bibles stay private.
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DST="$(cd "$SRC/.." && pwd)/barca-yt-render"
mkdir -p "$DST/studio" "$DST/.github/workflows" "$DST/tools/tts"
for p in src public scripts package.json package-lock.json remotion.config.ts tsconfig.json; do
  rm -rf "$DST/studio/$p"
  cp -r "$SRC/studio/$p" "$DST/studio/$p"
done
for p in say.mjs extract.mjs package.json package-lock.json; do cp "$SRC/tools/tts/$p" "$DST/tools/tts/$p"; done
cp "$SRC/.github/workflows/render.yml" "$DST/.github/workflows/render.yml"
cp "$SRC/.gitattributes" "$DST/.gitattributes"
cat > "$DST/.gitignore" <<'EOG'
node_modules/
studio/build/
studio/out/
studio/.audio-tmp/
.env
*.log
EOG
echo "synced -> $DST"
