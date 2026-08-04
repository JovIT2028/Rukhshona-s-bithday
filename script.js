/**
 * ==========================================================================
 * LUXURY BIRTHDAY EXPERIENCE FOR RUKHSHONA
 * Crafted with Passion by Jovidon Kulobiev
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initLenis();
    initCursorAndTrail();
    initThreeUniverse();
    initCanvasFlowers();
    initHeroAnimations();
    initHeartInteraction();
    initLoveLetterTyping();
    initRelationshipCounter();
    initPhotoGalleryLightbox();
    initReasonsCardSystem();
    initMusicPlayer();
    initBirthdaySurprise();
    initScrollAnimations();
    initCakeClose();
});

/* 1. LOADER */
function initLoader() {
    const loader = document.getElementById("loader-screen");
    const progressBar = document.getElementById("loader-progress-bar");
    const percentageText = document.getElementById("loader-percentage");
    
    if (!loader || !progressBar || !percentageText) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => { loader.style.display = "none"; }
                });
            }, 400);
        }
        progressBar.style.width = progress + "%";
        percentageText.textContent = progress + "%";
    }, 40);
}

/* 2. LENIS */
let lenis;
function initLenis() {
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }
}

/* 3. CURSOR */
function initCursorAndTrail() {
    const cursorGlow = document.getElementById("cursorGlow");
    const trailContainer = document.getElementById("mouseTrail");
    
    if (!cursorGlow || !trailContainer) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (Math.random() > 0.75) createSparkle(mouseX, mouseY, trailContainer);
    });

    function renderGlow() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.left = glowX + "px";
        cursorGlow.style.top = glowY + "px";
        requestAnimationFrame(renderGlow);
    }
    renderGlow();
}

function createSparkle(x, y, container) {
    const sparkle = document.createElement("div");
    sparkle.className = "trail-sparkle";
    const size = Math.random() * 6 + 4;
    sparkle.style.width = size + "px";
    sparkle.style.height = size + "px";
    sparkle.style.left = (x + (Math.random() * 20 - 10)) + "px";
    sparkle.style.top = (y + (Math.random() * 20 - 10)) + "px";
    sparkle.style.position = "fixed";
    sparkle.style.background = Math.random() > 0.5 ? "#F5D76E" : "#FFFFFF";
    sparkle.style.borderRadius = "50%";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "5";
    sparkle.style.boxShadow = "0 0 10px #F5D76E";
    container.appendChild(sparkle);

    gsap.to(sparkle, {
        y: -40 - Math.random() * 30,
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "power1.out",
        onComplete: () => sparkle.remove()
    });
}

/* 4. THREE.JS UNIVERSE */
function initThreeUniverse() {
    const canvas = document.getElementById("universe-canvas");
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color("#F5D76E");
    const colorWhite = new THREE.Color("#FFFFFF");
    const colorBlue = new THREE.Color("#4F7EFF");

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;

        let rand = Math.random();
        let col = rand > 0.7 ? colorGold : (rand > 0.4 ? colorWhite : colorBlue);
        colors[i] = col.r; colors[i + 1] = col.g; colors[i + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 50;

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0008 + mouseX;
        particles.rotation.x += 0.0004 + mouseY;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* 5. FLOWERS */
function initCanvasFlowers() {
    const canvas = document.getElementById("flowers-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class FloatingPetal {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.size = Math.random() * 12 + 8;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.color = Math.random() > 0.3 ? "#FFF8F0" : "#F5D76E";
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height + 50) this.reset();
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const petals = [];
    for (let i = 0; i < 35; i++) {
        const p = new FloatingPetal();
        p.y = Math.random() * canvas.height;
        petals.push(p);
    }

    function animatePetals() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animatePetals);
    }
    animatePetals();
}

/* 6. HERO */
function initHeroAnimations() {
    const words = document.querySelectorAll(".hero-title .word");
    if (words.length) {
        gsap.from(words, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.5
        });
    }

    const heroExtras = document.querySelectorAll(".hero-subtitle, .badge-tag");
    if (heroExtras.length) {
        gsap.from(heroExtras, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 1.1
        });
    }
}

/* 7. HEART */
function initHeartInteraction() {
    const btn = document.getElementById("open-heart-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Start music
        if (typeof window.playCurrentTrack === 'function') {
            window.playCurrentTrack();
        }

        if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.ScrollToPlugin) {
            gsap.to(window, {
                scrollTo: "#letter-section",
                duration: 1.5,
                ease: "power2.inOut"
            });
        } else {
            document.getElementById("letter-section")?.scrollIntoView({ behavior: "smooth" });
        }

        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F5D76E', '#FFF8F0', '#4F7EFF']
            });
        }
    });
}

