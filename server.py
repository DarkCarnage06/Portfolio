import json
import os
from datetime import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / 'data'
DATA_FILE = DATA_DIR / 'messages.json'

class ContactHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/api/contact':
            return self.send_error(404, 'Not found')

        content_length = int(self.headers.get('Content-Length', 0))
        raw_body = self.rfile.read(content_length).decode('utf-8')

        try:
            payload = json.loads(raw_body)
        except json.JSONDecodeError:
            return self.send_response(400, 'Bad Request') and self.end_headers()

        name = payload.get('name', '').strip()
        email = payload.get('email', '').strip()
        message = payload.get('message', '').strip()

        if not name or not email or not message:
            self.send_response(400, 'Bad Request')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'Name, email and message are required.'}).encode('utf-8'))
            return

        DATA_DIR.mkdir(exist_ok=True)
        if not DATA_FILE.exists():
            DATA_FILE.write_text('[]', encoding='utf-8')

        try:
            messages = json.loads(DATA_FILE.read_text(encoding='utf-8'))
        except json.JSONDecodeError:
            messages = []

        entry = {
            'id': int(datetime.utcnow().timestamp() * 1000),
            'name': name,
            'email': email,
            'message': message,
            'receivedAt': datetime.utcnow().isoformat() + 'Z'
        }
        messages.append(entry)
        DATA_FILE.write_text(json.dumps(messages, indent=2), encoding='utf-8')

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'success': True}).encode('utf-8'))

    def log_message(self, format, *args):
        # keep logs minimal
        print(format % args)

if __name__ == '__main__':
    os.chdir(BASE_DIR)
    server_address = ('', 3000)
    httpd = HTTPServer(server_address, ContactHandler)
    print('Server running on http://localhost:3000')
    httpd.serve_forever()
