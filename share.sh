#!/usr/bin/env bash
set -uo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8000}"

while lsof -i ":$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

python3 -m http.server "$PORT" --directory "$ROOT" >/tmp/yatim-http.log 2>&1 &
HTTP_PID=$!

ngrok http "$PORT" --log=stdout >/tmp/yatim-ngrok.log 2>&1 &
NGROK_PID=$!

trap 'kill $HTTP_PID $NGROK_PID 2>/dev/null' EXIT

URL=""
for _ in $(seq 1 30); do
  sleep 1
  URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null |
    python3 -c "import sys, json
ts = json.load(sys.stdin).get('tunnels', [])
print(next((t['public_url'] for t in ts if t['public_url'].startswith('https')), ts[0]['public_url'] if ts else ''))" 2>/dev/null)
  [ -n "$URL" ] && break
done

echo "Server lokal : http://localhost:$PORT"
echo "URL publik   : ${URL:-GAGAL — cek /tmp/yatim-ngrok.log}"
echo ""
echo "Tekan Ctrl+C atau 'pkill -f ngrok; pkill -f http.server' untuk berhenti."

wait
