document.addEventListener("DOMContentLoaded", () => {
    const exitBanner = document.querySelector('.exit-banner');
    const exitGrid = document.querySelector('.exit-banner .archive-bg-grid');

    if (exitBanner && exitGrid) {
        let gridPosX = 0;
        let gridPosY = 0;

        let currentVelocity = 1.5;
        const normalVelocity = 1.5;
        const hoverVelocity = 0.5;

        let isHoveringExit = false;

        exitBanner.addEventListener('mouseenter', () => {
            isHoveringExit = true;
        });

        exitBanner.addEventListener('mouseleave', () => {
            isHoveringExit = false;
        });

        let isExitVisible = false;

        const exitObserverOptions = {
            rootMargin: "50px", 
            threshold: 0
        };

        const exitObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!isExitVisible) {
                    isExitVisible = true;
                    animateExitGrid();
                }
            } else {
                isExitVisible = false;
            }
        }, exitObserverOptions);

        exitObserver.observe(exitBanner);

        function animateExitGrid() {
            if (!isExitVisible) return;

            const targetVelocity = isHoveringExit ? hoverVelocity : normalVelocity;
            currentVelocity += (targetVelocity - currentVelocity) * 0.05;

            gridPosX = (gridPosX + currentVelocity) % 40;
            gridPosY = (gridPosY - currentVelocity) % 40;

            exitGrid.style.backgroundPosition = `${gridPosX}px ${gridPosY}px`;

            requestAnimationFrame(animateExitGrid);
        }
        
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const headerMarqueeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const tracks = entry.target.querySelectorAll('.marquee-track');
            if (entry.isIntersecting) {
                tracks.forEach(track => track.style.animationPlayState = 'running');
            } else {
                tracks.forEach(track => track.style.animationPlayState = 'paused');
            }
        });
    });

    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    if (marqueeWrapper) {
        headerMarqueeObserver.observe(marqueeWrapper);
    }
});

const scrollLinks = document.querySelectorAll('.folder-tab');
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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

// =========================================
// 1. FIREBASE: 실시간 접속자 노드 추적
// =========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, push, onDisconnect, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// ⭐ 여기에 본인의 firebaseConfig 값을 넣으세요.
const firebaseConfig = {
    apiKey: "AIzaSyDBuFQmMrv5ulAq1TtzzJjRpI2wvf4Mnys",
    authDomain: "yeonggyu1110-github-io.firebaseapp.com",
    projectId: "yeonggyu1110-github-io",
    storageBucket: "yeonggyu1110-github-io.firebasestorage.app",
    messagingSenderId: "41059070712",
    appId: "1:41059070712:web:62ef5dc34405da40eb010d",
    databaseURL: "https://yeonggyu1110-github-io-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

try {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const activeNodesEl = document.getElementById("active-nodes");
    const connectedRef = ref(db, ".info/connected");
    const connectionsRef = ref(db, "connections");

    // 연결 상태 모니터링
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            const myConnectionRef = push(connectionsRef);
            onDisconnect(myConnectionRef).remove(); // 접속 끊기면 삭제 예약
            set(myConnectionRef, true);
        }
    });

    // 실시간 유저 수 업데이트
    onValue(connectionsRef, (snap) => {
        if (activeNodesEl) {
            activeNodesEl.innerText = snap.size;
        }
    });
} catch (error) {
    console.warn("Firebase 초기화 에러 (config를 확인하세요):", error);
}

// =========================================
// 2. SIDEBAR & MATRIX CALENDAR LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebar = document.getElementById('profile-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // 사이드바 토글 로직
    if (sidebarOpenBtn) {
        sidebarOpenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 사이드바 열릴 때 달력 렌더링 (CORS 해결된 JSON API 사용)
            if (!document.getElementById('calendar-rendered')) {
                renderMatrixCalendar('yeonggyu1110');
            }
        });
    }

    const closeSidebar = () => {
        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // [핵심] JSON API를 활용한 깃허브 달력 생성기
    async function renderMatrixCalendar(username) {
        const container = document.getElementById('cyber-calendar-container');
        if(!container) return;
        
        container.innerHTML = '<div class="loading-matrix">FETCHING_DATA...</div>';
        container.id = "calendar-rendered"; // 중복 실행 방지

        try {
            // 1. CORS가 개방된 GitHub 잔디 JSON API 사용 (프록시 불필요)
            const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
            if (!response.ok) throw new Error('API Request Failed');
            
            const data = await response.json();
            
            // 2. 주 단위 배열로 감싸진 데이터를 1차원 날짜 배열로 평탄화(flat)
            const allDays = data.contributions.flat();
            const dataMap = {};
            
            // 3. 커밋 수를 기준으로 Level(0~4) 계산하여 Map에 저장
            allDays.forEach(day => {
                let level = 0;
                const count = day.contributionCount;
                
                // GitHub와 유사한 알고리즘으로 레벨 스케일링
                if (count > 0 && count <= 2) level = 1;
                else if (count > 2 && count <= 5) level = 2;
                else if (count > 5 && count <= 10) level = 3;
                else if (count > 10) level = 4;
                
                dataMap[day.date] = level.toString(); // "YYYY-MM-DD": "Level"
            });

            container.innerHTML = ''; // 로딩 완료, 텍스트 제거

            // 4. 최근 3개월 타겟 배열 생성
            const today = new Date();
            const targetMonths = [];
            for (let i = 2; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                targetMonths.push({ year: d.getFullYear(), month: d.getMonth() });
            }

            // 5. 달력 렌더링
            targetMonths.forEach(m => {
                const year = m.year;
                const month = m.month; 
                
                const firstDayIndex = new Date(year, month, 1).getDay(); // 1일의 요일
                const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수

                const monthBlock = document.createElement('div');
                monthBlock.className = 'month-block';

                // 타이틀
                const title = document.createElement('div');
                title.className = 'month-title';
                title.textContent = `// ${year}_${String(month + 1).padStart(2, '0')}`;
                monthBlock.appendChild(title);

                // 요일 헤더
                const weekHeader = document.createElement('div');
                weekHeader.className = 'week-header';
                ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(day => {
                    const span = document.createElement('span');
                    span.textContent = day;
                    weekHeader.appendChild(span);
                });
                monthBlock.appendChild(weekHeader);

                // 날짜 그리드
                const daysGrid = document.createElement('div');
                daysGrid.className = 'days-grid';

                // 앞쪽 빈 칸 채우기
                for (let i = 0; i < firstDayIndex; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'cal-day empty';
                    daysGrid.appendChild(emptyDay);
                }

                // 실제 날짜 채우고 레벨 반영하기
                for (let day = 1; day <= daysInMonth; day++) {
                    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    
                    const dayEl = document.createElement('div');
                    dayEl.className = 'cal-day';
                    dayEl.textContent = day;
                    
                    const level = dataMap[dateString] || "0";
                    dayEl.setAttribute('data-level', level);
                    dayEl.title = `[ ${dateString} ] Contributions: Level ${level}`;
                    
                    daysGrid.appendChild(dayEl);
                }

                monthBlock.appendChild(daysGrid);
                container.appendChild(monthBlock);
            });

        } catch (error) {
            console.error("데이터 매트릭스 동기화 실패:", error);
            container.innerHTML = '<div class="loading-matrix" style="color:#ff4444;">ERROR: SYS_OFFLINE<br><span style="font-size:0.7rem; color:#888;">(API CONNECTION FAILED)</span></div>';
        }
    }
});