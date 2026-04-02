from flask import Flask, render_template, request, abort, session, redirect, url_for, flash
import os
from functools import wraps
import hashlib

app = Flask(__name__)
app.secret_key = 'ctf_lfi_secret_2025'

# Flag location
FLAG_FILE = '/etc/flag'

# Simple in-memory user storage (for CTF purposes)
users_db = {}

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            flash('Bu sahifaga kirish uchun tizimga kiring.', 'error')
            return redirect(url_for('login', next=request.path))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    # Redirect to dashboard if already logged in
    if 'user' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/about')
@login_required
def about():
    return render_template('about.html')

@app.route('/services')
@login_required
def services():
    return render_template('services.html')

@app.route('/docs')
@login_required
def docs():
    return render_template('docs.html')

@app.route('/team')
@login_required
def team():
    return render_template('team.html')

# Dashboard route
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

# Authentication routes
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')

        if not username or not password:
            flash('Foydalanuvchi nomi va parol talab qilinadi.', 'error')
            return render_template('register.html')

        if len(username) < 3:
            flash('Foydalanuvchi nomi kamida 3 ta belgidan iborat bo\'lishi kerak.', 'error')
            return render_template('register.html')

        if len(password) < 6:
            flash('Parol kamida 6 ta belgidan iborat bo\'lishi kerak.', 'error')
            return render_template('register.html')

        if password != confirm_password:
            flash('Parollar mos kelmadi.', 'error')
            return render_template('register.html')

        if username in users_db:
            flash('Bu foydalanuvchi nomi band. Boshqasini tanlang.', 'error')
            return render_template('register.html')

        # Register user
        users_db[username] = hash_password(password)
        flash(f'Ro\'yxatdan muvaffaqiyatli o\'tdingiz! Endi tizimga kiring.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user' in session:
        return redirect(url_for('dashboard'))

    next_page = request.args.get('next')

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')

        if not username or not password:
            flash('Foydalanuvchi nomi va parol talab qilinadi.', 'error')
            return render_template('login.html')

        if username in users_db and users_db[username] == hash_password(password):
            session['user'] = username
            flash(f'Xush kelibsiz, {username}!', 'success')

            # Redirect to next page if exists, otherwise dashboard
            if next_page and next_page.startswith('/'):
                return redirect(next_page)
            return redirect(url_for('dashboard'))
        else:
            flash('Foydalanuvchi nomi yoki parol noto\'g\'ri.', 'error')
            return render_template('login.html')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    flash('Tizimdan chiqdingiz.', 'success')
    return redirect(url_for('index'))

# Vulnerable endpoint - LFI vulnerability (protected)
@app.route('/documentation/view')
@login_required
def view_docs():
    # Get file parameter from query string
    file_path = request.args.get('file', '')

    if not file_path:
        return render_template('doc_viewer.html', content=None, error='No file specified')

    try:
        # Vulnerable code - no path sanitization
        # This allows reading any file on the system

        # Try reading as text file with multiple encodings
        content = None
        encodings = ['utf-8', 'latin-1', 'ascii']

        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding, errors='replace') as f:
                    content = f.read(100000)  # Limit to 100KB to prevent memory issues
                break
            except (UnicodeDecodeError, UnicodeError):
                continue

        if content is None:
            return render_template('doc_viewer.html', content=None, file=file_path, error='Unable to read file - possibly a binary file')

        return render_template('doc_viewer.html', content=content, file=file_path, error=None)

    except FileNotFoundError:
        return render_template('doc_viewer.html', content=None, file=file_path, error='File not found')
    except PermissionError:
        return render_template('doc_viewer.html', content=None, file=file_path, error='Permission denied')
    except Exception as e:
        return render_template('doc_viewer.html', content=None, file=file_path, error=f'Error: {str(e)}')

# Decoy endpoints that appear vulnerable but aren't
@app.route('/api/search')
def api_search():
    query = request.args.get('q', '')
    # Fake search - no real vulnerability
    results = [
        {'title': 'Getting Started', 'url': '/docs/getting-started'},
        {'title': 'API Reference', 'url': '/docs/api-reference'}
    ]
    return {'results': results}

@app.route('/upload')
@login_required
def upload():
    return render_template('upload.html')

@app.route('/api/upload', methods=['POST'])
@login_required
def api_upload():
    # Fake upload - doesn't actually save files
    return {'status': 'success', 'message': 'File uploaded successfully'}

if __name__ == '__main__':
    # Flag files are created during Docker build (see Dockerfile)
    # Check if flag exists
    import os.path
    if os.path.exists(FLAG_FILE):
        print(f"[+] Flag file exists at {FLAG_FILE}")
    else:
        print(f"[!] Warning: Flag file not found at {FLAG_FILE}")

    print("[*] Starting Flask application on 0.0.0.0:5008")
    app.run(host='0.0.0.0', port=5008, debug=False)
