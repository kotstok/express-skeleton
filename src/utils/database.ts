import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import Config from '../mikro-orm.config';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

export const DbConnect = async () => {
  DI.orm = await MikroORM.init(Config);
  DI.em = DI.orm.em;

  return DI.orm;
};
