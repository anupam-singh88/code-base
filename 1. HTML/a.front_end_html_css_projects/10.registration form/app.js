let fName = document.getElementById('fName');
let uName = document.getElementById('uName');
let uEmail = document.getElementById('uEmail');
let phNo = document.getElementById('phNo');
let password = document.getElementById('password');
let cPassword = document.getElementById('cPassword');
let checkbox = document.getElementsByClassName('checkbox');
let submitBtn = document.getElementById('submitBtn');

let genderMale = document.getElementById('male');
let genderfeMale = document.getElementById('female');
let genderNone = document.getElementById('none');
// console.log(genderMale)

function checkVal() {
    // console.log(uName.nextElementSibling.nextElementSibling)
    if (fName.value.length >= 5) {
        fName.nextElementSibling.nextElementSibling.classList.add("chkVisible")
        fName.nextElementSibling.classList.remove("wrongVis")
        // return true
    }
    if (fName.value.length <= 5) {
        fName.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
        // fName.nextElementSibling.classList.add("wrongVis")

        // return true
    }

    if (uName.value.length >= 4) {
        uName.nextElementSibling.nextElementSibling.classList.add("chkVisible")
        uName.nextElementSibling.classList.remove("wrongVis")
        // return true

    }
    if (uName.value.length <= 4) {
        uName.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
        // uName.nextElementSibling.classList.add("wrongVis")
        // return true

    }

    if (phNo.value.length >= 5) {
        phNo.nextElementSibling.nextElementSibling.classList.add("chkVisible")
        phNo.nextElementSibling.classList.remove("wrongVis")

    }
    if (phNo.value.length <= 5) {
        phNo.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
        // phNo.nextElementSibling.classList.add("wrongVis")
        // return false

    }


    // if (password.value.length >= 3) {
    //     password.nextElementSibling.nextElementSibling.classList.add("chkVisible")
    //     password.nextElementSibling.classList.remove("wrongVis")

    // }
    // if (password.value.length <= 3) {
    //     password.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    //     // password.nextElementSibling.classList.add("wrongVis")
    //     // return false

    // }
}
function comparePassword() {
    if (cPassword.value === password.value) {
        cPassword.nextElementSibling.nextElementSibling.classList.add("chkVisible")
        cPassword.nextElementSibling.classList.remove("wrongVis")

    } else {
        cPassword.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
        cPassword.nextElementSibling.classList.add("wrongVis")

        // alert('Password not matched!!!')
    }
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    checkValues();
    if (validateEmail() && checkValues() && validatePass()) {
        alert('data submitted')
        clearValues();
        return true
    }
    else {
        alert('Please fill all the fields correctly!!! Password must contain atleast one special ,one uppercase,one letter and one numeric value');
    }

    // alert('Please fill all the fields correctly!!! Password must contain atleast one special ,one uppercase,one letter and one numeric value');


})
function clearValues() {
    fName.value = '';
    uName.value = '';
    uEmail.value = '';
    phNo.value = '';
    password.value = ''
    cPassword.value = ''
    fName.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    uName.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    uEmail.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    phNo.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    password.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    cPassword.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
    genderMale.checked = false;
    genderfeMale.checked = false;
    genderNone.checked = false;
}

function validateEmail() {
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    let result = regex.test(uEmail.value);
    if (result) {
        uEmail.nextElementSibling.nextElementSibling.classList.add("chkVisible")
        uEmail.nextElementSibling.classList.remove("wrongVis")
        return true

    } else {
        uEmail.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
        uEmail.nextElementSibling.classList.add("wrongVis")
        return false;
    }

}
function validatePass() {
    let regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    let result = regex.test(password.value);
    if (result) {
        password.nextElementSibling.nextElementSibling.classList.add("chkVisible")
        password.nextElementSibling.classList.remove("wrongVis")
        // console.log('password correct')
        return true

    } else {
        password.nextElementSibling.nextElementSibling.classList.remove("chkVisible")
        password.nextElementSibling.classList.add("wrongVis")
        // console.log('password incorrect')
        return false;
    }

}

function checkValues() {
    if (fName.value === '') {
        fName.nextElementSibling.classList.add("wrongVis")
        // alert('Kindly Enter First Name')

        return false;
    }
    if (uName.value === '') {
        uName.nextElementSibling.classList.add("wrongVis")
        // alert('Kindly Enter User Name')

        return false;
    }
    if (uEmail.value === '') {
        uEmail.nextElementSibling.classList.add("wrongVis")
        // alert('Kindly Enter Email')

        return false;
    }
    if (phNo.value === '') {
        phNo.nextElementSibling.classList.add("wrongVis")
        // alert('Kindly Enter Phone Number')

        return false;
    }
    if (password.value === '') {
        password.nextElementSibling.classList.add("wrongVis")
        // alert('Kindly Enter Password')

        return false;
    }
    if (cPassword.value === '') {
        cPassword.nextElementSibling.classList.add("wrongVis")
        // alert('Kindly enter the confirm password')

        return false;
    }
    if (cPassword.value !== password.value) {
        cPassword.nextElementSibling.classList.add("wrongVis")
        // alert('Password Not Matched!!')

        return false;
    }

    if (genderMale.checked || genderfeMale.checked || genderNone.checked) {
        return true
    } else {
        // alert('select gender')
        return false
    }

}



function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
    }
}