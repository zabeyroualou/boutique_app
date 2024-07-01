const express = require('express');
const { produit } = require('../models');

const router = express.Router();

// Ajouter un produit
router.post('/', async (req, res) => {
  const { nom, prix, quantite } = req.body;

  try {
    const produit = await produit.create({ nom, prix, quantite });
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create produit' });
  }
});

// Modifier un produit
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prix, quantite } = req.body;

  try {
    const produit = await produit.findByPk(id);

    if (!produit) {
      return res.status(404).json({ error: 'produit not found' });
    }

    produit.nom = nom;
    produit.prix = prix;
    produit.quantite = quantite;

    await produit.save();
    res.json(produit);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update produit' });
  }
});

// Obtenir tous les produits
router.get('/', async (req, res) => {
  try {
    const produits = await produit.findAll();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch produits' });
  }
});

module.exports = router;