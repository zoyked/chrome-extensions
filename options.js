const area = document.getElementById('hosts');
const btn = document.getElementById('save');

chrome.storage.sync.get({ hosts: ["https://example.com/*"] }, ({ hosts }) => {
  area.value = hosts.join("\n");
});

btn.addEventListener('click', async () => {
  const hosts = area.value.split('\n').map(s => s.trim()).filter(Boolean);
  await chrome.storage.sync.set({ hosts });
  alert("Сохранено. Обнови страницы этих доменов.");
});
