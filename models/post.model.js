const { DataTypes, Model } = require('sequelize');
const sequelize = require('../src/utils/database');
const User = require('./user.model');

class Post extends Model {
  id;
  title;
  body;
  published;
  authorId;
  createdAt;
  updatedAt;

  otherPublicField;
}

Post.init ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,// this field does not shadow anything. It is fine.
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      length: [ 2, 120 ],
    },
  },
  body: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  timestamps: true,
});

Post.hasOne(User, { foreignKey: 'authorId' })

module.exports = Post;