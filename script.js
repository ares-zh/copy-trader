const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const modals = document.querySelectorAll('.modal');
const openButtons = document.querySelectorAll('[data-open-modal]');
const closeSelectors = '[data-close-modal], .modal__close';

const toggleScroll = (shouldLock) => {
  document.body.style.overflow = shouldLock ? 'hidden' : '';
};

const openModal = (id) => {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
  toggleScroll(true);
};

const closeModal = (modal) => {
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  toggleScroll(false);
};

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal(button.dataset.openModal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.matches(closeSelectors) || event.target === modal) {
      closeModal(modal);
    }
  });
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal(modal);
    }
  });
});

const hyperliquidForm = document.getElementById('hyperliquid-form');
if (hyperliquidForm) {
  hyperliquidForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(hyperliquidForm);
    const payload = Object.fromEntries(formData.entries());

    const output = document.getElementById('simulation-output');
    if (output) {
      output.innerHTML = `
        <h4>Sync in progress</h4>
        <p>We&apos;re queuing a secure request to Hyperliquid with key <code>${payload.apiKey.slice(0, 4)}•••</code>.</p>
        <p>Once complete, your trading history will appear in the AI Lab for training.</p>
      `;
    }

    console.info('Hyperliquid sync payload', payload);
  });
}

const simulationForm = document.getElementById('simulation-form');
if (simulationForm) {
  simulationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(simulationForm);
    const symbol = formData.get('symbol');
    const risk = formData.get('risk');

    const mockResponse = {
      symbol,
      riskLevel: ['Conservative', 'Balanced', 'Confident', 'Aggressive', 'DeGen'][risk - 1] || 'Balanced',
      projectedSharpe: (1.2 + Math.random() * 0.8).toFixed(2),
      expectedWinRate: Math.round(55 + Math.random() * 15),
      commentary: 'Strategy tuned on your historical fills with adaptive sizing and funding-aware hedges.'
    };

    const output = document.getElementById('simulation-output');
    if (output) {
      output.innerHTML = `
        <h4>${mockResponse.symbol} simulation</h4>
        <ul>
          <li><strong>Risk profile:</strong> ${mockResponse.riskLevel}</li>
          <li><strong>Projected Sharpe:</strong> ${mockResponse.projectedSharpe}</li>
          <li><strong>Expected win rate:</strong> ${mockResponse.expectedWinRate}%</li>
        </ul>
        <p>${mockResponse.commentary}</p>
      `;
    }
  });
}

const switchToLogin = document.getElementById('switch-to-login');
if (switchToLogin) {
  switchToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.getElementById('auth-form');
    if (!form) return;
    form.querySelector('button[type="submit"]').textContent = 'Sign in';
    form.querySelector('h2');
    switchToLogin.textContent = 'Need an account? Sign up';
  });
}
