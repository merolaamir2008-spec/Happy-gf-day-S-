// ===== ELEMENTS =====
const landing = document.getElementById("landing");
const game = document.getElementById("game");
const success = document.getElementById("success");
const gift = document.getElementById("gift");

const openBtn = document.getElementById("openBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const giftBtn = document.getElementById("giftBtn");

const message = document.getElementById("message");
const hearts = document.getElementById("hearts");
const slide = document.getElementById("slide");
const loading = document.getElementById("loading");
const giftContent = document.getElementById("giftContent");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const ribbons = document.querySelectorAll(".ribbon");
const meow = document.getElementById("meow");
const teddy = document.getElementById("teddy");
const teddyBubble = document.getElementById("teddyBubble");
const secretMessage = document.getElementById("secretMessage");
const normalCaption = document.getElementById("normalCaption");
const dateBtn = document.getElementById("dateBtn");
const dateCard = document.getElementById("dateCard");
const sinceDate = document.getElementById("sinceDate");
const daysTogether = document.getElementById("daysTogether");
const plant = document.getElementById("plant");
const butterfly = document.getElementById("butterfly");
const moon = document.getElementById("moon");
const moonCat = document.getElementById("moonCat");



// ===== FUNNY MESSAGES =====
const texts = [
  "Choose YES",
  "WITCH 🫪",
  "STAWPPP",
  "So you prefer Ayesha?? Fork you",
  "Rude 🙄 After everything we have been through?? 🫩",
  "I am marrying my crush",
  "You know what, get lost",
  "Last chance!! 💖"
];

let clickCount = 0;
let yesScale = 1;
let petalsInterval;
let heartsInterval;
let musicClicks = 0;
let ribbonClicks = 0;
let nightMode = false;
let catPlaying = false;
let teddySleepTimer;
let sleepInterval;
let teddyBubbleTimeout;
let teddyShowTimeout;
let dateOpen = false;
let plantStage = 0;

const plantStages = [
    "🪴",
    "🌱",
    "🌷",
    "🌸"
];

let moonStage = 0;

const moonStages = [
    "🌙",
    "🌒",
    "🌓",
    "🌕"
];


// ===== OPEN BUTTON =====
if (openBtn) {
  openBtn.addEventListener("click", () => {
    landing?.classList.add("hidden");    
    game?.classList.remove("hidden");    
    game?.classList.add("fade");    

    if (music) {
      music.play().then(() => {    
        if (musicBtn) {
          musicBtn.textContent = "🔊";    
          musicBtn.classList.add("playing");    
        }
      }).catch(() => {});
    }

    // 💤 Completely stop sleeping and clear all active zzz elements instantly
    stopSleeping();
    clearTimeout(teddySleepTimer);
    document.querySelectorAll(".sleepZ").forEach(z => z.remove());

    // 🌸 Hide landing decorations smoothly
    setTimeout(() => {
      plant?.classList.add("hideDecor");
      moon?.classList.add("hideDecor");
      teddy?.classList.add("hideDecor");
      dateBtn?.classList.add("hideDecor");
    }, 300);
  });
}






// ===== MUSIC BUTTON =====
if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (catPlaying || !music) return;  

    musicClicks++;  

    // 🐱 Every 3rd click  
    if (musicClicks % 3 === 0) {  
      catPlaying = true;  
      music.pause();  
      musicBtn.classList.remove("playing");  
      musicBtn.textContent = nightMode ? "🐈‍⬛" : "🐱";  

      if (meow) {
        meow.currentTime = 0;  
        meow.play();  
      }

      setTimeout(() => {  
        musicBtn.textContent = nightMode ? "🌙" : "🐾";
      }, 1500);  

      setTimeout(() => {  
        musicBtn.textContent = "🔊";  
        music.play();  
        musicBtn.classList.add("playing");  
        catPlaying = false;  
      }, 2000);  

      return;  
    }  

    // Normal music toggle  
    if (music.paused) {  
      music.play();  
      musicBtn.textContent = "🔊";  
      musicBtn.classList.add("playing");  
    } else {  
      music.pause();  
      musicBtn.textContent = "🔇";  
      musicBtn.classList.remove("playing");  
    }
  });
}