/* 8. LETTER */
function initLoveLetterTyping() {
    if (typeof ScrollTrigger === 'undefined') return;

    const letter = document.querySelector(".letter-wrapper");
    if (!letter) return;

    gsap.from(letter, {
        scrollTrigger: {
            trigger: "#letter-section",
            start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
}

/* 9. COUNTER */
/* 9. COUNTER — аз рӯзи вохӯрӣ */
function initRelationshipCounter() {
    // ★★★ Сана ва вақти вохӯрии шумо ★★★
    // Формат: "Сол-Моҳ-РӯзTСоат:Дақиқа:Сония"
    // Масалан агар 30 июли 2026 соати 18:30 вохӯрда бошед:
    const startDate = new Date("2026-07-29T18:30:00");

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) return; // агар сана дар оянда бошад

        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours   = Math.floor(totalMinutes / 60);
        const totalDays    = Math.floor(totalHours / 24);

        const days    = totalDays;
        const hours   = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        const el = (id) => document.getElementById(id);

        if (el("count-days"))    el("count-days").textContent    = days;
        if (el("count-hours"))   el("count-hours").textContent   = String(hours).padStart(2, '0');
        if (el("count-minutes")) el("count-minutes").textContent = String(minutes).padStart(2, '0');
        if (el("count-seconds")) el("count-seconds").textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCounter, 1000);
    updateCounter();
}
/* 10. GALLERY */
function initPhotoGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");

    if (!lightbox || !lightboxImg) return;

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgSrc = item.getAttribute("data-img");
            lightboxImg.src = imgSrc;
            lightbox.classList.add("active");
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => lightbox.classList.remove("active"));
    }

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });
}

/* 11. REASONS */
/* 11. REASONS - BEAUTIFUL LETTER STYLE */
function initReasonsCardSystem() {
    const reasons = [
        "Your laughter is my favorite sound in the entire world.",
        "The way your eyes light up when you talk about your passions.",
        "How you make every ordinary moment feel extraordinary.",
        "Your incredible kindness toward everyone you meet.",
        "The comforting warmth of your hand in mine.",
        "How you always know how to make me smile on tough days.",
        "Your boundless creativity and brilliant mind.",
        "The peaceful feeling I get whenever I am near you.",
        "Your unwavering support for all my dreams.",
        "Simply because you are you, perfectly wonderful.",
        "The way you say my name makes my heart skip a beat.",
        "Your strength inspires me every single day.",
        "I love the way you dream with your eyes open.",
        "You are my favorite notification.",
        "Your hug feels like home.",
        "I fall in love with you more every morning.",
        "You are the reason I believe in magic.",
        "Your smile is my personal sunshine.",
        "I love how you care about the little things.",
        "You make my world infinitely better just by existing.",
        "Every time I look at you, I fall in love all over again.",
        "Your voice is my favorite melody.",
        "You turn ordinary days into unforgettable memories.",
        "I love the way you make me feel safe.",
        "Your kindness makes the world softer.",
        "You are the best decision I never planned.",
        "I love how you believe in me even when I doubt myself.",
        "Your presence is my peace.",
        "You make my heart feel full.",
        "I choose you every single day."
        // Ту метавонӣ боз илова кунӣ...
    ];

    let currentIndex = 0;
    const reasonText = document.getElementById("reason-text");
    const reasonCounter = document.getElementById("reason-counter");
    const nextBtn = document.getElementById("next-reason-btn");
    const card = document.getElementById("reason-card");

    if (!reasonText || !reasonCounter || !nextBtn) return;

    function showNextReason() {
        // Аввал матнро паст мекунем
        reasonText.classList.remove("fade-in");
        reasonText.classList.add("fade-out");

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % reasons.length;
            reasonText.textContent = reasons[currentIndex];
            reasonCounter.textContent = currentIndex + 1;

            reasonText.classList.remove("fade-out");
            reasonText.classList.add("fade-in");
        }, 320);
    }

    nextBtn.addEventListener("click", showNextReason);

    // Бо клик кардани худи карт ҳам кор мекунад
    if (card) {
        card.addEventListener("click", showNextReason);
    }
}

