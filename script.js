/* =========================================
   PAGE NAVIGATION
========================================= */

const pages = document.querySelectorAll(".page");

const nextButtons = document.querySelectorAll(".next-btn");

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);

  if (target) {
    target.classList.add("active");
  }
}

/* Every next button */

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextPage = button.dataset.next;

    showPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    /* 
           If we're going to the video page,
           prepare the video.
        */

    if (nextPage === "page3") {
      prepareVideo();
    }
  });
});

/* =========================================
   VIDEO PLAYER
========================================= */

const video = document.getElementById("songVideo");

const mainPlay = document.getElementById("mainPlay");

const videoPlay = document.getElementById("videoPlay");

const progress = document.getElementById("progress");

const progressContainer = document.getElementById("progressContainer");

const volume = document.getElementById("volume");

const backBtn = document.getElementById("backBtn");

const forwardBtn = document.getElementById("forwardBtn");

/* =========================================
   PREPARE VIDEO
========================================= */

function prepareVideo() {
  if (!video) return;

  video.currentTime = 0;

  video.volume = 0.25;
}

/* =========================================
   PLAY / PAUSE
========================================= */

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

mainPlay.addEventListener("click", togglePlay);

videoPlay.addEventListener("click", togglePlay);

/* =========================================
   UPDATE PLAY BUTTON
========================================= */

video.addEventListener("play", () => {
  mainPlay.textContent = "Ⅱ";

  videoPlay.classList.add("hidden");
});

video.addEventListener("pause", () => {
  mainPlay.textContent = "▶";

  videoPlay.textContent = "▶";

  videoPlay.classList.remove("hidden");
});

/* =========================================
   VIDEO PROGRESS
========================================= */

video.addEventListener("timeupdate", () => {
  if (!video.duration) return;

  const percentage = (video.currentTime / video.duration) * 100;

  progress.style.width = `${percentage}%`;
});

/* =========================================
   CLICK PROGRESS BAR
========================================= */

progressContainer.addEventListener("click", (event) => {
  if (!video.duration) return;

  const rect = progressContainer.getBoundingClientRect();

  const clickPosition = event.clientX - rect.left;

  const percentage = clickPosition / rect.width;

  video.currentTime = percentage * video.duration;
});

/* =========================================
   VOLUME
========================================= */

volume.addEventListener("input", () => {
  video.volume = volume.value;
});

/* =========================================
   BACK 10 SECONDS
========================================= */

backBtn.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

/* =========================================
   FORWARD 10 SECONDS
========================================= */

forwardBtn.addEventListener("click", () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

/* =========================================
   VIDEO ENDS
========================================= */

video.addEventListener("ended", () => {
  mainPlay.textContent = "▶";

  videoPlay.classList.remove("hidden");
});

/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener("keydown", (event) => {
  /*
       Don't trigger space when typing
       inside the input box.
    */

  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();

    togglePlay();
  }

  if (event.code === "ArrowRight") {
    video.currentTime += 5;
  }

  if (event.code === "ArrowLeft") {
    video.currentTime -= 5;
  }
});

/* =========================================
   HER FAVOURITE SONG → WHATSAPP
========================================= */

const saveSong = document.getElementById("saveSong");

const favoriteSong = document.getElementById("favoriteSong");

const response = document.getElementById("response");

/*
   IMPORTANT:
   Replace this with YOUR WhatsApp number.

   India example:
   919876543210

   Don't use:
   +91 9876543210
   Don't use spaces.
*/
const myWhatsAppNumber = "917447874298";

saveSong.addEventListener("click", () => {
  const song = favoriteSong.value.trim();

  /* Don't continue if she didn't enter anything */

  if (song === "") {
    response.textContent = "Come on... tell me your song first 🥺";

    favoriteSong.focus();

    return;
  }

  /*
       This is the message that will
       appear in your WhatsApp chat.
    */

  const whatsappMessage = `Hey! 🎵❤️

I finally have an answer...

My favourite song is:
"${song}"

I listened to your favourite song,
and now it's your turn to listen to mine. 🎧

Okay... that's all. ❤️`;

  /*
       Convert the message into a
       WhatsApp-friendly URL.
    */

  const encodedMessage = encodeURIComponent(whatsappMessage);

  /*
       Create WhatsApp link.
    */

  const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

  /*
       Small animation before opening WhatsApp.
    */

  saveSong.textContent = "Opening WhatsApp... ❤️";

  createHearts();

  /*
       Wait a little so she sees the
       button change, then open WhatsApp.
    */

  setTimeout(() => {
    window.location.href = whatsappURL;
  }, 700);
});

/* =========================================
   SECURITY
   Prevent HTML injection from input
========================================= */

function escapeHTML(text) {
  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

/* =========================================
   HEART PARTICLES
========================================= */

function createHearts() {
  const hearts = 18;

  for (let i = 0; i < hearts; i++) {
    const heart = document.createElement("div");

    heart.textContent = "♥";

    heart.style.position = "fixed";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.bottom = "-30px";

    heart.style.fontSize = 12 + Math.random() * 20 + "px";

    heart.style.color = "#ff5c9d";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "9999";

    heart.style.transition = "transform 3s ease-out, opacity 3s ease-out";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translateY(-${window.innerHeight + 100}px)
                 rotate(${Math.random() * 360}deg)`;

      heart.style.opacity = "0";
    }, 50);

    setTimeout(() => {
      heart.remove();
    }, 3200);
  }
}

/* =========================================
   ENTER KEY ON SONG INPUT
========================================= */

favoriteSong.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveSong.click();
  }
});

/* =========================================
   LOAD SAVED SONG
========================================= */

const savedSong = localStorage.getItem("herFavouriteSong");

if (savedSong) {
  favoriteSong.value = savedSong;
}

/* =========================================
   TOUCH SWIPE NAVIGATION
   Optional mobile feature
========================================= */

let touchStartX = 0;

let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;

  handleSwipe();
});

function handleSwipe() {
  const difference = touchEndX - touchStartX;

  /*
       Only react to meaningful swipes.
    */

  if (Math.abs(difference) < 80) {
    return;
  }

  const activePage = document.querySelector(".page.active");

  const pageNumber = Number(activePage.id.replace("page", ""));

  /*
       Swipe left = next page
    */

  if (difference < 0) {
    if (pageNumber < 8) {
      showPage(`page${pageNumber + 1}`);
    }
  }

  /*
       Swipe right = previous page
    */

  if (difference > 0) {
    if (pageNumber > 1) {
      showPage(`page${pageNumber - 1}`);
    }
  }
}
