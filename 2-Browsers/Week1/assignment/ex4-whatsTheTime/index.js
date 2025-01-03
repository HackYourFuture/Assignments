function addCurrentTime() {
  const currentTimeEl = document.createElement('div');
  document.body.appendChild(currentTimeEl);

  function updateTime() {
    const now = new Date().toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    currentTimeEl.textContent = now;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

window.addEventListener('load', addCurrentTime);
