## สมาชิกกลุ่ม  
- **66021948** นาย ภูธเนศ เจริญทรัพย์  
- **66022039** นาย รพีภัทร แสงท้าว


## เตรียมฐานข้อมูล
ตั้งค่าฐานข้อมูล
-Hostname/IP: localhost
-User:  root
-ไม่ต้องกำหนดPasswword
-จากนั้นรันคำสั่ง (ตรงช่องQuery)

CREATE TABLE signup (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pass VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


## Install  
1. **Install package**  
   ```sh
   npm i
2. **run website**
   ```sh
   npm run dev
3. **open web browser**
   ```sh
   localhost:3000
