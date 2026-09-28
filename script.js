const toggle = document.getElementById('theme-toggle');
const preference = window.matchMedia('(prefers-color-scheme: dark)');
let explicitTheme = null;
try {
  const stored = localStorage.getItem('sai-theme');
  if (stored === 'dark' || stored === 'light') explicitTheme = stored;
} catch { /* The theme also works when storage is unavailable. */ }
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}
setTheme(explicitTheme || (preference.matches ? 'dark' : 'light'));
toggle.addEventListener('click', () => {
  explicitTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(explicitTheme);
  try { localStorage.setItem('sai-theme', explicitTheme); } catch {}
});
preference.addEventListener('change', event => {
  if (!explicitTheme) setTheme(event.matches ? 'dark' : 'light');
});

// Connect each headline metric to its engineering explanation.
document.querySelectorAll('[data-case-study]').forEach(link => {
  link.addEventListener('click', () => {
    const details = document.getElementById(link.dataset.caseStudy);
    if (details) details.open = true;
  });
});
function openLinkedCase() {
  const details = document.getElementById(window.location.hash.slice(1));
  if (details && details.tagName === 'DETAILS') details.open = true;
}
openLinkedCase();
window.addEventListener('hashchange', openLinkedCase);
