module.exports = (sequelize, DataTypes) => {
    const Ordre = sequelize.define('Ordre', {
      IdProduit: DataTypes.INTEGER,
      quantite: DataTypes.INTEGER,
      prixTotal: DataTypes.DECIMAL
    });
  
    Ordre.associate = function(models) {
        Ordre.belongsTo(models.Produit, { foreignKey: 'IdProduit' });
    };
  
    return Ordre;
  };