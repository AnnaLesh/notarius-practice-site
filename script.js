// Основной скрипт сайта

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('.header .container');
    header.prepend(mobileMenuButton);
    
    const menu = document.querySelector('.main-menu ul');
    
    mobileMenuButton.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Валидация формы обратной связи
    const feedbackForm = document.querySelector('.feedback-form form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            let valid = true;
            
            // Проверка имени
            const nameInput = this.querySelector('#name');
            if (nameInput.value.trim() === '') {
                valid = false;
                nameInput.classList.add('error');
            } else {
                nameInput.classList.remove('error');
            }
            
            // Проверка телефона
            const phoneInput = this.querySelector('#phone');
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneInput.value)) {
                valid = false;
                phoneInput.classList.add('error');
            } else {
                phoneInput.classList.remove('error');
            }
            
            // Проверка сообщения
            const messageInput = this.querySelector('#message');
            if (messageInput.value.trim() === '') {
                valid = false;
                messageInput.classList.add('error');
            } else {
                messageInput.classList.remove('error');
            }
            
            if (!valid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля корректно.');
            } else {
                // Здесь можно добавить AJAX отправку формы
                alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
                this.reset();
                e.preventDefault();
            }
        });
    }
    
    // Авторизация (имитация)
    const authForm = document.querySelector('#auth-form');
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const login = this.querySelector('#login').value;
            const password = this.querySelector('#password').value;
            console.log(login, password)
            // Имитация проверки учетных данных
            if (login === 'admin' && password === 'admin123') {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', 'admin');
                window.location.href = 'private/admin.html';
            } else if (login === 'user' && password === 'user123') {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', 'user');
                window.location.href = 'private/user.html';
            } else if (login === 'client' && password === 'client123') {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', 'client');
                window.location.href = 'private/client.html';
            } else {
                alert('Неверный логин или пароль');
            }
        });
    }
    
    // Проверка авторизации при загрузке защищенных страниц
    if (window.location.pathname.includes('/private/')) {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        
        if (!isAuthenticated) {
            window.location.href = 'auth.html';
        } else {
            // Проверка прав доступа для конкретных страниц
            const username = localStorage.getItem('username');
            const currentPage = window.location.pathname.split('/').pop();
            
            // Страница только для админа
            if (currentPage === 'admin.html' && username !== 'admin') {
                window.location.href = 'auth.html';
            }
            
            // Страница только для группы клиентов
            if (currentPage === 'client.html' && username !== 'client') {
                window.location.href = 'auth.html';
            }
        }
    }
    
    // Выход из системы
    const logoutButtons = document.querySelectorAll('.logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            window.location.href = 'auth.html';
        });
    });
});