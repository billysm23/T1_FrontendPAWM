from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import sys
import io
from contextlib import redirect_stdout

class CompilerHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Enable CORS
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

        # Read the request body
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Capture output
        output_buffer = io.StringIO()
        
        try:
            # Execute code and capture output
            with redirect_stdout(output_buffer):
                exec(data['code'])
            
            # Get the output
            result = output_buffer.getvalue()
            
            # Send response
            response = {
                'status': 'success',
                'output': result
            }
        except Exception as e:
            response = {
                'status': 'error',
                'output': str(e)
            }

        self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, CompilerHandler)
    print(f'Server running on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()