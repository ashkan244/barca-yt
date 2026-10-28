#!/usr/bin/env bash
# Compatibility entry point: safe, explicit, additive import. Default is dry-run.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec python3 "$SCRIPT_DIR/sync-render-repo.py" "$@"
