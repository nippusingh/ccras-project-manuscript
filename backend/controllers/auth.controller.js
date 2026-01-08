
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, hashedPassword, role]
    );
    
    res.status(201).json({ 
      message: 'User created successfully', 
      userId: result.rows[0].id 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'User registration failed. Email might already exist.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'ccras_secret_key',
      { expiresIn: '8h' }
    );

    res.status(200).json({
      token,
      userId: user.id,
      role: user.role,
      name: user.name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login process encountered an error.' });
  }
};
