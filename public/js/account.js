document.addEventListener("DOMContentLoaded", function () {
    let userData = localStorage.getItem("userData");

    if (userData) {
        userData = JSON.parse(userData);
        

        document.getElementById("user-firstname").textContent = userData.firstname || "N/A";
        document.getElementById("user-email").textContent = userData.email || "N/A";
        document.getElementById("profile-image").src = "./img/profile.jpg"; 


        document.getElementById("loginMenu").style.display = "none";
        document.getElementById("accountMenu").style.display = "block";
    } else {

        document.getElementById("loginMenu").style.display = "block";
        document.getElementById("accountMenu").style.display = "none";
    }
});

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("userData");
    alert("You have been logged out!");


    document.getElementById("loginMenu").style.display = "block";
    document.getElementById("accountMenu").style.display = "none";

    window.location.href = "index.html";
});