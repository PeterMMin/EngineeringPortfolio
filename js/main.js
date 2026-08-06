// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Copy email to clipboard
const emailBtn = document.querySelector('.email-btn');
const toast = document.querySelector('.toast');

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._resetTimer);
  toast._resetTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyEmail(btn) {
  const email = btn.dataset.copy;

  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const temp = document.createElement('textarea');
    temp.value = email;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

  btn.classList.add('copied');
  btn.setAttribute('aria-label', 'Email copied');
  clearTimeout(btn._resetTimer);
  btn._resetTimer = setTimeout(() => {
    btn.classList.remove('copied');
    btn.setAttribute('aria-label', 'Copy email address');
  }, 1500);

  showToast('Email address copied to clipboard');
}

if (emailBtn) {
  emailBtn.addEventListener('click', () => copyEmail(emailBtn));
}
