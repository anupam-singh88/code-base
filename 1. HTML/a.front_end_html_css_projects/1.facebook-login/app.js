console.log('console added')

let username = document.getElementById('username');
let password = document.getElementById('password');
let cpassword = document.getElementById('cpassword');
let submitBtn = document.getElementById('submitBtn');
let usernameCheckbox = document.getElementById('username-checkbox')
let passwordCheckbox = document.getElementById('password-checkbox')
let cpasswordCheckbox = document.getElementById('cpassword-checkbox')


function SubmitEvent(e) {
    e.preventDefault();
    if (username.value == '' || password.value == '') {
        alert('kindly enter data into the input field');
        return false
    }
    if (password.value !== cpassword.value) {
        alert('password not matched!!!')
        return false
    }
    alert('data submitted');
    username.value = '';
    password.value = '';
    cpassword.value = '';
    username.classList.remove('ok')
    usernameCheckbox.style.display = 'none'
    password.classList.remove('ok')
    passwordCheckbox.style.display = 'none'
    cpassword.classList.remove('ok')
    cpasswordCheckbox.style.display = 'none'
}
//com
submitBtn.addEventListener('click', SubmitEvent);

function checkVal(val) {
    if (username.value.length >= 5) {
        username.classList.add('ok')
        // usernameCheckbox.style.display = 'inline'
    }
    if (username.value.length < 5) {
        username.classList.remove('ok')
        usernameCheckbox.style.display = 'none'
    }
    if (password.value.length >= 5) {
        password.classList.add('ok')
        // passwordCheckbox.style.display = 'inline'
    }
    if (password.value.length < 5) {
        password.classList.remove('ok')
        passwordCheckbox.style.display = 'none'
    }
}
function checkPass(val) {
    if (password.value === cpassword.value) {
        cpassword.classList.add('ok')
        // cpasswordCheckbox.style.display = 'inline'

    }
    if (password.value !== cpassword.value) {
        cpassword.classList.remove('ok')
        cpasswordCheckbox.style.display = 'none'

    }

}


//? another way of doing validation by addEventListeners


// //! for key down in username
// username.addEventListener('keydown', function (event) {
//     const key = event.key; // const {key} = event; ES6+
//     if (key === "Backspace" || key === "Delete") {
//         if (username.value.length <= 5) {
//             username.classList.remove('ok')
//             usernameCheckbox.style.display = 'none'

//         }
//         return false; s
//     }
// });
// //! for key down in password
// password.addEventListener('keydown', function (event) {
//     const key = event.key; // const {key} = event; ES6+
//     if (key === "Backspace" || key === "Delete") {
//         if (password.value.length <= 5) {
//             password.classList.remove('ok')
//             passwordCheckbox.style.display = 'none'

//         }
//         return false; s
//     }
// });

// //! for keypress in username and password field
// username.addEventListener('keypress', () => {
//     if (username.value.length >= 5) {
//         username.classList.add('ok')
//         usernameCheckbox.style.display = 'inline'
//     }
// })
// password.addEventListener('keypress', () => {
//     if (password.value.length >= 5) {
//         password.classList.add('ok')
//         passwordCheckbox.style.display = 'inline'
//     }
// })
// cpassword.addEventListener('keypress', () => {
//     console.log('inside')
//     console.log(password.value)
//     console.log(cpassword.value)
//     if (password.value === cpassword.value) {
//         console.log('ture')
//         cpassword.classList.add('ok')
//         return falseca
//     }
// })