import { User } from './user.entity';
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';

@Entity()
export class Post {
  @PrimaryKey()
  @SerializedPrimaryKey()
  public id: number;

  @Property({ length: 120 })
  public title: string;

  @Property({ nullable: true })
  public body: string;

  @Property({ nullable: false, default: false })
  public published?: boolean;

  @ManyToOne(() => User, { nullable: false })
  author: User;

  @Property()
  createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt? = new Date();
}
