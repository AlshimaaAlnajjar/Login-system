//=========== sign-up ============//
let form2 = document.getElementById("form2");
let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let userPassword2 = document.getElementById("userPassword2");
let users = JSON.parse(localStorage.getItem('users')) || [];

if (form2) {
    form2.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateName() && validateEmail() && validatePassword() && validatePassword2()) {
            var userData = {
                name: userName.value.trim(),
                email: userEmail.value.trim(),
                password: userPassword.value.trim(),
            };
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = '../pages/index.html';
        }
    });

    userName.addEventListener("input", validateName);
    function validateName() {
        let nameMessage = document.getElementById('nameMessage');
        var regex = /^[A-Za-z][A-Za-z0-9]{2,}$/;
        return commonValidator(userName, nameMessage, regex);
    }

    userEmail.addEventListener("input", validateEmail);
    function validateEmail() {
        let emailMessage = document.getElementById('emailMessage');
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (users.some(user => user.email === userEmail.value.trim())) {
            emailMessage.textContent = "This email is already registered.";
            emailMessage.classList.remove('d-none');
            return false;
        }

        return commonValidator(userEmail, emailMessage, regex);
    }

    userPassword.addEventListener("input", validatePassword);
    function validatePassword() {
        let passwordMessage = document.getElementById('passwordMessage');
        let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\d\s]).{4,25}$/;
        return commonValidator(userPassword, passwordMessage, regex);
    }

    userPassword2.addEventListener("input", validatePassword2);
    function validatePassword2() {
        let password2Message = document.getElementById('password2Message');
        if (userPassword2.value.trim() === userPassword.value.trim()) {
            password2Message.classList.add('d-none');
            return true;
        } else {
            password2Message.classList.remove('d-none');
            return false;
        }
    }
}

//=========== sign-in ============//
let form1 = document.getElementById("form1");
let email = document.getElementById("email");
let password = document.getElementById("password");
let diplayName;

if (form1) { //add if conditional to handle Cannot read properties of null error            
    form1.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateExistingEmail() && validateExistingPassword()) {
            let userIndex = users.findIndex(user => user.email === email.value.trim());
            localStorage.setItem('signedInUserIndex', userIndex);

            window.location.href = '../pages/whoWatch.html';
        }
    });

    email.addEventListener("input", validateExistingEmail);
    function validateExistingEmail() {
        let emailMessage = document.getElementById('emailMes');
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!commonValidator(email, emailMessage, regex)) {
            return false;
        }

        let user = users.find(user => user.email === email.value.trim());
        if (!user) {
            emailMessage.textContent = "Email not found.";
            emailMessage.classList.remove('d-none');
            return false;
        }
        
        emailMessage.classList.add('d-none');
        return true;
    }

    password.addEventListener("input", validateExistingPassword);
    function validateExistingPassword() {
        let passwordMessage = document.getElementById('passwordMes');
        let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\d\s]).{4,25}$/;

        if (!commonValidator(password, passwordMessage, regex)) {
            return false;
        }

        let user = users.find(user => user.email === email.value.trim());
        if (user && user.password !== password.value.trim()) {
            passwordMessage.textContent = "Incorrect password.";
            passwordMessage.classList.remove('d-none');
            return false;
        }
        passwordMessage.classList.add('d-none');
        return true;
    }
}

function commonValidator(inputElement, messageElement, regex) {
    if (regex.test(inputElement.value.trim())) {
        messageElement.classList.add('d-none');
        return true;
    } else {
        messageElement.classList.remove('d-none');
        return false;
    }
}

//=========== username in who watch page ============//
let userNameDisplay = document.getElementById("userNameDisplay");
let signedInUserIndex = localStorage.getItem('signedInUserIndex');

if (signedInUserIndex !== null) {
    let user = users[parseInt(signedInUserIndex)];
    if (user) {
        userNameDisplay.textContent = user.name;
    }
} 

    
