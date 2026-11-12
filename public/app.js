const photos = [
  ["https://images.unsplash.com/photo-1490750966300-1b5b6d5c4f7d?w=900","في وسط كل الزهور، تفضل أنت أجمل تفصيلة."],
  ["https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900","بعض الأشخاص وجودهم وحده بيخلّي الدنيا أجمل."],
  ["https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900","كل غروب بيفكرني إن في حاجات تستاهل نستناها."],
  ["https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900","حتى وسط ملايين النجوم، في حاجة واحدة بتلمع أكتر."],
  ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900","زي البحر، في تفاصيل جميلة ملهاش آخر."],
  ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900","الهدوء الحقيقي إنك تلاقي مكانك وسط الزحمة."],
  ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900","في لحظات صغيرة بتساوي عمر كامل من الذكريات."],
  ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900","أجمل الطرق هي اللي بنفتكرها بابتسامة."],
  ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900","في حاجات جمالها مش محتاج كلام."],
  ["https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900","كل يوم جديد فرصة نكتب ذكرى أجمل."],
  ["https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=900","بعض الحكايات بتفضل منورة مهما عدى عليها الوقت."],
  ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900","المهم مش المكان، المهم الذكرى اللي بتفضل فيه."],
  ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900","لو للذكريات عنوان، أكيد هيكون مليان تفاصيل حلوة."],
  ["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=900","في ناس بيخلّوا أبسط الأيام استثنائية."],
  ["https://images.unsplash.com/photo-1511497584788-876760111969?w=900","وهنا تفضل الحكاية مفتوحة على أجمل الذكريات."]
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

function makePhoto(url, caption) {
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
  box.innerHTML = "";

  ["عمرو دياب", "رامي صبري"].forEach(artist => {
    const heading = document.createElement("h3");
    heading.className = "artist-heading";
    heading.textContent = "♫ " + artist;
    box.append(heading);

    songs.filter(song => song[0] === artist).forEach(song => {
      const item = document.createElement("div");
      item.className = "track";

      const name = document.createElement("span");
      name.textContent = song[1];

      const link = document.createElement("a");
      link.className = "music-link";
      link.textContent = "استمع ♫";
      link.href = "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(song[0] + " " + song[1]);
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      item.append(name, link);
      box.append(item);
    });
  });
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

  data.items.filter(x => x.type === "photo" && x.url).forEach(x => {
    gallery.append(makePhoto(x.url, x.caption || "ذكرى جميلة"));
  });

  photos.forEach(photo => {
    gallery.append(makePhoto(photo[0], photo[1]));
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

load();
