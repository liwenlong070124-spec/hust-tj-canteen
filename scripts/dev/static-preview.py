#!/usr/bin/env python3
"""Serve out/ under /canteen/ so local static preview matches production."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import os
from urllib.parse import urlsplit, urlunsplit


class CanteenHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        parsed = urlsplit(self.path)
        if parsed.path == '/canteen':
            self.send_response(301)
            self.send_header('Location', urlunsplit(('', '', '/canteen/', parsed.query, '')))
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        if not parsed.path.startswith('/canteen/'):
            self.send_error(404)
            return None
        path = Path(self.translate_path(self.path)).resolve()
        root = Path(self.directory).resolve()
        if not path.is_relative_to(root) or (path.is_dir() and not (path / 'index.html').is_file()):
            self.send_error(404)
            return None
        return super().send_head()

    def send_error(self, code, message=None, explain=None):
        page = Path(self.directory) / '404.html'
        if code != 404 or not page.is_file():
            return super().send_error(code, message, explain)
        content = page.read_bytes()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(content)

    def translate_path(self, path: str) -> str:
        if path == "/canteen" or path.startswith("/canteen/"):
            path = path.removeprefix("/canteen") or "/"
        return super().translate_path(path)


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the static export at /canteen/")
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    output = Path(__file__).resolve().parents[2] / 'out'
    if not (output / 'index.html').is_file():
        parser.error('Missing static export. Run pnpm build first.')
    os.chdir(output)
    server = ThreadingHTTPServer(("127.0.0.1", args.port), CanteenHandler)
    print(f"Preview: http://127.0.0.1:{args.port}/canteen/")
    server.serve_forever()


if __name__ == "__main__":
    main()
