#!/usr/bin/env bash
# Redimensionne et compresse les visuels dans public/assets (macOS sips).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/public/assets"

resize_jpeg() {
  local max="$1" quality="$2" in="$3" out="$4"
  sips -Z "$max" -s format jpeg -s formatOptions "$quality" "$in" --out "$out" >/dev/null
}

resize_jpeg 1920 82 "$ASSETS/hero1.jpg" "$ASSETS/hero1.jpg"
resize_jpeg 1920 82 "$ASSETS/hero2.jpg" "$ASSETS/hero2.jpg"
resize_jpeg 1600 82 "$ASSETS/PourquoiDhivals.jpg" "$ASSETS/PourquoiDhivals.jpg"
resize_jpeg 800 85 "$ASSETS/NotreApproche.jpg" "$ASSETS/NotreApproche.jpg"

echo "Images optimisées dans $ASSETS"
ls -lh "$ASSETS"/*.jpg "$ASSETS"/*.png 2>/dev/null || true
