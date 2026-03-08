// what happen when click the sign button

document.getElementById('login-btn').addEventListener('click', function (event) {
    // 
 event.preventDefault();

    const userNameInput = document.getElementById('username').value;

    const passwordInput = document.getElementById('password').value;

    if (userNameInput === 'admin' && passwordInput === 'admin123') {

        window.location.href = 'dashboard.html';
    }
    else {
        alert('Enter the valid user name and password')
    }

});
