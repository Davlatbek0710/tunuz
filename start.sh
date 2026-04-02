#!/bin/bash

# Start SSH service
echo "[*] Starting SSH service..."
service ssh start

# Check if SSH started successfully
if service ssh status > /dev/null 2>&1; then
    echo "[+] SSH service started successfully on port 22"
else
    echo "[!] Warning: SSH service may not have started properly"
fi

# Check if flag exists
if [ -f /etc/flag ]; then
    echo "[+] Flag file exists at /etc/flag"
else
    echo "[!] Warning: Flag file not found at /etc/flag"
fi

# Start Flask app with Gunicorn as ctfuser
echo "[*] Starting Flask application with Gunicorn..."
cd /app
exec su -s /bin/bash -c "gunicorn --bind 0.0.0.0:5008 --workers 2 --timeout 120 --access-logfile - --error-logfile - app:app" ctfuser
