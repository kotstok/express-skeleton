const {
  DataTypes,
  Model,
} = require('sequelize');
const sequelize = require('../src/utils/database');

class User extends Model {
  id;
  name;
  email;
  passwd;
  isActive;
  createdAt;
  updatedAt;
  otherPublicField;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {
  sequelize,
  timestamps: true,
});

module.exports = User;
