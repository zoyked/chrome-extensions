// Кнопка расширения: вкл/выкл сброс фона на текущей вкладке
const CSS_RULES = `
html, body, main, #main, .main, #root, #app, .app,
*[class*="container"], *[class*="wrapper"],
body[style*="background"], main[style*="background"] {
  background: unset !important;
  background-color: unset !important;
}
`;

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return;
  // Пытаемся снять ранее вставленный CSS (если был), затем вставляем снова как "toggle"
  try {
    await chrome.scripting.removeCSS({ target: { tabId: tab.id }, css: CSS_RULES });
  } catch (e) { /* игнор: если не было — ОК */ }
  await chrome.scripting.insertCSS({ target: { tabId: tab.id }, css: CSS_RULES, origin: "USER" });
});
