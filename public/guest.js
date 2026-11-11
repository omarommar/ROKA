document.getElementById('guestForm').addEventListener('submit', async e => {
  e.preventDefault();

  const error = document.getElementById('error');
  const password = document.getElementById('password').value;

  error.textContent = 'جاري التحقق...';

  try {
    const response = await fetch('/api/guest-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      location.href = '/';
    } else {
      error.textContent = 'كلمة السر مش صحيحة 💗';
    }
  } catch {
    error.textContent = 'حصل خطأ في الاتصال.';
  }
});
