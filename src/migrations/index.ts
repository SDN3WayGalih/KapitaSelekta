import * as migration_20261027_042118_initial_schema from './20261027_042118_initial_schema';
import * as migration_20261105_113342 from './20261105_113342';
import * as migration_20261122_090902_fix_admin_autosave from './20261122_090902_fix_admin_autosave';
import * as migration_20261123_164418_foto_profil_sekolah from './20261123_164418_foto_profil_sekolah';
import * as migration_20261124_122314_tambah_field_sekolah_dan_storage_cloudinary from './20261124_122314_tambah_field_sekolah_dan_storage_cloudinary';

export const migrations = [
  {
    up: migration_20261027_042118_initial_schema.up,
    down: migration_20261027_042118_initial_schema.down,
    name: '20261027_042118_initial_schema',
  },
  {
    up: migration_20261105_113342.up,
    down: migration_20261105_113342.down,
    name: '20261105_113342',
  },
  {
    up: migration_20261122_090902_fix_admin_autosave.up,
    down: migration_20261122_090902_fix_admin_autosave.down,
    name: '20261122_090902_fix_admin_autosave',
  },
  {
    up: migration_20261123_164418_foto_profil_sekolah.up,
    down: migration_20261123_164418_foto_profil_sekolah.down,
    name: '20261123_164418_foto_profil_sekolah',
  },
  {
    up: migration_20261124_122314_tambah_field_sekolah_dan_storage_cloudinary.up,
    down: migration_20261124_122314_tambah_field_sekolah_dan_storage_cloudinary.down,
    name: '20261124_122314_tambah_field_sekolah_dan_storage_cloudinary',
  },
];
