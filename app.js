// navbar menu
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// email verification
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

// notifikasi validasi email
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

// lesson drop down
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

// inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.test-container');
    const feedback = document.getElementById('feedback');
    const progress = document.getElementById('progress');
    let currentProgress = 0;

    document.querySelectorAll('.question').forEach((question, index) => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'question-feedback';
        feedbackDiv.id = `feedback-q${index + 1}`;
        question.appendChild(feedbackDiv);
    });

    // progress bar
    function updateProgress() {
        const totalQuestions = 5;
        let answeredQuestions = 0;
        if (document.querySelector('input[name="q1"]:checked')) answeredQuestions++;
        const q2Checked = document.querySelectorAll('input[name="q2"]:checked').length;
        if (q2Checked > 0) answeredQuestions++;
        if (document.querySelector('input[name="q3"]:checked')) answeredQuestions++;
        const sortableItems = document.querySelectorAll('.sortable-item[data-moved="true"]');
        if (sortableItems.length > 0) answeredQuestions++;
        const matchingSelects = document.querySelectorAll('.matching-select');
        const answeredSelects = Array.from(matchingSelects).filter(select => select.value !== '');
        if (answeredSelects.length > 0) answeredQuestions++;
        
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', updateProgress);
    });

    // validasi jawaban
    function checkQuestion1() {
        const q1Answer = document.querySelector('input[name="q1"]:checked');
        const feedbackDiv = document.getElementById('feedback-q1');
        
        if (!q1Answer) {
            feedbackDiv.textContent = 'Please select an answer.';
            feedbackDiv.className = 'question-feedback warning';
            return 0;
        }

        const isCorrect = q1Answer.value === 'b';
        feedbackDiv.textContent = isCorrect 
            ? 'Correct! Decomposition is about breaking down complex problems into smaller parts.'
            : 'Incorrect. Decomposition is the process of breaking down complex problems into smaller, manageable parts.';
        feedbackDiv.className = `question-feedback ${isCorrect ? 'success' : 'error'}`;
        return isCorrect ? 1 : 0;
    }

    function checkQuestion2() {
        const q2Answers = Array.from(document.querySelectorAll('input[name="q2"]:checked'))
            .map(input => input.value);
        const feedbackDiv = document.getElementById('feedback-q2');

        if (q2Answers.length === 0 || q2Answers.length !== 3) {
            feedbackDiv.textContent = 'Please select exactly three answers.';
            feedbackDiv.className = 'question-feedback warning';
            return 0;
        }

        const isCorrect = q2Answers.includes('a') && q2Answers.includes('b') && q2Answers.includes('d');
        feedbackDiv.textContent = isCorrect
            ? 'Correct! Decomposition, Pattern Recognition, and Abstraction are key concepts.'
            : 'Incorrect. The three key concepts are Decomposition, Pattern Recognition, and Abstraction.';
        feedbackDiv.className = `question-feedback ${isCorrect ? 'success' : 'error'}`;
        return isCorrect ? 1 : 0;
    }

    function checkQuestion3() {
        const q3Answer = document.querySelector('input[name="q3"]:checked');
        const feedbackDiv = document.getElementById('feedback-q3');

        if (!q3Answer) {
            feedbackDiv.textContent = 'Please select an answer.';
            feedbackDiv.className = 'question-feedback warning';
            return 0;
        }

        const isCorrect = q3Answer.value === 'true';
        feedbackDiv.textContent = isCorrect
            ? 'Correct! Algorithm design is indeed about creating step-by-step processes.'
            : 'Incorrect. Algorithm design involves creating a step-by-step process to solve problems.';
        feedbackDiv.className = `question-feedback ${isCorrect ? 'success' : 'error'}`;
        return isCorrect ? 1 : 0;
    }

    function checkQuestion4() {
        const currentOrder = Array.from(sortable.children).map(item => item.dataset.order);
        const feedbackDiv = document.getElementById('feedback-q4');
        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(['3', '4', '1', '2']);

        feedbackDiv.textContent = isCorrect
            ? 'Correct! You have arranged the steps in the right order.'
            : 'Incorrect. The correct order is: Define the problem → Create a plan → Test the solution → Evaluate the solution';
        feedbackDiv.className = `question-feedback ${isCorrect ? 'success' : 'error'}`;
        return isCorrect ? 1 : 0;
    }

    // dragdrop sorting no 4
    sortable.querySelectorAll('.sortable-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggingElement = item;
            e.dataTransfer.effectAllowed = 'move';
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            draggingElement = null;
            item.classList.remove('dragging');
            item.dataset.moved = 'true';
            updateProgress();
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (item !== draggingElement) {
                const afterElement = (e.clientY - item.getBoundingClientRect().top) > (item.offsetHeight / 2);
                item.parentNode.insertBefore(draggingElement, afterElement ? item.nextSibling : item);
            }
        });
    });

    function checkQuestion5() {
        const correctAnswers = {
            'q5_1': 'c',
            'q5_2': 'b',
            'q5_3': 'a',
            'q5_4': 'd'
        };

        const feedback = document.getElementById('feedback-q5');
        const selects = document.querySelectorAll('.matching-select');
        const answeredCount = Array.from(selects).filter(select => select.value).length;

        if (answeredCount === 0 || answeredCount < 4) {
            feedback.textContent = 'Please complete all matching pairs.';
            feedback.className = 'question-feedback warning';
            return 0;
        }

        const incorrectMatches = [];
        let allCorrect = true;

        Object.entries(correctAnswers).forEach(([question, answer]) => {
            const select = document.querySelector(`select[name="${question}"]`);
            if (select.value !== answer) {
                allCorrect = false;
                incorrectMatches.push(question.slice(-1));
            }
            select.style.borderColor = select.value === answer ? 'var(--success-color)' : 'var(--error-color)';
        });

        feedback.textContent = allCorrect
            ? 'Correct! All computational thinking concepts are properly matched with their descriptions.'
            : `Incorrect. Please review your matches for concept${incorrectMatches.length > 1 ? 's' : ''} ${incorrectMatches.join(', ')}.`;
        feedback.className = `question-feedback ${allCorrect ? 'success' : 'error'}`;
        return allCorrect ? 1 : 0;
    }

    // disable opsi yg sudah dipilih di no 5
    function updateSelectOptions() {
        const selects = document.querySelectorAll('.matching-select');
        const selectedValues = Array.from(selects)
            .map(select => select.value)
            .filter(value => value !== '');

        selects.forEach(select => {
            Array.from(select.options).forEach(option => {
                if (option.value && option.value !== select.value) {
                    option.disabled = selectedValues.includes(option.value);
                }
            });
        });
        updateProgress();
    }

    document.querySelectorAll('.matching-select').forEach(select => {
        select.addEventListener('change', () => {
            updateSelectOptions();
            const feedback = document.getElementById('feedback-q5');
            feedback.textContent = '';
            feedback.className = 'question-feedback';
        });
    });

    // hasil akhir
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const score = checkQuestion1() + checkQuestion2() + checkQuestion3() +
                     checkQuestion4() + checkQuestion5();
        const percentage = (score / 5) * 100;

        feedback.style.display = 'block';
        feedback.className = 'feedback ' + (percentage >= 60 ? 'success' : 'error');
        feedback.innerHTML = `
            <h3>Assessment Results</h3>
            <p>You scored ${score} out of 5 (${percentage}%)</p>
            <p>${percentage >= 60 ? 'Congratulations! You passed the assessment.' : 'Please review the material and try again.'}</p>
        `;
        feedback.scrollIntoView({ behavior: 'smooth' });
    });

    updateProgress();
});