// ===== NO BUTTON =====
if (noBtn) {
  noBtn.addEventListener("click", () => {
    clickCount++;  

    if (clickCount >= texts.length) {  
      if (message) message.textContent = "We're officially divorced 😊";  
      if (yesBtn) yesBtn.style.display = "none";  
      noBtn.style.display = "none";  
      return;  
    }  

    if (message) message.textContent = texts[clickCount - 1];  

    if (yesBtn) {
      // YES gets bigger  
      yesScale += 0.15;  
      yesBtn.style.transform = `scale(${yesScale})`;  

      // YES button floats toward NO button position
      const noPosition = noBtn.getBoundingClientRect();  
      yesBtn.style.position = "fixed";  
      yesBtn.style.left = noPosition.left + "px";  
      yesBtn.style.top = (noPosition.top - 70) + "px";
    }

    // NO gets smaller  
    let noSize = Math.max(0.15, 1 - clickCount * 0.15);  
    noBtn.style.transform = `scale(${noSize})`;  
  });
}

// ===== YES BUTTON =====
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    game?.classList.add("hidden");  
    success?.classList.remove("hidden");  
    success?.classList.add("fade");  

    createPetalBurst();  
    createPetals();
  });
}

// ===== GIFT BUTTON =====
if (giftBtn) {
  giftBtn.addEventListener("click", () => {
    success?.classList.add("hidden");  
    gift?.classList.remove("hidden");  
    gift?.classList.add("fade");  

    loading?.classList.remove("hidden");  
    giftContent?.classList.add("hidden");  

    clearInterval(petalsInterval);  
    clearInterval(heartsInterval);
    document.querySelectorAll(".petal").forEach(p => p.remove());  
    createHearts();  

    let progress = 0;  
    if (progressBar) progressBar.style.width = "0%";  
    if (progressText) progressText.textContent = "🎀 Wrapping your gift... 0%";  

    const loadingInterval = setInterval(() => {  
      progress++;  
      if (progressBar) progressBar.style.width = progress + "%";  

      if (progressText) {
        if (progress < 25) {  
          progressText.textContent = `🎀 Wrapping your gift... ${progress}%`;  
        } else if (progress < 50) {  
          progressText.textContent = `🌸 Picking the cutest memories... ${progress}%`;  
        } else if (progress < 75) {  
          progressText.textContent = `💖 Adding love... ${progress}%`;  
        } else if (progress < 100) {  
          progressText.textContent = `✨ Almost there... ${progress}%`;  
        } else {  
          progressText.textContent = "🎉 Done!";  
          clearInterval(loadingInterval);  
          setTimeout(() => {  
            loading?.classList.add("hidden");  
            giftContent?.classList.remove("hidden");  
            giftContent?.classList.add("fade");  
          }, 500);  
        }  
      }
    }, 60);
  });
}

// ===== SLEEPING HELPERS =====
function teddySleep() {
  clearTimeout(teddySleepTimer);
  teddySleepTimer = setTimeout(() => {
    if (teddy) teddy.classList.add("teddySleeping");
    startSleeping();
  }, 5000);
}

function startSleeping() {
  if (!teddy) return;
  sleepInterval = setInterval(() => {  
    const z = document.createElement("div");  
    z.className = "sleepZ";  
    z.textContent = "💤";  

    const rect = teddy.getBoundingClientRect();  
    z.style.left = (rect.left + 18) + "px";  
    z.style.top = (rect.top - 5) + "px";  

    document.body.appendChild(z);  
    setTimeout(() => { z.remove(); }, 2000);  
  }, 900);
}

function stopSleeping() {
    clearInterval(sleepInterval);

    document.querySelectorAll(".sleepZ").forEach(z=>{
        z.remove();
    });
}

