// script.js (Updated for All Pages)

document.addEventListener('DOMContentLoaded', () => {

    // --- 공통 기능: 로그인 상태 확인 및 헤더 UI 변경 ---
    const checkLoginState = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const authButtons = document.getElementById('auth-buttons');
        const mypageButtons = document.getElementById('mypage-buttons');

        if (authButtons && mypageButtons) {
            if (isLoggedIn) {
                authButtons.classList.add('hidden');
                mypageButtons.classList.remove('hidden');
            } else {
                authButtons.classList.remove('hidden');
                mypageButtons.classList.add('hidden');
            }
        }
    };

    // --- 공통 기능: 로그아웃 ---
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            alert('로그아웃되었습니다.');
            window.location.href = 'index.html';
        });
    }

    // --- 페이지별 스크립트 분기 처리 ---

    // 메인 페이지 (index.html)
    if (document.getElementById('hero')) {
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                // 예시로 '청소' 서비스 페이지로만 연결합니다.
                window.location.href = 'services.html';
            });
        });
    }

    // 로그인 페이지 (login.html)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            alert('로그인되었습니다. 메인 페이지로 이동합니다.');
            window.location.href = 'index.html';
        });
    }

    // 회원가입 페이지 (signup.html)
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
            window.location.href = 'login.html';
        });
    }

    // 파트너 상세 페이지 (partner-profile.html)
    const reserveButton = document.getElementById('reserve-btn');
    if (reserveButton) {
        reserveButton.addEventListener('click', () => {
            if (localStorage.getItem('isLoggedIn')) {
                window.location.href = 'reservation.html';
            } else {
                alert('로그인이 필요한 서비스입니다.');
                window.location.href = 'login.html';
            }
        });
    }
    
    // 예약 페이지 (reservation.html)
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
         if (!localStorage.getItem('isLoggedIn')) {
            alert('로그인이 필요한 페이지입니다.');
            window.location.href = 'login.html';
            return;
        }
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('예약이 요청되었습니다. 마이페이지에서 확인하실 수 있습니다.');
            window.location.href = 'mypage.html';
        })
    }
    
    // 리뷰 작성 페이지 (review-form.html)
    const reviewForm = document.getElementById('review-form');
    if(reviewForm) {
        if (!localStorage.getItem('isLoggedIn')) {
            alert('로그인이 필요한 페이지입니다.');
            window.location.href = 'login.html';
            return;
        }
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('소중한 리뷰 감사합니다!');
            window.location.href = 'mypage.html';
        })
    }

    // 채팅 페이지 (chat.html)
    const chatForm = document.getElementById('chat-form');
    if(chatForm) {
        if (!localStorage.getItem('isLoggedIn')) {
            alert('로그인이 필요한 페이지입니다.');
            window.location.href = 'login.html';
            return;
        }
        const messageList = document.querySelector('.message-list');
        const input = chatForm.querySelector('input');
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = input.value.trim();
            if(messageText){
                const newMessage = document.createElement('div');
                newMessage.classList.add('message', 'sent');
                newMessage.innerHTML = `<div class="text">${messageText}</div>`;
                messageList.appendChild(newMessage);
                messageList.scrollTop = messageList.scrollHeight;
                input.value = '';
            }
        })
    }

    // 파트너 지원 페이지 (partner-application.html)
    const partnerAppForm = document.getElementById('partner-application-form');
    if(partnerAppForm) {
        partnerAppForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('파트너 지원이 완료되었습니다. 검토 후 연락드리겠습니다.');
            window.location.href = 'index.html';
        })
    }

    // 마이페이지 (mypage.html)
    if (document.querySelector('.mypage-grid') && !localStorage.getItem('isLoggedIn')) {
        alert('로그인이 필요한 페이지입니다.');
        window.location.href = 'login.html';
    }
    
    // 모든 페이지 로드 시 로그인 상태 공통 체크
    checkLoginState();
});