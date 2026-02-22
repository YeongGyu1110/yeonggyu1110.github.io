const glow = document.querySelector('.cursor-glow');
const dot = document.querySelector('.cursor-dot');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let curX = mouseX;
let curY = mouseY;
const speed = 0.08;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animate() {
    curX += (mouseX - curX) * speed;
    curY += (mouseY - curY) * speed;
    glow.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
}
animate();

document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    dot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    glow.style.opacity = '0.8';
    dot.style.opacity = '1';
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-container')) {
                    const bars = entry.target.querySelectorAll('.stat-bar-fill');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card, .reveal-img, .reveal-item, .stats-container');
    revealElements.forEach(el => observer.observe(el));
});

const translations = {
    heroDesc: {
        ko: "단순한 응답을 넘어, 사용자와 상호작용하는 챗봇을 설계합니다.<br>현재는 웹 기술을 통해 더 넓은 플랫폼으로의 확장을 준비하고 있습니다.",
        en: "Beyond simple responses, I design chatbots that interact with users.<br>I am currently preparing to expand to wider platforms using web technologies."
    },
    profileDesc: {
        ko: "자동화와 챗봇 로직 설계에 강점이 있습니다. Discord.js와 메신저봇R을 통해 수많은 사용자와 소통하는 봇을 개발해왔으며, 이제는 그 경험을 웹 인터페이스로 시각화하는 과정에 있습니다.",
        en: "I specialize in automation and chatbot logic design. I have developed bots communicating with numerous users via Discord.js and MessengerBot-R, and am now in the process of visualizing that experience through web interfaces."
    },
    stage1Desc: {
        ko: "Discord.js와 MessengerBotR을 활용하여 복잡한 로직을 처리하는 챗봇을 구현했습니다. 사용자의 의도를 파악하고 대응하는 알고리즘을 깊이 연구했습니다.",
        en: "Implemented chatbots handling complex logic using Discord.js and MessengerBot-R. Deeply researched algorithms to understand user intent and respond accordingly."
    },
    stage2Desc: {
        ko: "Flutter를 통해 크로스 플랫폼 개발을 경험하며 UI/UX에 대한 기본적인 감각과 구조적인 사고방식을 익혔습니다.",
        en: "Experienced cross-platform development via Flutter, acquiring a basic sense of UI/UX and structural thinking."
    },
    stage3Desc: {
        ko: "텍스트 기반의 인터랙션을 넘어, HTML/CSS 및 React를 학습하며 시각적인 웹 프론트엔드 영역으로 기술 스택을 확장하고 있습니다.",
        en: "Moving beyond text-based interaction, I am learning HTML/CSS and React to expand my tech stack into the visual web frontend domain."
    },
    skillCard1: {
        ko: "Discord.js 및 카카오톡 봇 개발 능력을 보유하고 있습니다.",
        en: "Capable of developing bots for Discord and KakaoTalk."
    },
    skillCard2: {
        ko: "반복적인 작업을 자동화하고 효율적인 알고리즘을 설계합니다.",
        en: "Automating repetitive tasks and designing efficient algorithms."
    },
    skillCard3: {
        ko: "HTML, CSS, React를 통해 견고한 웹 인터페이스를 구축합니다.",
        en: "Building robust web interfaces using HTML, CSS, and React."
    },
    skillCard4: {
        ko: "Flutter 경험을 바탕으로 다양한 플랫폼 환경을 이해하고 있습니다.",
        en: "Understanding diverse platform environments based on Flutter experience."
    },
    gallerySub: {
        ko: "최신 기술 트렌드와 현장의 인사이트를 수집합니다.",
        en: "Gathering intelligence from the tech frontier."
    },
    snsSub: {
        ko: "협업과 소통을 위한 연결 채널",
        en: "Open for collaboration."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    let currentLang = 'ko';

    const userLang = navigator.language || navigator.userLanguage;
    if (!userLang.includes('ko')) {
        currentLang = 'en';
    }

    updateContent(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'ko' ? 'en' : 'ko';
        updateContent(currentLang);
    });

    function updateContent(lang) {
        const elements = document.querySelectorAll('[data-translate]');

        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[key] && translations[key][lang]) {
                el.innerHTML = translations[key][lang];
            }
        });

        langBtn.textContent = lang === 'ko'
            ? "[ SWITCH LANGUAGE : EN ]"
            : "[ SWITCH LANGUAGE : KR ]";

        document.body.style.wordBreak = lang === 'ko' ? 'keep-all' : 'normal';
    }
});