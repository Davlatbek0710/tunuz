FROM python:3.11-slim

WORKDIR /app

# Install SSH server and required packages
RUN apt-get update && \
    apt-get install -y openssh-server sudo nmap && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Create documentation directory with sample files
RUN mkdir -p /app/docs && \
    echo "FinTech Systems Documentation\n\nWelcome to FinTech documentation portal.\nThis system provides comprehensive security solutions." > /app/docs/readme.txt && \
    echo "API Guide\n\nRESTful API Endpoints:\n- GET /api/status\n- POST /api/search\n- GET /documentation/view?file=<path>" > /app/docs/api-guide.txt && \
    echo "Security Policy\n\nAll systems must comply with ISO 27001 standards.\nRegular security audits are conducted quarterly." > /app/docs/security-policy.txt && \
    echo "Changelog\n\nv2.5.0 (2024-11-01)\n- Added new documentation viewer\n- Enhanced security features\n- Bug fixes" > /app/docs/changelog.txt

# Create flag files
RUN echo "FinTech{f1l3_r34d1ng_thr0ugh_lf1_3xpl01t}" > /etc/flag && \
    chmod 644 /etc/flag

# Create non-root user first
RUN useradd -m -u 1000 ctfuser && \
    echo "ctfuser:fintechctf2026" | chpasswd && \
    usermod -aG sudo ctfuser

# Generate SSH keys for ctfuser
RUN mkdir -p /home/ctfuser/.ssh && \
    ssh-keygen -t rsa -b 2048 -f /home/ctfuser/.ssh/id_rsa -N "" && \
    cp /home/ctfuser/.ssh/id_rsa.pub /home/ctfuser/.ssh/authorized_keys && \
    chmod 700 /home/ctfuser/.ssh && \
    chmod 600 /home/ctfuser/.ssh/id_rsa && \
    chmod 644 /home/ctfuser/.ssh/id_rsa.pub && \
    chmod 644 /home/ctfuser/.ssh/authorized_keys && \
    chown -R ctfuser:ctfuser /home/ctfuser/.ssh

# Create second flag for SSH challenge
RUN echo "FinTech{pr1v4t3_k3y_st0l3n_v14_lf1_vuln}" > /home/ctfuser/flag_ssh.txt && \
    chmod 644 /home/ctfuser/flag_ssh.txt && \
    chown ctfuser:ctfuser /home/ctfuser/flag_ssh.txt

# Configure SSH
RUN mkdir -p /var/run/sshd && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config && \
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Configure sudo for privilege escalation challenge
# Allow ctfuser to run nmap as root without password (GTFOBins vuln)
# Make it readable so users can discover via enumeration
RUN echo "ctfuser ALL=(ALL) NOPASSWD: /usr/bin/nmap" > /etc/sudoers.d/ctfuser && \
    chmod 444 /etc/sudoers.d/ctfuser && \
    chown root:root /etc/sudoers.d/ctfuser

# Create root flag
RUN echo "FinTech{nm4p_r00t_3sc4l4t10n_succ3ss}" > /root/flag_root.txt && \
    chmod 600 /root/flag_root.txt

# No hints in /etc/passwd - make it harder!

# Copy application files
COPY . .

# Give ownership of app directory to ctfuser
RUN chown -R ctfuser:ctfuser /app

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose ports
EXPOSE 5008 2222

# Run the startup script
CMD ["/start.sh"]