// ===== FLOATING HEARTS =====
function createHearts() {
  if (!hearts) return;
  heartsInterval = setInterval(() => {  
    const heart = document.createElement("div");  
    heart.className = "heart";  
    heart.innerHTML = nightMode ? "🌟" : "💖";  
    heart.style.left = Math.random() * 100 + "%";  
    heart.style.fontSize = (20 + Math.random() * 25) + "px";  
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";  

    hearts.appendChild(heart);  
    setTimeout(() => { heart.remove(); }, 6000);  
  }, 250);
}

// ===== FALLING PETALS =====
function createPetals() {
  petalsInterval = setInterval(() => {  
    const petal = document.createElement("div");  
    petal.className = "petal";  
    petal.innerHTML = "🌸";  
    petal.style.left = Math.random() * 100 + "%";  
    petal.style.top = "-60px";  
    petal.style.fontSize = (16 + Math.random() * 22) + "px";  
    petal.style.animationDuration = (5 + Math.random() * 5) + "s";  

    document.body.appendChild(petal);  
    setTimeout(() => { petal.remove(); }, 10000);  
  }, 120);
}

// ===== PETAL BURST =====
function createPetalBurst() {
  for (let i = 0; i < 40; i++) {  
    const petal = document.createElement("div");  
    petal.className = "petal";  
    petal.innerHTML = "🌸";  
    petal.style.left = "50%";  
    petal.style.top = "50%";  
    petal.style.fontSize = (18 + Math.random() * 20) + "px";  

    const x = (Math.random() - 0.5) * 900;  
    const y = (Math.random() - 0.5) * 700;  

    petal.animate([  
      { transform: "translate(0,0) rotate(0deg)" },  
      { transform: `translate(${x}px,${y}px) rotate(${Math.random() * 720}deg)` }  
    ], {  
      duration: 1800,  
      easing: "ease-out"  
    });  

    document.body.appendChild(petal);  
    setTimeout(() => { petal.remove(); }, 1800);  
  }
}

// ===== PHOTO SLIDESHOW =====
const photos = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo5.jpg",
  "photo6.jpg",
  "photo7.jpg",
  "photo8.jpg",
  "photo9.jpg"
];

let current = 0;
let secretClicks = 0;
let secretShown = false;

setInterval(() => {
  if (secretShown || !slide) return;  
  current++;  
  if (current >= photos.length) {  
    current = 0;  
  }  
  slide.src = photos[current];
}, 4000);

// ===== SECRET 4TH PHOTO =====
if (slide) {
  slide.addEventListener("click", () => {
    if (secretShown) return;  
    secretClicks++;  

    if (secretClicks >= 3) {  
      secretShown = true;  
      slide.src = "photo4.jpg";  
      if (normalCaption) normalCaption.style.display = "none";  
      if (secretMessage) secretMessage.textContent = "I saved my favourite for last.";  
    }
  });
}

// ===== MAGICAL TAP SPARKLES =====
document.addEventListener("click", (e) => {
  for (let i = 0; i < 12; i++) {  
    const sparkle = document.createElement("div");  
    sparkle.className = "sparkle";  
    sparkle.style.left = e.clientX + "px";  
    sparkle.style.top = e.clientY + "px";  
    sparkle.style.width = (3 + Math.random() * 7) + "px";  
    sparkle.style.height = sparkle.style.width;  

    sparkle.style.setProperty("--x", (Math.random() - 0.5) * 120 + "px");  
    sparkle.style.setProperty("--y", (Math.random() - 0.5) * 120 + "px");  

    document.body.appendChild(sparkle);  
    setTimeout(() => { sparkle.remove(); }, 1000);  
  }
});

