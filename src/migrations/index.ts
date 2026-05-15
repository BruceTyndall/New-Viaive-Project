import * as migration_20260515_031408_init from './20260515_031408_init';

export const migrations = [
  {
    up: migration_20260515_031408_init.up,
    down: migration_20260515_031408_init.down,
    name: '20260515_031408_init'
  },
];
