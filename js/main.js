
// Nav show and hide + icon change
const iconMenuClosed = document.querySelector('.icon-menu-closed');
iconMenuClosed.addEventListener('click',function(){
    const navBar = document.querySelector('.navbar-nav');

    const iconMenuClosedInner = iconMenuClosed.children[0]

    navBar.classList.toggle('navbar-visible');
    if (navBar.classList.contains('navbar-visible')) {
        iconMenuClosedInner.classList.remove('fa-bars');
        iconMenuClosedInner.classList.add('fa-times')
        console.log(iconMenuClosedInner)
    } else {
        iconMenuClosedInner.classList.remove('fa-times');
        iconMenuClosedInner.classList.add('fa-bars');
    }
});

const formFields = document.querySelectorAll('.news-form-input');

const signUp = document.querySelector('.signup');
signUp.addEventListener('submit',function(event) {
    event.preventDefault();

    errors = 0;
   

    // Check if all form fields are filled in
    for (let i = 0; i < formFields.length; i++) {
        if(formFields[i].value.trim() === '') {
            formFields[i].classList.add('form-border-red');
            
            errors += 1;

            // Display error msg, make borders red
            document.querySelector('.msg-to-user').innerText = "Please fill in all required fields";
            document.querySelector('.msg-to-user').classList.add('msg-to-user-red');

            // Make form fields more interactive - after trying to submit wrong filled form where empty fields have red border, when focused on input - make its' border white. When input loose focus and its; filled in - make border white. When loose focus and value is empty - make border red again.
            // formFields[i].addEventListener('focus',function() {
            //     formFields[i].classList.remove('form-border-red');
            // })
    
            // formFields[i].addEventListener('blur',function() {
            //     if(formFields[i].value.trim() === '') {
            //         formFields[i].classList.add('form-border-red');
            //     }
            // })

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
        document.querySelector('.msg-to-user').innerText = `Thank you ${data.appointment.name}. You have been successfully signed up to our newsletter.`;
        for (let i = 0; i < formFields.length; i++) {
            formFields[i].value = '';
            formFields[i].classList.remove('form-border-red');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
 
}