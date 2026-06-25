
import http.server
import socketserver
import threading
import webbrowser
import time
import os

# Start frontend server
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "antardrishti", "frontend")
FRONTEND_PORT = 8080

def start_frontend():
    os.chdir(FRONTEND_DIR)
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", FRONTEND_PORT), Handler) as httpd:
        print(f"Frontend running at http://localhost:{FRONTEND_PORT}")
        httpd.serve_forever()

# Start in thread
frontend_thread = threading.Thread(target=start_frontend, daemon=True)
frontend_thread.start()

# Wait a bit
time.sleep(1)

# Open browser
webbrowser.open(f"http://localhost:{FRONTEND_PORT}")

# Keep main thread alive
print("Press Ctrl+C to stop servers...")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nStopping servers...")
