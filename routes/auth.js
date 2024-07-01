// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Assurez-vous de modifier le chemin selon votre structure de projet

const router = express.Router();
const secretKey = 'votre_clé_secrète'; // Changez ceci pour une clé secrète sécurisée

// Inscription
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;