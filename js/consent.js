document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('site_consent')) {
    var overlay = document.createElement('div');
    overlay.id = 'consent-modal-overlay';
    overlay.innerHTML = `
      <div id="consent-modal">
        <h2>Согласие на использование cookie и обработку данных</h2>
        <p>Мы используем базовые cookie-файлы и обрабатываем ваши персональные данные в соответствии с <a href="privacy-policy.html" target="_blank">Политикой обработки персональных данных</a> и <a href="cookie-policy.html" target="_blank">Политикой cookie</a>.</p>
        <button id="consent-accept">Принять</button>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById('consent-accept').addEventListener('click', function() {
      localStorage.setItem('site_consent', 'accepted');
      document.body.removeChild(overlay);
    });
  }
});

