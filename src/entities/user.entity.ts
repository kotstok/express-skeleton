import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Unique,
} from '@mikro-orm/core';
import { Post } from './post.entity';

@Entity()
export class User {
  constructor(id?: number) {
    if (id) this.id = id;
  }

  @PrimaryKey()
  @SerializedPrimaryKey()
  public id: number;

  @Property({ length: 120 })
  public name: string;

  @Property({ length: 320 })
  @Unique()
  public email: string;

  @Property({ nullable: false, default: true })
  public isActive: boolean;

  @Property({
    length: 255,
    hidden: true,
  })
  public passwd: string;

  @OneToMany({
    entity: () => Post,
    mappedBy: 'author',
    orphanRemoval: true,
    hidden: true,
  })
  posts = new Collection<Post>(this);

  @Property()
  createdAt? = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt? = new Date();
}
