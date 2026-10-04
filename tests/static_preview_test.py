"""Regression tests against the actual export and prefix-aware preview."""
import functools
import http.client
import importlib.util
from pathlib import Path
import threading
import unittest
from http.server import ThreadingHTTPServer
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('preview', ROOT / 'scripts/dev/static-preview.py')
preview = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preview)


class CardParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = 0
        self.nested_buttons = 0
        self.save_buttons = 0
        self.price_notes = 0

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'a':
            self.links += 1
        if tag == 'button':
            self.nested_buttons += int(self.links > 0)
            self.save_buttons += int('save-button' in attrs.get('class', ''))
        self.price_notes += int('food-price-note' in attrs.get('class', ''))

    def handle_endtag(self, tag):
        if tag == 'a':
            self.links -= 1


class PreviewTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not (ROOT / 'out/index.html').is_file():
            raise RuntimeError('Run pnpm build before pnpm test')
        handler = functools.partial(preview.CanteenHandler, directory=str(ROOT / 'out'))
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def request(self, path, method='GET'):
        connection = http.client.HTTPConnection('127.0.0.1', self.server.server_port)
        connection.request(method, path)
        response = connection.getresponse()
        result = response.status, {key.lower(): value for key, value in response.getheaders()}, response.read()
        connection.close()
        return result

    def test_canonical_prefix_with_query(self):
        status, headers, body = self.request('/canteen?from=atlas')
        self.assertEqual(status, 301)
        self.assertEqual(headers['location'], '/canteen/?from=atlas')
        self.assertEqual(body, b'')

    def test_pages_and_assets(self):
        for route in ['', 'eat/', 'profile/', 'playground/', 'canteens/dingxiang-yuan/']:
            with self.subTest(route=route):
                self.assertEqual(self.request('/canteen/' + route)[0], 200)
        stylesheet = next((ROOT / 'out/_next/static').rglob('*.css'))
        status, headers, _ = self.request('/canteen/' + stylesheet.relative_to(ROOT / 'out').as_posix())
        self.assertEqual(status, 200)
        self.assertTrue(headers['content-type'].startswith('text/css'))

    def test_unknown_routes_use_custom_404_not_homepage(self):
        for path in ['/canteen/no-such-route/', '/canteen/canteens/missing/', '/canteen/_next/', '/profile/']:
            with self.subTest(path=path):
                status, _, body = self.request(path)
                self.assertEqual(status, 404)
                self.assertIn(b'LOST IN THE ATLAS', body)

    def test_head_returns_no_body(self):
        status, _, body = self.request('/canteen/no-such-route/', 'HEAD')
        self.assertEqual(status, 404)
        self.assertEqual(body, b'')

    def test_cards_have_independent_buttons_and_price_notes(self):
        parser = CardParser()
        parser.feed((ROOT / 'out/index.html').read_text())
        self.assertEqual(parser.nested_buttons, 0)
        self.assertGreater(parser.save_buttons, 0)
        self.assertEqual(parser.save_buttons, parser.price_notes)

    def test_profile_repository_link(self):
        self.assertIn('https://github.com/liwenlong070124-spec/hust-tj-canteen', (ROOT / 'out/profile/index.html').read_text())


if __name__ == '__main__':
    unittest.main()