// ===== NIGHT MODE =====
ribbons.forEach(ribbon => {
  ribbon.addEventListener("click", () => {  
    ribbonClicks++;  
    if (ribbonClicks < 3) return;  

    ribbonClicks = 0;  
    nightMode = !nightMode;  
    document.body.classList.toggle("night-mode");  
    
    if (nightMode) {
      if (plant) plant.style.display = "none";
      if (moon) moon.style.display = "block";
    } else {
      if (plant) plant.style.display = "block";
      if (moon) moon.style.display = "none";

      if (moonCat) moonCat.classList.remove("appear");

      moonStage = 0;
      if (moon) moon.textContent = "🌙";
    }

    ribbons.forEach(r => {  
      r.textContent = nightMode ? "🌙" : "🎀";  
    });  
  });
});

// ===== DATE CARD =====
const anniversary = new Date("2025-12-26");

function updateDateCard() {
    if (!sinceDate || !daysTogether) return;
    const today = new Date();
    const diff = today - anniversary;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    sinceDate.textContent = "26 December 2025";
    daysTogether.textContent = `💖 ${days} days together`;
}

// Helper to hide the date card smoothly
function hideDateCard() {
    if (!dateCard || !dateOpen) return;
    dateOpen = false;
    dateCard.classList.remove("show");
    setTimeout(() => {
        dateCard.classList.add("hidden");
    }, 350);
}

// Helper to show the date card smoothly
function showDateCard() {
    if (!dateCard) return;
    dateOpen = true;
    dateCard.classList.remove("hidden");
    requestAnimationFrame(() => {
        dateCard.classList.add("show");
    });
}

if (dateBtn && dateCard) {
    updateDateCard();

    // Toggle card on button click
    dateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (dateOpen) {
            hideDateCard();
        } else {
            showDateCard();
        }
    });

    // Close card when clicking ANYWHERE outside
    document.addEventListener("click", (e) => {
        if (!dateOpen) return;
        if (!dateCard.contains(e.target) && !dateBtn.contains(e.target)) {
            hideDateCard();
        }
    });
}

// ===== TEDDY =====
const teddyMessages = [
  "Take care of yourself. 💗",  
  "You found me! :3",  
  "Sending you a teddy hug! 🧸",  
  "You're loved more than you know. 🌸",  
  "Boop! 👉🐻",  
  "Have you smiled today? 😊",  
  "You're my favorite short human. 💖",  
  "I am prettier than you... but still, you're pretty 🙂‍↕️",  
  "Fork you 🥰"
];

const teddyNightMessages = [
  "I'm getting eepy... 🥱🌙",  
  "Sweet dreams... ✨",  
  "The stars are pretty tonight. 🌟",  
  "Shhh... everyone's asleep. 🌙",
  "I ate my bed. Can I sleep on yours? 👉🏻👈🏻",
  "The moon is watching over you. 🌙💙",  
  "I am sleepy. Can I sleep on you? 🥺",
  "Even teddy needs bedtime. 🧸💤"
];

let dayDeck = [];
let nightDeck = [];

function getNextMessage(deck, sourceArray) {
  if (deck.length === 0) {
    deck.push(...sourceArray);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  return deck.pop();
}

if (teddy) {
  teddy.addEventListener("click", () => {
    teddy.blur();
    stopSleeping();

    const heartPop = document.createElement("div");
    heartPop.className = "heart";
    heartPop.innerHTML = "💖";
    heartPop.style.position = "fixed";
    heartPop.style.right = "30px";
    heartPop.style.bottom = "70px";
    heartPop.style.fontSize = "24px";
    heartPop.style.pointerEvents = "none";
    heartPop.style.zIndex = "2000";

    document.body.appendChild(heartPop);  
    setTimeout(() => { heartPop.remove(); }, 800);  

    setTimeout(() => {
      teddy.classList.remove("teddySleeping");
    }, 300);

    document.body.classList.add("plushie-mode");  

    setTimeout(() => {  
      document.body.classList.remove("plushie-mode");  
    }, 5000);

    teddy.animate([
      { transform: "rotate(0deg) scale(1)" },
      { transform: "rotate(-8deg) scale(1.08)" },
      { transform: "rotate(6deg) scale(1.12)" },
      { transform: "rotate(-4deg) scale(1.05)" },
      { transform: "rotate(0deg) scale(1)" }
    ], {
      duration: 1100,
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)"
    });

    let text;  
    if (Math.random() < 0.01) {  
      text = "🏆 JACKPOT! You found my legendary message!!";  
    } else {  
      if (nightMode) {  
        text = getNextMessage(nightDeck, teddyNightMessages);  
      } else {  
        text = getNextMessage(dayDeck, teddyMessages);  
      }
    }

    if (teddyBubble) {
      clearTimeout(teddyShowTimeout);
      clearTimeout(teddyBubbleTimeout);

      teddyBubble.style.transition = "none";
      teddyBubble.classList.remove("show");
      teddyBubble.textContent = text;

      void teddyBubble.offsetWidth;
      teddyBubble.style.transition = ""; 
      
      teddyShowTimeout = setTimeout(() => {
        teddyBubble.classList.add("show");
      }, 50);

      teddyBubbleTimeout = setTimeout(() => {
        teddyBubble.classList.remove("show");
        teddySleep();
      }, 3000);
    }
  });

  teddySleep();
}

