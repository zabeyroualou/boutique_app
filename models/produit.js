module.exports = (sequelize, DataTypes) => {
    const Produit = sequelize.define('Produit', {
      nom: DataTypes.STRING,
      prix: DataTypes.DECIMAL,
      quantite: DataTypes.INTEGER
    });
    
    return Produit;
  };