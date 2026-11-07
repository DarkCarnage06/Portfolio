import subprocess
import time
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
out_dir = r"d:\Portfolio-2\public\images\test_previews"
os.makedirs(out_dir, exist_ok=True)

# 1. Desktop 1440x900
desktop_out = os.path.join(out_dir, "desktop-1440.png")
cmd_desktop = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--window-size=1440,1100",
    "--hide-scrollbars",
    f"--screenshot={desktop_out}",
    "http://localhost:3000"
]

# 2. Mobile 390x844
mobile_out = os.path.join(out_dir, "mobile-390.png")
cmd_mobile = [
    chrome_path,
    "--headless=new",
    "--disable-gpu",
    "--window-size=390,844",
    "--hide-scrollbars",
    f"--screenshot={mobile_out}",
    "http://localhost:3000"
]

try:
    print("Capturing desktop screenshot...")
    subprocess.run(cmd_desktop, timeout=20, check=True)
    print("Captured desktop:", os.path.exists(desktop_out), os.path.getsize(desktop_out))
    
    print("Capturing mobile screenshot...")
    subprocess.run(cmd_mobile, timeout=20, check=True)
    print("Captured mobile:", os.path.exists(mobile_out), os.path.getsize(mobile_out))
except Exception as e:
    print("Screenshot capture error:", e)
