#!/usr/bin/env python3
"""Serve out/ under /canteen/ so local static preview matches production."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import os


class CanteenHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        if path == "/canteen" or path.startswith("/canteen/"):
            path = path.removeprefix("/canteen") or "/"
        return super().translate_path(path)


def main() -> None:
    parser = argparse.ArgumentParser(description="Serve the static export at /canteen/")
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    os.chdir(Path(__file__).resolve().parents[2] / "out")
    server = ThreadingHTTPServer(("127.0.0.1", args.port), CanteenHandler)
    print(f"Preview: http://127.0.0.1:{args.port}/canteen/")
    server.serve_forever()


if __name__ == "__main__":
    main()
