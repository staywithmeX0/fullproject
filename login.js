/*const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbconnection = require('./db');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(express.json()); // รองรับ JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'session',
    keys: ['keys1', 'keys2'], // ควรเปลี่ยนเป็นคีย์ที่ปลอดภัย
    maxAge: 24 * 60 * 60 * 1000 // อายุ session 1 วัน
}));

// ✅ ตั้งค่า View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ Middleware เช็คว่า login อยู่หรือไม่
const ifLoggedIn = (req, res, next) => {
    if (req.session.isloggedIn) {
        return res.redirect('/account');
    }
    next();
};

app.get('/signup', ifLoggedIn, (req, res) => {
    res.render('signup');
});

// Route: Home Page
app.get('/', ifNotLoggedIn, (req, res) => {
    res.redirect('/account');
});

// ✅ Login Route
app.post('/login', ifLoggedIn, [
    body('email').custom(value => {
        return dbconnection.execute('SELECT email FROM signup WHERE email = ?', [value])
            .then(([rows]) => {
                if (rows.length === 1) {
                    return true;
                }
                return Promise.reject('Invalid email');
            });
    }),
    body('pass').trim().notEmpty().withMessage('Password is empty')
], async (req, res) => {
    const validation_result = validationResult(req);
    const { email, pass } = req.body;

    if (!validation_result.isEmpty()) {
        return res.status(400).json({ errors: validation_result.array() });
    }

    try {
        const [rows] = await dbconnection.execute("SELECT * FROM signup WHERE email = ?", [email]);
        
        if (rows.length === 0) {
            return res.status(400).json({ errors: [{ msg: 'Email not found' }] });
        }

        const hashedPassword = rows[0].pass;

        if (!hashedPassword) {
            return res.status(500).json({ errors: [{ msg: 'Server error: Password not found in database' }] });
        }

        const compare_result = await bcrypt.compare(pass, hashedPassword);
        
        if (!compare_result) {
            return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
        }

        req.session.isloggedIn = true;
        req.session.userID = rows[0].id;
        res.redirect('/account');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Account Route
app.get('/account', async (req, res) => {
    if (!req.session.isloggedIn) {
        return res.redirect('/login');
    }

    const userID = req.session.userID;

    try {
        const [rows] = await dbconnection.execute('SELECT user, email FROM signup WHERE id = ?', [userID]);
        if (rows.length === 0) {
            return res.redirect('/login');
        }

        res.render('account', {
            firstname: rows[0].user, // เปลี่ยนจาก firstname เป็น user
            email: rows[0].email
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Logout Route
app.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

// Start Server
app.listen(3000, () => console.log("Server is running on port 3000..."));*/
