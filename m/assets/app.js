(() => {
  const notif = document.getElementById("notification");
  const timerEl = document.getElementById("timer");

  function detectDevice() {
    const ua = navigator.userAgent;
    if (/iPhone/.test(ua)) return "iPhone";
    if (/iPad/.test(ua)) return "iPad";
    if (/Android/.test(ua)) return "Android device";
    if (/Mac/.test(ua)) return "Mac";
    if (/Windows/.test(ua)) return "PC";
    return "device";
  }

  function setDeviceText() {
    const device = detectDevice();
    const d1 = document.getElementById("deviceName");
    const d2 = document.getElementById("deviceName2");
    if (d1) d1.textContent = device;
    if (d2) d2.textContent = device;
  }

  function startTimer() {
    if (!timerEl) return;

    let total = 90; // 1:30
    const interval = setInterval(() => {
      total--;

      const min = Math.floor(total / 60);
      const sec = total % 60;

      timerEl.textContent = `${min} minute ${sec.toString().padStart(2, "0")} seconds`;

      if (total <= 0) {
        clearInterval(interval);
        timerEl.textContent = "0 minute 00 seconds";
      }

      // от синего к красному
      const ratio = 1 - (total / 90);
      const r = Math.floor(10 + (214 - 10) * ratio);
      const g = Math.floor(132 - 132 * ratio);
      const b = Math.floor(255 - 255 * ratio);
      timerEl.style.color = `rgb(${r},${g},${b})`;
    }, 1000);
  }

  function playNotificationLoop() {
    if (!notif) return;

    const playNotification = () => {
      notif.style.animation = "none";
      // reflow
      void notif.offsetHeight;
      notif.style.animation = "popIn 0.8s ease forwards";
    };

    playNotification();
    setInterval(playNotification, 3500);
  }

  function setupPixelClick() {
    const btn = document.querySelector(".cleanMemory");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      const url = e.currentTarget.href;

      // Всегда обеспечиваем переход
      e.preventDefault();

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", { button_name: "cleanMemory" });
        setTimeout(() => (window.location.href = url), 400);
      } else {
        window.location.href = url;
      }
    });
  }

  // init
  setDeviceText();
  startTimer();
  playNotificationLoop();
  setupPixelClick();
})();