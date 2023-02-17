import { DataTypes, Model } from 'sequelize';
import sequelize from '../src/utils/database';

class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public passwd: string;
  public createdAt: string;
  public updatedAt: string;
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

export default User;
