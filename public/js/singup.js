document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    let userData = {
        firstname: username,
        email: email,
        password: password,
        profileImage: "./img/profile.jpg" 
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Registration Successful!");
    window.location.href = "account.html";
});