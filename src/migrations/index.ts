import * as migration_20261027_042118_initial_schema from './20261027_042118_initial_schema';
import * as migration_20261105_113342 from './20261105_113342';

export const migrations = [
  {
    up: migration_20261027_042118_initial_schema.up,
    down: migration_20261027_042118_initial_schema.down,
    name: '20261027_042118_initial_schema',
  },
  {
    up: migration_20261105_113342.up,
    down: migration_20261105_113342.down,
    name: '20261105_113342'
  },
];
