const envelope = document.getElementById('secretEnvelope');
const hint = document.getElementById('openHint');
const messageBox = document.querySelector('.letter-paper');

const messages = [
  'يمكن الكلام مهما كان كتير مش هيعرف يوصف مكانتك... وجودك بيضيف للحكاية معنى أجمل. ❤️',
  'كل يوم بيعدّي بيأكد إنك من أجمل الحاجات اللي حصلت في الحكاية دي. 💗',
  'لو كان بإيدي أهديكي حاجة، كنت ههديكي كل لحظة حلوة تستاهليها. 🌷',
  'إنتي مش مجرد ذكرى حلوة، إنتي حكاية نفسي تفضل مليانة فرحة. ❤️',
  'وسط كل تفاصيل الدنيا، وجودك ليه مكان مميز في القلب. 💌',
  'أتمنى ضحكتك تفضل منورة أيامك، وتفضلي دايمًا مبسوطة. 🥹',
  'كل رسالة هنا صغيرة، بس وراها كلام كتير حلو ليكي. 💞',
  'يا أجمل صدفة، أتمنى كل اللي جاي يكون أحلى من اللي فات. 🌹',
  'لو للحكايات عنوان، فإنتي أجمل عنوان فيها. ♡',
  'خلي بالك من قلبك، لأنه يستاهل كل الحب والفرحة. 💗',
  'كل مرة تفتحي الظرف افتكري إن فيه حد بيتمنالك الخير والسعادة. ❤️',
  'مش لازم يكون فيه مناسبة عشان أقولك إنك غالية. 💝'
];

let lastMessage = -1;

function openSecretLetter() {
  const isOpen = envelope.classList.toggle('open');

  if (isOpen) {
    let next;
    do {
      next = Math.floor(Math.random() * messages.length);
    } while (messages.length > 1 && next === lastMessage);

    lastMessage = next;
    messageBox.textContent = messages[next];
    hint.textContent = 'رسالة جديدة من القلب ليكي ❤️';
  } else {
    hint.textContent = 'اضغطي على الظرف عشان تفتحيه ♡';
  }
}

envelope.addEventListener('click', openSecretLetter);
envelope.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openSecretLetter();
  }
});
