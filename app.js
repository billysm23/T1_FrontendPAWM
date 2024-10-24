const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('subscribeForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailPattern.test(email)) {
            showNotification('Subscription successful! Thank you for subscribing.', 'success');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            showNotification('Invalid email format. Please check your email address.', 'error');
        }
    });
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');

    notification.className = 'notification ' + type;
    notificationMessage.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-in-out';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.animation = '';
        }, 500);
    }, 5000);
}

function closeNotification() {
    const notification = document.getElementById('notification');
    notification.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        notification.style.display = 'none';
        notification.style.animation = '';
    }, 500);
}

document.addEventListener("DOMContentLoaded", function() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
    
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});