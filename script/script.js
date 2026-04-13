const glow = document.querySelector('.cursor-glow');

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
    skillSub: {
        ko: "주력 개발 분야와 운용 가능한 기술 스택을 정의합니다.",
        en: "Core capabilities and utilized stacks."
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
    galleryAlt1: {
        ko: "2025년 12월 6일. DEVFEST INCHEON 2025 행사에서 '2026년: LLM 다음의 이야기' 세션을 기록한 사진",
        en: "December 6, 2025. A photo recording the session '2026: Story after LLM' at DEVFEST INCHEON 2025."
    },
    galleryAlt2: {
        ko: "2026년 1월 30일. AI SEOUL 2026 행사에 갔다온 걸 기록한 사진",
        en: "January 30, 2026. A photo recording the visit to AI SEOUL 2026."
    },
    archiveSub: {
        ko: "구현된 모든 로직과 웹 인터페이스 아카이브를 탐색합니다.",
        en: "Exploring archives of implemented logic and web interfaces."
    },
    archiveInnerSub: {
        ko: "아카이브 인덱스를 불러오는 중입니다. 계속하려면 엔터 키를 누르세요.",
        en: "Loading archive index... Press [ENTER] to initialize connection."
    },
    projectHeroDesc: {
        ko: "연구 및 개발된 모든 시스템 로직과 인터페이스의 기록.<br>시각화된 데이터를 통해 개발자의 사고 과정을 추적합니다.",
        en: "A record of all researched and developed system logics and interfaces.<br>Trace the developer's thought process through visualized data."
    },
    indexDesc: {
        ko: "데이터 섹션으로 이동할 파티션을 선택하세요.",
        en: "Select a partition to jump to data sector.",
    },
    kakaoTalkBots: {
        ko: "메신저봇 프레임워크를 이용해 초기에 제작했던 채팅 응답 스크립트들을 모아둔 저장소입니다. 효율적이지 못한 초기 코드들이 다량 포함되어 있으며, 단순 기록 및 보관을 목적으로 하고 있습니다.",
        en: "A repository of chat response scripts initially created using the Messenger Bot framework. It contains many early, inefficient codes and is maintained purely for archival and record-keeping purposes."
    },
    discordBotExamples: {
        ko: "Discord.js를 활용해 구현한 다양한 유틸리티 봇 예제 모음입니다. REST API 연동(고양이 이미지, 날씨, 번역)부터 데이터 가공(진법 변환, 모스부호, 아스키 아트), 그리고 한국어 자모 분리까지 디스코드 봇의 다채로운 활용 가능성을 탐구한 코드들을 담고 있습니다.",
        en: "A collection of diverse utility bot examples implemented with Discord.js. It explores the versatile possibilities of Discord bots, covering REST API integration (cat images, weather, translation), data processing (base conversion, Morse code, ASCII art), and Korean syllable decomposition."
    },    
    Yeonggyu1110GithubIo: {
        ko: "사이버펑크 터미널 UI 컨셉으로 제작된 개인 포트폴리오 웹사이트입니다. 바닐라 자바스크립트와 CSS 애니메이션을 활용하여 시스템 터미널과 유사한 몰입감 있는 인터페이스를 구현했습니다.",
        en: "A personal portfolio website designed with a cyberpunk terminal UI concept. Features an immersive interface resembling a system terminal, implemented using Vanilla JS and CSS animations."
    },
    classLayout: {
        ko: "사용자 정의 알고리즘을 활용한 효율적인 좌석 배치 및 관리 솔루션입니다. 랜덤 배치, 파트너 매칭, 빠른 좌석 선정 등 직관적인 UI와 기능을 제공합니다.",
        en: "An efficient seat layout and management solution using custom algorithms. Provides intuitive UI and features including random assignment and partner matching."
    },
    horrorGlitch: {
        ko: "CSS와 JavaScript를 조합하여 시각적인 공포 효과와 글리치, 점프스퀘어 연출을 실험한 프로젝트입니다. 웹 환경에서 동적인 애니메이션과 스크립트를 통해 사용자에게 심리적 긴장감을 주는 기법을 탐구합니다.",
        en: "A project experimenting with visual horror effects, glitches, and jumpscares using a combination of CSS and JavaScript. Explores techniques to create psychological tension through dynamic animations and scripts in a web environment."
    },
    prismChat: {
        ko: "중앙 서버 없이 WebRTC와 P2P 기술을 활용해 구축된 보안 강화형 1:1 메시징 플랫폼입니다. 실시간 데이터 채널을 통한 직접 연결로 데이터 보안과 익명성을 보장합니다.",
        en: "A secure 1:1 messaging platform built with WebRTC and P2P technology, bypassing central servers. Ensures data security and anonymity through direct peer connections."
    },
    magicAgeGuesser: {
        ko: "논리적인 5가지 질문과 수리적 알고리즘을 결합하여 사용자의 연령을 추론하는 웹 애플리케이션입니다. 간단한 인터랙션을 통해 알고리즘의 예측 정확도를 시각적으로 보여줍니다.",
        en: "A web application that infers a user's age by combining five logical questions with mathematical algorithms. Visually demonstrates predictive accuracy through simple interactions."
    },
    makeYourChatBot: {
        ko: "웹 브라우저 상에서 직접 채팅 반응형 봇을 설계하고 테스트할 수 있는 개발 도구입니다. 사용자 정의 스크립트가 실제 환경에서 어떻게 동작하는지 실시간으로 시뮬레이션합니다.",
        en: "A development tool for designing and testing chat-responsive bots directly in the browser. Simulates how custom scripts behave in real-time environments."
    },
    webCMD: {
        ko: "웹 기반 인터페이스에서 챗봇 로직을 제작하고 이를 로컬 환경에서 실행할 수 있도록 연동하는 시스템입니다. 터미널 환경의 명령어를 웹으로 이식하여 명령 체계를 시각화했습니다.",
        en: "A system for creating chatbot logic in a web interface and executing it in a local environment. Visualizes command structures by porting terminal commands to the web."
    },
    learnJavascript: {
        ko: "자바스크립트의 핵심 개념부터 ES6+ 최신 문법까지 깊이 있게 다루는 학습 저장소입니다. 실행 컨텍스트와 프로토타입 등 언어의 내부 작동 원리를 분석합니다.",
        en: "A comprehensive learning repository covering core JavaScript concepts to the latest ES6+ syntax. Analyzes internal workings like execution context and prototypes."
    },
    learnHtmlCss: {
        ko: "표준 웹 페이지 제작을 위한 HTML5와 CSS3의 구조적 설계 방식을 학습한 기록입니다. 반응형 레이아웃과 웹 표준을 준수하는 시맨틱 마크업을 중점적으로 다룹니다.",
        en: "Documentation of learning structural design methods for HTML5 and CSS3. Focuses on responsive layouts and semantic markup adhering to web standards."
    },
    learnReact: {
        ko: "선언적 UI 프로그래밍과 컴포넌트 기반 아키텍처를 이해하기 위한 React 학습 과정입니다. 가상 DOM의 효율성과 상태 관리 라이브러리의 활용 방식을 탐구합니다.",
        en: "A React learning journey to understand declarative UI programming and component-based architecture. Explores Virtual DOM efficiency and state management."
    },
    javascriptSendbox: {
        ko: "자바스크립트의 언어적 특성을 깊이 있게 탐구하는 실험실입니다. 참조 데이터 타입의 동작 원리, 깊은/얕은 복사, 그리고 ES6+ 최신 문법을 실제 코드로 구현하며 언어의 심층부를 분석합니다.",
        en: "A laboratory for deeply exploring the linguistic characteristics of JavaScript. Analyzes the depths of the language by implementing reference data type behaviors, deep/shallow copies, and modern ES6+ syntax."
    },
    discordjsSendbox: {
        ko: "Discord.js 라이브러리의 기능을 테스트하고 실험하는 전용 샌드박스 환경입니다. 비동기 자바스크립트 핸들링과 봇 상호작용의 핵심 원리를 학습합니다.",
        en: "A dedicated sandbox environment for testing and experimenting with the Discord.js library. Focuses on learning asynchronous JavaScript handling and bot interaction principles."
    },
    noItemsMatchYourSearch: {
        ko: "// 검색 결과와 일치하는 항목을 찾을 수 없습니다.<br>// 어림도 없지!",
        en: "// No items match your search.<br>// NOT A CHANCE."
    },
    ProjectArchiveInnerSub: {
        ko: "클릭하면 전체 프로젝트 목록을 닫고 홈 화면으로 돌아갑니다.",
        en: "Click to close the project archive and return to the main home screen."
    },
    snsSub: {
        ko: "협업과 소통을 위한 연결 채널",
        en: "Open for collaboration."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-btn');
    let currentLang =
        localStorage.getItem('userLang') ||
        ((navigator.language || navigator.userLanguage).includes('ko') ? 'ko' : 'en');

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

        const altElements = document.querySelectorAll('[data-translate-alt]');
        altElements.forEach(el => {
            const key = el.getAttribute('data-translate-alt');
            if (translations[key] && translations[key][lang]) {
                el.setAttribute('alt', translations[key][lang]);
            }
        });

        const titleElements = document.querySelectorAll('[data-translate-title]');
        titleElements.forEach(el => {
            const key = el.getAttribute('data-translate-title');
            if (translations[key] && translations[key][lang]) {
                el.setAttribute('title', translations[key][lang]);
            }
        });

        langBtn.textContent = lang === 'ko'
            ? "[ SWITCH LANGUAGE : EN ]"
            : "[ SWITCH LANGUAGE : KR ]";

        document.body.style.wordBreak = lang === 'ko' ? 'keep-all' : 'normal';
        document.documentElement.lang = lang;
        localStorage.setItem('userLang', lang);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const archiveBanner = document.querySelector('.archive-banner');
    const archiveGrid = document.querySelector('.archive-bg-grid');

    if (archiveBanner && archiveGrid) {
        let gridPosX = 0;
        let gridPosY = 0;

        let currentVelocity = 0.5;
        const normalVelocity = 0.5;
        const hoverVelocity = 1.5;

        let isHoveringArchive = false;

        archiveBanner.addEventListener('mouseenter', () => {
            isHoveringArchive = true;
        });

        archiveBanner.addEventListener('mouseleave', () => {
            isHoveringArchive = false;
        });


        let isArchiveVisible = false;

        const observerOptions = {
            root: null,
            rootMargin: "50px",
            threshold: 0
        };

        const archiveObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!isArchiveVisible) {
                    isArchiveVisible = true;
                    animateArchiveGrid(); 
                }
            } else {
                isArchiveVisible = false; 
            }
        }, observerOptions);

        archiveObserver.observe(archiveBanner);

        function animateArchiveGrid() {
            if (!isArchiveVisible) return; 

            const targetVelocity = isHoveringArchive ? hoverVelocity : normalVelocity;
            currentVelocity += (targetVelocity - currentVelocity) * 0.05;

            gridPosX = (gridPosX - currentVelocity) % 40;
            gridPosY = (gridPosY + currentVelocity) % 40;

            archiveGrid.style.backgroundPosition = `${gridPosX}px ${gridPosY}px`;

            requestAnimationFrame(animateArchiveGrid);
        }
        
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const marqueeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const tracks = entry.target.querySelectorAll('.marquee-track');
            if (entry.isIntersecting) {
                tracks.forEach(track => track.style.animationPlayState = 'running');
            } else {
                tracks.forEach(track => track.style.animationPlayState = 'paused');
            }
        });
    }, { rootMargin: "50px" });

    document.querySelectorAll('.tech-marquee').forEach(el => {
        marqueeObserver.observe(el);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const topLinks = document.querySelectorAll('nav a[href="#"]');

    topLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});