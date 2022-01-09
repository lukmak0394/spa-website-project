
// Nav show and hide + icon change
const iconMenuClosed = document.querySelector('.icon-menu-closed');
iconMenuClosed.addEventListener('click',function(){
    const navBar = document.querySelector('.navbar-nav');

    const iconMenuClosedInner = iconMenuClosed.children[0]

    navBar.classList.toggle('navbar-visible');
    if (navBar.classList.contains('navbar-visible')) {
        iconMenuClosedInner.classList.remove('fa-bars');
        iconMenuClosedInner.classList.add('fa-times')
    } else {
        iconMenuClosedInner.classList.remove('fa-times');
        iconMenuClosedInner.classList.add('fa-bars');
    }
});

const formFields = document.querySelectorAll('.news-form-input');

// Funciton removing red border when specific form field get focus
function actLikeNormal(event) {
    for (let i = 0; i < formFields.length; i++) {
        event.target.classList.remove('form-border-red');
    }
}

// Function adding red border when specific form field looses focus and its' value is blank
function actLikeError(event) {
    for (let i = 0; i < formFields.length; i++) {
        if(event.target.value.trim() === '') {
            event.target.classList.add('form-border-red');
        }
    }
}
// In both of functions above iteraded throug all form fields, hoverver used event.target cause i'd like to add or remove border to specific field, not to all fields.

const signUp = document.querySelector('.signup');
signUp.addEventListener('submit',function(event) {
    event.preventDefault();

    errors = 0;
   
    // Check if all form fields are filled in
    for (let i = 0; i < formFields.length; i++) {
        // Added event listener on each form field
        formFields[i].addEventListener('focus',actLikeNormal);
        formFields[i].addEventListener('blur',actLikeError);

        if(formFields[i].value.trim() === '') {
            formFields[i].classList.add('form-border-red');
            
            errors += 1;

            // Display error msg, make borders red
            document.querySelector('.msg-to-user').innerText = "Please fill in all required fields";
            document.querySelector('.msg-to-user').classList.add('msg-to-user-red');
            
        }
    }
    if (errors === 0) {
        sendData();
        document.querySelector('.msg-to-user').classList.remove('msg-to-user-red');
    }
    
});


function sendData() {

    const data = { 
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        service: document.querySelector('#service').value,
        phone: document.querySelector('#phone').value,
        date: document.querySelector('#date').value,
        time: document.querySelector('#time').value,
        msg: document.querySelector('#msg').value
    };

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
        // Show msg informing that user have been signed up to newsletter
        document.querySelector('.msg-to-user').innerText = `Thank you ${data.appointment.name}. You have been appointed successfully.`;
        for (let i = 0; i < formFields.length; i++) {
            // Set value of each field to blank
            formFields[i].value = '';
            // Remove red border of each field
            formFields[i].classList.remove('form-border-red');
            // Remove event listeners
            formFields[i].removeEventListener('focus',actLikeNormal);
            formFields[i].removeEventListener('blur',actLikeError);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}