import { Sequelize } from 'sequelize-typescript';

import config from '@/main/database/config';
import * as models from '@/main/database/models';
import * as migrations from '@/main/database/migrations';
import { serial } from '@/main/utils/PromiseUtils';

const sequelize = new Sequelize({
  ...config,
  models: Object.values(models),
  dialect: 'sqlite',
});

const migrateUp = async () => {
  const lastMigrationTimestamp = await models.Setting.findByPk('lastMigrationTimestamp');

  await serial(Object
    .keys(migrations)
    .filter((migration) => new Date(migration.replace(/migration([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3')).getTime() >= parseInt(lastMigrationTimestamp!.value, 10))
    .map((migration) => () => {
      const timestamp = new Date(migration.replace(/migration([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3')).getTime();
      return migrations[migration]()
        .then(() => {
          lastMigrationTimestamp!.value = timestamp.toString();
          return lastMigrationTimestamp!.save();
        });
    }));
};

export { sequelize, migrateUp };
