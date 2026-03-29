// 1. Firebase 코어 및 Realtime Database 함수 불러오기 (CDN 방식)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, push, onDisconnect, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  aapiKey: "AIzaSyDBuFQmMrv5ulAq1TtzzJjRpI2wvf4Mnys",
  authDomain: "yeonggyu1110-github-io.firebaseapp.com",
  projectId: "yeonggyu1110-github-io",
  storageBucket: "yeonggyu1110-github-io.firebasestorage.app",
  messagingSenderId: "41059070712",
  appId: "1:41059070712:web:62ef5dc34405da40eb010d",
  databaseURL: "https://yeonggyu1110-github-io-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// 3. Firebase 시작 및 데이터베이스 연결
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 4. 화면의 숫자 표시할 HTML 요소 가져오기
const activeNodesEl = document.getElementById("active-nodes");

// 5. 백엔드 통신 로직 (접속자 수 파악)
const connectedRef = ref(db, ".info/connected"); // 현재 내가 서버랑 연결됐는지 확인하는 특수 경로
const connectionsRef = ref(db, "connections");   // 우리가 아까 만든 폴더 이름

// 내가 웹페이지에 들어왔을 때 실행됨
onValue(connectedRef, (snap) => {
  if (snap.val() === true) {
    // 5-1. 연결 성공! connections 폴더 안에 '내 전용 빈 방'을 하나 만든다. (push)
    const myConnectionRef = push(connectionsRef);

    // 5-2. [마법의 코드] 내가 브라우저를 끄거나 인터넷이 끊기면, 내 방을 지워달라고 구글 서버에 미리 예약해둔다!
    onDisconnect(myConnectionRef).remove();

    // 5-3. 내 방에 접속 완료 표시(true)를 남긴다.
    set(myConnectionRef, true);
  }
});

// 6. 누군가 들어오거나 나갈 때마다 실시간으로 실행됨
onValue(connectionsRef, (snap) => {
  // connections 폴더 안에 '방'이 몇 개 있는지 센다 = 현재 접속자 수!
  const currentUsers = snap.size; 
  
  // 센 숫자를 HTML 화면에 띄운다.
  activeNodesEl.innerText = currentUsers;
});