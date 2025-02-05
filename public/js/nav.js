document.addEventListener("DOMContentLoaded", function () {
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            // รอให้เนื้อหาโหลดเข้ามาก่อน แล้วค่อยเรียก setupNav()
            setTimeout(setupNav, 100);  
        })
        .catch(error => console.error("Error loading navigation:", error));
});

function setupNav() {
    let userData = localStorage.getItem("userData");

    // ตรวจสอบว่าเมนูมีอยู่จริงหรือไม่ก่อนทำงาน
    const loginMenu = document.getElementById("loginMenu");
    const accountMenu = document.getElementById("accountMenu");
    const logoutButton = document.getElementById("logout");

    if (!loginMenu || !accountMenu) {
        console.error("Navigation elements not found!");
        return;
    }

    if (userData) {
        userData = JSON.parse(userData);
        loginMenu.style.display = "none";   // ซ่อนเมนู Login / Sign up
        accountMenu.style.display = "block"; // แสดงเมนู Account
    } else {
        loginMenu.style.display = "block";   // แสดงเมนู Login / Sign up
        accountMenu.style.display = "none";  // ซ่อนเมนู Account
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("userData");
            alert("You have been logged out!");
            window.location.href = "login.html";
        });
    }
}
