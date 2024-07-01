module.exports = (sequelize, DataTypes) => {
    const Ordre = sequelize.define('Ordre', {
      IdProduit: DataTypes.INTEGER,
      type: DataTypes.STRING,
      prixTotal: DataTypes.DECIMAL
    });
  
    Ordre.associate = function(models) {
        Ordre.belongsTo(models.Produit, { foreignKey: 'IdProduit' });
    };
  
    return Ordre;
  };