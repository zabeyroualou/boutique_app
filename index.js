// index.js
const express = require('express');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');
const app = express();
const port = 3000;

app.use(express.json());

// Configurer Sequelize
const sequelize = new Sequelize({
  username: 'postgres',
  password: 'ypostgres',
  database: 'boutique_db',
  host: '127.0.0.1',
  dialect: 'postgres'
});

// Test de la connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connection reussie avec success.');
  })
  .catch(err => {
    console.error('Error de connection à la base de donnée:', err);
  });


app.get('/ordres', async (req, res) => {
  const ordre = await sequelize.models.ordre.findAll({ include: 'produit' });
  res.json(ordre);
});

app.post('/ordres', async (req, res) => {
  const { idProduit, quantite } = req.body;
  const produit = await sequelize.models.produit.findByPk(idProduit);
  if (produit) {
    const prixTotal = produit.prix * quantite;
    const ordre = await sequelize.models.ordre.create({ idProduit, quantite, prixTotal });
    res.json(ordre);
  } else {
    res.status(404).json({ error: 'produit non trouve' });
  }
});

app.get('/categorie', async (req, res) => {
    const catgorie = await sequelize.models.categorie.findAll();
    res.json(catgorie);
});

app.post('/categorie', async (req, res) => {
    const { idProduit, type } = req.body;
    const categorie = await sequelize.models.categorie.create({ idProduit, type });
    res.json(categorie);
});

app.get('/user', async (req, res) => {
    const user = await sequelize.models.user.findAll();
    res.json(user);
});

app.post('/user', async (req, res) => {
    const { nom, email, password} = req.body;
    const user = await sequelize.models.user.create({ nom, email, password });
    res.json(user);
});


// Routes d'authentification
app.use('/auth', authRoutes);

// Exemple de route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});



// Synchroniser les modèles avec la base de données
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});