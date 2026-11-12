const photos = [
  ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900","أجمل مكان هو المكان اللي بنكون فيه سوا ❤️"],
  ["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900","كل خطوة جنبك حكاية جديدة."],
  ["https://images.unsplash.com/photo-1529636798458-92182e662485?w=900","ضحكتك أحلى ذكرى في يومي."],
  ["https://images.unsplash.com/photo-1519741497674-611481863552?w=900","نفسي كل لحظة حلوة نعيشها سوا."],
  ["https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900","إيدك في إيدي والدنيا كلها تهون."],
  ["https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=900","في وجودك أبسط الأيام بتبقى مميزة."],
  ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900","حكايتنا أحلى من أي صورة."],
  ["https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=900","كل ذكرى معاك تستاهل تتصور."],
  ["https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900","نفسي نفضل نضحك ونحلم سوا."],
  ["https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?w=900","أحلى الصدف هي اللي جمعتنا."],
  ["https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900","وجودك بيخلّي للحكاية طعم تاني."],
  ["https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=900","كل يوم معاك ذكرى تستاهل القلب."],
  ["https://images.unsplash.com/photo-1529636798458-92182e662485?w=900","سوا حتى التفاصيل الصغيرة بتحلو."],
  ["https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900","أجمل صورة هي اللي بتجمعنا."],
  ["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900","ويا رب تفضل حكايتنا مليانة ذكريات حلوة."]
];

const quotes = [
  "مش كل الكلام يقدر يوصف مكانة بعض الناس في القلب.",
  "أجمل صدفة هي اللي بتغيّر شكل الأيام للأحسن.",
  "في تفاصيل صغيرة بتفضل عايشة جوانا مهما الوقت عدى.",
  "وجودك في الحكاية بيخلّي لكل فصل معنى.",
  "بعض الذكريات مبتكبرش، بتفضل جديدة في القلب.",
  "مش محتاجين ألف حكاية، كفاية حكاية واحدة صادقة.",
  "كل لحظة جميلة تستحق إنها تتسجل.",
  "في ناس حضورهم راحة، وكلامهم طمأنينة.",
  "أجمل ما في الأيام هو أثرها الحلو.",
  "الحكايات الحلوة مبتخلصش عند آخر صفحة."
];

const songs = [
  ["عمرو دياب","تملي معاك"],
  ["عمرو دياب","نور العين"],
  ["عمرو دياب","قمرين"],
  ["عمرو دياب","أماكن السهر"],
  ["عمرو دياب","يتعلموا"],
  ["عمرو دياب","شكراً من هنا لبكرة"],
  ["رامي صبري","يمكن خير"],
  ["رامي صبري","بحكي عليكي"],
  ["رامي صبري","حياتي مش تمام"],
  ["رامي صبري","غالي"],
  ["رامي صبري","أنتي جنان"],
  ["رامي صبري","كلمة"]
];

function makePhoto(url, caption, index = 0) {
  const card = document.createElement("article");
  card.className = "photo-card envelope-card";

  const envelope = document.createElement("div");
  envelope.className = "love-envelope";

  const img = document.createElement("img");
  img.src = url;
  img.alt = caption;
  img.loading = "lazy";

  const heart = document.createElement("span");
  heart.className = "envelope-heart";
  heart.textContent = "♥";

  const p = document.createElement("p");
  p.textContent = caption;

  envelope.append(img, heart);
  card.append(envelope, p);

  return card;
}

