#!/usr/bin/env bash
set -euo pipefail

# Check the static export against the project's size and file-count limits.
if [[ ! -d out ]]; then
  echo "out/ does not exist. Run pnpm build first." >&2
  exit 1
fi

large_file="$(find out -type f -size +25M -print -quit)"
if [[ -n "$large_file" ]]; then
  echo "File exceeds 25 MB: $large_file" >&2
  exit 1
fi

file_count="$(find out -type f | wc -l | tr -d ' ')"
if (( file_count > 20000 )); then
  echo "out/ contains $file_count files; limit is 20000." >&2
  exit 1
fi

echo "Static export OK: $file_count files, no file over 25 MB."
