import * as migration_20260515_031408_init from './20260515_031408_init';
import * as migration_20260515_191024_figma_schema from './20260515_191024_figma_schema';
import * as migration_20260515_200622_phase_2_schema_closeout from './20260515_200622_phase_2_schema_closeout';

export const migrations = [
  {
    up: migration_20260515_031408_init.up,
    down: migration_20260515_031408_init.down,
    name: '20260515_031408_init',
  },
  {
    up: migration_20260515_191024_figma_schema.up,
    down: migration_20260515_191024_figma_schema.down,
    name: '20260515_191024_figma_schema',
  },
  {
    up: migration_20260515_200622_phase_2_schema_closeout.up,
    down: migration_20260515_200622_phase_2_schema_closeout.down,
    name: '20260515_200622_phase_2_schema_closeout'
  },
];