function renderMusic() {
  const box = document.getElementById("tracks");
  const audio = document.getElementById("player");

  box.innerHTML = "";
  audio.pause();

  const title = document.createElement("h3");
  title.className = "now-playing";
  title.id = "nowPlaying";
  title.textContent = "اختار أول مقطع وابدأ الحكاية ♡";

  const playlist = document.createElement("div");
  playlist.className = "remix-playlist";

  box.append(title, playlist);

  let current = 0;
  let playing = false;

  // كل مقطع 30 ثانية. يمكن ضبط بداية المقطع لاحقاً بالثواني.
  const clipStarts = Array(songs.length).fill(0);

  function playTrack(index) {
    if (index >= songs.length) {
      current = 0;
      playing = false;
      title.textContent = "انتهى الريمكس ❤️";
      audio.pause();
      return;
    }

    current = index;
    const [artist, name] = songs[current];
    const number = String(current + 1).padStart(2, "0");

    title.textContent = "♫ " + name + " — " + artist;
    audio.src = "/audio/" + number + ".mp3";
    audio.load();

    audio.onloadedmetadata = () => {
      audio.currentTime = clipStarts[current];
      audio.play().then(() => {
        playing = true;
        updateButtons();
      }).catch(() => {
        title.textContent = "اضغط تشغيل لبدء المقطع ♡";
      });
    };

    updateButtons();
  }

  function updateButtons() {
    [...playlist.children].forEach((button, i) => {
      button.classList.toggle("active-track", i === current);
      button.textContent =
        (i === current && playing ? "▶ " : "♫ ") +
        songs[i][1] + " — " + songs[i][0];
    });
  }

  songs.forEach(([artist, name], index) => {
    const button = document.createElement("button");
    button.className = "remix-track";
    button.textContent = "♫ " + name + " — " + artist;

    button.addEventListener("click", () => {
      playTrack(index);
    });

    playlist.append(button);
  });

  audio.ontimeupdate = () => {
    if (playing && audio.currentTime >= clipStarts[current] + 30) {
      playTrack(current + 1);
    }
  };

  audio.onended = () => {
    if (playing) playTrack(current + 1);
  };

  audio.onplay = () => {
    playing = true;
    updateButtons();
  };

  audio.onpause = () => {
    playing = false;
    updateButtons();
  };
}



function initLoveEffects() {
  const layer = document.createElement("div");
  layer.className = "floating-love";
  layer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 22; i++) {
    const item = document.createElement("span");
    item.textContent = i % 4 === 0 ? "بحبك" : "♥";
    item.style.left = (Math.random() * 100) + "%";
    item.style.animationDelay = (Math.random() * 18) + "s";
    item.style.animationDuration = (12 + Math.random() * 12) + "s";
    item.style.fontSize = (14 + Math.random() * 17) + "px";
    layer.append(item);
  }

  document.body.prepend(layer);

  const startDate = new Date("2026-11-05T00:00:00+02:00").getTime();

  function updateLoveCounter() {
    const elapsed = Math.max(0, Date.now() - startDate);
    const totalSeconds = Math.floor(elapsed / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("love-days").textContent = days;
    document.getElementById("love-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("love-minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("love-seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateLoveCounter();
  setInterval(updateLoveCounter, 1000);
}

async function load() {
  let data = { items: [] };

  try {
    const response = await fetch("/api/content");
    if (response.ok) data = await response.json();
  } catch (error) {
    console.log("عرض المحتوى الافتراضي");
  }

  if (!Array.isArray(data.items)) data.items = [];

  if (data.welcome) {
    document.getElementById("welcome").textContent = data.welcome;
  }

  const gallery = document.getElementById("galleryGrid");
  gallery.innerHTML = "";

  data.items.filter(x => x.type === "photo" && x.url).forEach((x, i) => {
    gallery.append(makePhoto(x.url, x.caption || "ذكرى جميلة", i));
  });

  photos.forEach((photo, i) => {
    gallery.append(makePhoto(photo[0], photo[1], i));
  });

  const quoteBox = document.getElementById("quotes");
  quoteBox.innerHTML = "";

  const savedQuotes = data.items.filter(x => x.type === "quote");
  const allQuotes = savedQuotes.length
    ? savedQuotes.map(x => x.caption)
    : quotes;

  allQuotes.forEach(quote => {
    const card = document.createElement("article");
    card.className = "quote";
    card.textContent = quote;
    quoteBox.append(card);
  });

  renderMusic();
}

initLoveEffects();
load();

// زر تشغيل أغنية ROKA في نهاية الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("finalSongButton");
  const audio = document.getElementById("finalSongAudio");
  if (!button || !audio) return;

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        button.textContent = "إيقاف الأغنية ♡";
      } else {
        audio.pause();
        button.textContent = "ابدأ الحكاية ♡";
      }
    } catch (error) {
      button.textContent = "ملف الأغنية لسه مش موجود ♡";
    }
  });

  audio.addEventListener("ended", () => {
    button.textContent = "ابدأ الحكاية ♡";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startStoryButton");
  const audio = document.getElementById("storyAudio");
  if (!button || !audio) return;

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        button.textContent = "إيقاف الحكاية ♡";
      } else {
        audio.pause();
        button.textContent = "ابدأ الحكاية ♡";
      }
    } catch (error) {
      button.textContent = "تعذر تشغيل الملف ♡";
    }
  });

  audio.addEventListener("ended", () => {
    button.textContent = "ابدأ الحكاية ♡";
  });
});
