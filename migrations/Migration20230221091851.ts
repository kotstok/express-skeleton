import { Migration } from '@mikro-orm/migrations';

export class Migration20230221091851 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" varchar(120) not null, "email" varchar(320) not null, "is_active" boolean not null default true, "passwd" varchar(255) not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" serial primary key, "title" varchar(120) not null, "body" varchar(255) null, "published" boolean not null default false, "author_id" int not null, "created_at" varchar(255) not null, "updated_at" varchar(255) not null);');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
  }

}
