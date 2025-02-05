const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbconnection = require('./db');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Cookie-session setup
app.use(cookieSession({
    name: 'session',
    keys: ['keys1', 'keys2'],
    maxAge: 24 * 60 * 60 * 1000 // 1 วัน
}));




// Middleware ตรวจสอบสถานะผู้ใช้
const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.isloggedIn) {
        return res.redirect('/signup');
    }
    next();
};

const ifLoggedIn = (req, res, next) => {
    if (req.session.isloggedIn) {
        return res.redirect('/account');
    }
    next();
};



app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname,'contact.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/store1.html', (req, res) => {
    res.sendFile(path.join(__dirname,'store1.html'));
});

app.get('/store2.html', (req, res) => {
    res.sendFile(path.join(__dirname,'store2.html'));
});

app.get('/store3.html', (req, res) => {
    res.sendFile(path.join(__dirname,'store3.html'));
});

app.get('/store4.html', (req, res) => {
    res.sendFile(path.join(__dirname,'store4.html'));
});

app.get('/store5.html', (req, res) => {
    res.sendFile(path.join(__dirname,'store5.html'));
});

app.get('/store6.html', (req, res) => {
    res.sendFile(path.join(__dirname,'store6.html'));
});


// Route: Signup Page
app.get('/signup', ifLoggedIn, (req, res) => {
    res.render('signup');
});

// Route: Home Page
app.get('/', ifNotLoggedIn, (req, res) => {
    res.redirect('/account');
});

// Route: Signup Process
app.post('/signup', ifLoggedIn, [
    body('email').isEmail().withMessage('Invalid email').custom(value => {
        return dbconnection.execute('SELECT email FROM signup WHERE email = ?', [value])
            .then(([rows]) => {
                if (rows.length > 0) {
                    return Promise.reject('This email is already in use');
                }
                return true;
            });
    }),
    body('user').trim().notEmpty().withMessage('Username is empty'),
    body('pass').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res) => {
    const validation_result = validationResult(req);
    const { user, pass, email } = req.body;

    if (validation_result.isEmpty()) {
        bcrypt.hash(pass, 12)
            .then(hash_pass => {
                return dbconnection.execute("INSERT INTO signup (user, pass, email) VALUES(?,?,?)", [user, hash_pass, email]);
            })
            .then(() => {
                res.render('login', {
                    success: 'Signup successful. Now you can login',
                    isloggedin: false
                });
            })
            .catch(err => console.error(err));
    } else {
        res.render('signup', {
            register_error: validation_result.array().map(error => error.msg),
            old_data: req.body
        });
    }
});

// Route: Login Process
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
app.listen(3000, () => console.log("Server is running on port 3000..."));
