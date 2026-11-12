const envelope = document.getElementById('secretEnvelope');
const hint = document.getElementById('openHint');

function openSecretLetter() {
  envelope.classList.toggle('open');
  hint.textContent = envelope.classList.contains('open')
    ? 'رسالة من القلب ليكي ❤️'
    : 'اضغطي على الظرف عشان تفتحيه ♡';
}

envelope.addEventListener('click', openSecretLetter);
envelope.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openSecretLetter();
  }
});
