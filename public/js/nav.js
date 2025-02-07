document.addEventListener("DOMContentLoaded", function () {
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            setupNav();
        })
        .catch(error => console.error("Error loading navigation:", error));
});

function setupNav() {
    let userData = localStorage.getItem("userData");

    if (userData) {
        userData = JSON.parse(userData);

        document.getElementById("loginMenu").style.display = "none";
        document.getElementById("accountMenu").style.display = "block";
    } else {
        document.getElementById("loginMenu").style.display = "block";
        document.getElementById("accountMenu").style.display = "none";
    }

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("userData");
        alert("You have been logged out!");
        window.location.href = "login.html";
    });
}