// ===== FLOWER =====
let plantResetTimeout;

if (plant) {
  plant.addEventListener("click", () => {
    // Manual Reset if clicked on 🌸
    if (plantStage === 3) {
      clearTimeout(plantResetTimeout);
      plantStage = 0;
      plant.textContent = plantStages[plantStage];
      return;
    }

    plantStage++;
    plant.textContent = plantStages[plantStage];

    plant.classList.remove("bloom");
    void plant.offsetWidth;
    plant.classList.add("bloom");

    if (plantStage === 3) {
      if (butterfly) {
        butterfly.style.opacity = "1";
        butterfly.animate([
          { transform: "translate(0,0) rotate(0deg) scale(1)" },
          { transform: "translate(45px,-70px) rotate(-20deg) scale(1.15)" },
          { transform: "translate(95px,-25px) rotate(20deg) scale(.95)" },
          { transform: "translate(155px,-110px) rotate(-10deg) scale(1.1)" },
          { transform: "translate(260px,-170px) rotate(15deg) scale(1)" }
        ], {
          duration: 2800,
          easing: "ease-in-out",
          fill: "forwards"
        });

        setTimeout(() => {
          butterfly.style.opacity = "0";
        }, 2800);
      }

      clearTimeout(plantResetTimeout);
      plantResetTimeout = setTimeout(() => {
        plantStage = 0;
        plant.textContent = "🪴";
      }, 8000);
    }
  });
}

// ===== MOON =====
let moonResetTimeout;
const meowSound = document.getElementById("meow");

if (moon) {
  moon.addEventListener("click", () => {
    // Manual reset if clicked on 🌕
    if (moonStage === 3) {
      clearTimeout(moonResetTimeout);
      moonStage = 0;
      moon.textContent = moonStages[moonStage];
      moon.classList.remove("bright");
      moon.classList.remove("bloom");
      if (moonCat) moonCat.classList.remove("appear");
      return;
    }

    moonStage++;
    moon.textContent = moonStages[moonStage];

    // Trigger bounce animation on moon
    moon.classList.remove("bloom");
    void moon.offsetWidth; // Force CSS repaint
    moon.classList.add("bloom");

    if (moonStage === 3) {
      moon.classList.add("bright");

      // Spawn Cat
      if (moonCat) {
        moonCat.classList.remove("appear");
        void moonCat.offsetWidth;
        moonCat.classList.add("appear");
      }

      // Play meow sound
      if (meowSound) {
        meowSound.currentTime = 0;
        meowSound.play().catch(() => {});
      }

      // Auto-reset timer
      clearTimeout(moonResetTimeout);
      moonResetTimeout = setTimeout(() => {
        moonStage = 0;
        moon.textContent = "🌙";
        moon.classList.remove("bright");
        moon.classList.remove("bloom");
        if (moonCat) moonCat.classList.remove("appear");
      }, 8000);
    }
  });
}

