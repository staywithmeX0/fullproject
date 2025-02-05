let username = null;
const profilePic = "./img/profile.jpg";

document.addEventListener("DOMContentLoaded", function () {
    let userData = localStorage.getItem("userData");

    if (userData) {
        userData = JSON.parse(userData);
        username = userData.firstname || "ผู้ใช้ทั่วไป";

        document.getElementById("user-firstname").textContent = username;
        document.getElementById("user-email").textContent = userData.email || "N/A";

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
    window.location.href = "index.html";
});

function postComment(parent = null) {
    alert("กรุณาเเสดงความคิดเห็นอย่างสุภาพเพื่อรีวิวที่ดีเเละมีประโยชน์หากความคิดเห็นที่เขียนมีการให้ข้อมูลที่เป็นเท็จหรือโจมตีร้านทางเเอดมินขออณุญาติทำการลบความคิดเห็น");

    if (!username) {
        alert("กรุณาล็อกอินก่อนคอมเมนต์");
        return;
    }
    
    let commentText = parent ? document.getElementById("reply-" + parent).value : document.getElementById("comment").value;
    let now = new Date();
    let timestamp = now.toLocaleString("th-TH");

    if (!commentText) {
        alert("กรุณากรอกคอมเมนต์");
        return;
    }

    addComment(username, profilePic, commentText, timestamp, parent);
}

function addComment(username, profilePic, text, time, parent) {
    let commentSection = parent ? document.getElementById("replies-" + parent) : document.getElementById("comments");
    if (!commentSection) {
        let parentComment = document.getElementById(parent);
        commentSection = document.createElement("div");
        commentSection.id = "replies-" + parent;
        commentSection.classList.add("replies");
        parentComment.appendChild(commentSection);
    }

    let newComment = document.createElement("div");
    newComment.classList.add("comment");
    let commentId = "comment-" + Math.random().toString(36).substr(2, 9);
    newComment.id = commentId;
    
    newComment.innerHTML = `
        <div class="comment-header">
            <img src="${profilePic}" class="profile-pic" alt="Profile Picture">
            <strong>${username}</strong>
        </div>
        <p>${text}</p>
        <div class='meta'>${time}</div> 
        <div class='actions'>
            <span class='like-btn' onclick='likeComment("${commentId}")'>&#9829;<span id='likes-${commentId}'>0</span></span>
            <button onclick='toggleReplyBox("${commentId}")'>ตอบกลับ</button>
            <div id='reply-box-${commentId}' class='reply-box'>
                <textarea id='reply-${commentId}' placeholder='เขียนตอบกลับ...'></textarea>
                <button onclick='postComment("${commentId}")'>โพสต์</button>
            </div>
        </div>
    `;

    commentSection.appendChild(newComment);
    
    if (parent) {
        document.getElementById("reply-" + parent).value = "";
    } else {
        document.getElementById("comment").value = "";
    }
}

function likeComment(commentId) {
    let likeCount = document.getElementById("likes-" + commentId);
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function toggleReplyBox(commentId) {
    let replyBox = document.getElementById("reply-box-" + commentId);
    replyBox.style.display = replyBox.style.display === "none" || replyBox.style.display === "" ? "block" : "none";
}
