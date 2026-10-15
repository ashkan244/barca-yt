#!/usr/bin/env bash
# Mirror only the render-relevant parts of barca-yt into the PUBLIC render repo
# (../barca-yt-render). Research, strategy sheets and tools stay private.
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DST="$(cd "$SRC/.." && pwd)/barca-yt-render"
mkdir -p "$DST/studio" "$DST/.github/workflows"
# studio without node_modules/build/out
for p in src public scripts package.json package-lock.json remotion.config.ts tsconfig.json; do
  rm -rf "$DST/studio/$p"
  cp -r "$SRC/studio/$p" "$DST/studio/$p"
done
cp "$SRC/.github/workflows/render.yml" "$DST/.github/workflows/render.yml"
cp "$SRC/.gitattributes" "$DST/.gitattributes"
cat > "$DST/.gitignore" <<'EOF'
node_modules/
studio/build/
studio/out/
.env
*.log
EOF
cat > "$DST/README.md" <<'EOF'
# barca-yt-render

Render-only mirror of a Remotion project (motion graphics for an unofficial FC Barcelona fan channel).
Rendering runs on GitHub Actions: **Actions → Render video → Run workflow**.

Photos in `studio/public/photos` are CC0 (Nationaal Archief / Anefo via Wikimedia Commons); see each folder's `licenses.tsv`.
Not affiliated with FC Barcelona.
EOF
echo "synced -> $DST"