/* 12. MUSIC PLAYER */
function initMusicPlayer() {
    // ============================================
    // ★★★ ҶОИ СУРУДҲО ★★★
    // ============================================
    const playlist = [
        {
            title: "Our Eternal Waltz",
            artist: "Cinematic Romance",
            src: "sounds/gggg.mp3"
        },
        {
            title: "For My Rukhshona",
            artist: "Love Theme",
            src: "sounds/hhhh.mp3"
        },
        {
            title: "Midnight Whispers",
            artist: "Romantic Piano",
            src: "sounds/my-song.mp3"
        },
        {
            title: "Stars Align",
            artist: "Dreamy Strings",
            src: "sounds/ssss.mp3"
        }
    ];

    let currentTrack = 0;
    const audio = document.getElementById("bg-audio");
    const playBtn = document.getElementById("play-pause-btn");
    const playIcon = document.getElementById("play-icon");
    const albumArt = document.querySelector(".album-art");
    const volumeSlider = document.getElementById("volume-slider");
    const trackTitle = document.getElementById("track-title");
    const trackArtist = document.getElementById("track-artist");
    const prevBtn = document.getElementById("prev-track-btn");
    const nextBtn = document.getElementById("next-track-btn");

    if (!audio) return;

    audio.volume = 0.7;

    function loadTrack(index) {
        currentTrack = index;
        audio.src = playlist[currentTrack].src;
        if (trackTitle) trackTitle.textContent = playlist[currentTrack].title;
        if (trackArtist) trackArtist.textContent = playlist[currentTrack].artist;
    }

    function playCurrentTrack() {
        audio.play().then(() => {
            if (playIcon) playIcon.className = "fa-solid fa-pause";
            if (albumArt) albumArt.classList.add("playing");
        }).catch(err => console.log("Audio play prevented:", err));
    }

    function pauseTrack() {
        audio.pause();
        if (playIcon) playIcon.className = "fa-solid fa-play";
        if (albumArt) albumArt.classList.remove("playing");
    }

    if (playBtn) {
        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                if (!audio.src) loadTrack(0);
                playCurrentTrack();
            } else {
                pauseTrack();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrack);
            playCurrentTrack();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack(currentTrack);
            playCurrentTrack();
        });
    }

    audio.addEventListener("ended", () => {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        playCurrentTrack();
    });

    if (volumeSlider) {
        volumeSlider.addEventListener("input", (e) => {
            audio.volume = e.target.value;
        });
    }

    loadTrack(0);
    window.playCurrentTrack = playCurrentTrack;
}

/* 13. BIRTHDAY SURPRISE + 3D CAKE */
function initBirthdaySurprise() {
    const surpriseBtn = document.getElementById("surprise-btn");
    const cakeModal = document.getElementById("cake-modal");
    const cake = document.getElementById("birthday-cake");

    if (!surpriseBtn || !cakeModal || !cake) return;

    surpriseBtn.addEventListener("click", () => {
        if (typeof confetti !== 'undefined') {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 10000 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 55 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#F5D76E', '#FF6B8A', '#FFFFFF', '#4F7EFF']
                }));
                confetti(Object.assign({}, defaults, { 
                    particleCount, 
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#F5D76E', '#FF6B8A', '#FFFFFF', '#4F7EFF']
                }));
            }, 220);
        }

        cakeModal.classList.add("active");

        setTimeout(() => {
            cake.classList.add("lit");
        }, 600);

        setTimeout(() => {
            cake.classList.add("celebrate");
        }, 900);

        setTimeout(() => {
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 120,
                    spread: 100,
                    origin: { y: 0.55 },
                    colors: ['#F5D76E', '#FF6B8A', '#FFF8F0']
                });
            }
        }, 1400);
    });
}

function initCakeClose() {
    const closeBtn = document.getElementById("cake-close-btn");
    const cakeModal = document.getElementById("cake-modal");
    const cake = document.getElementById("birthday-cake");

    if (!closeBtn || !cakeModal) return;

    closeBtn.addEventListener("click", () => {
        cakeModal.classList.remove("active");
        if (cake) cake.classList.remove("lit", "celebrate");
        
        if (typeof gsap !== 'undefined' && gsap.plugins?.ScrollToPlugin) {
            gsap.to(window, {
                scrollTo: "#final-section",
                duration: 1.8,
                ease: "power2.inOut"
            });
        } else {
            document.getElementById("final-section")?.scrollIntoView({ behavior: "smooth" });
        }
    });
}

/* 14. SCROLL ANIMATIONS */
function initScrollAnimations() {
    if (typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray(".cinematic-section").forEach(section => {
        const targets = section.querySelectorAll(".section-header, .counter-card, .timeline-item, .gallery-item, .letter-wrapper, .reasons-card-container");
        
        if (targets.length === 0) return;

        gsap.from(targets, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out"
        });
    });
}
