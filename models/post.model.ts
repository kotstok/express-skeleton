import { DataTypes, Model } from 'sequelize';
import sequelize from '../src/utils/database';
import User from './user.model';

class Post extends Model {
  public id: number;
  public title: string;
  public body: string;
  public published: boolean;
  public authorId: number;
  public createdAt: string;
  public updatedAt: string;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,// this field does not shadow anything. It is fine.
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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

User.hasOne(Post, { foreignKey: 'authorId' });

export default Post;
