import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_profil_sekolah_info_items_kelompok" AS ENUM('informasi', 'legalitas', 'sarana');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  ALTER TABLE "profil_sekolah_info_items" ADD COLUMN IF NOT EXISTS "kelompok" "enum_profil_sekolah_info_items_kelompok" DEFAULT 'informasi';
  ALTER TABLE "profil_sekolah_info_items" ADD COLUMN IF NOT EXISTS "catatan" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "profil_sekolah_info_items" DROP COLUMN "kelompok";
  ALTER TABLE "profil_sekolah_info_items" DROP COLUMN "catatan";
  DROP TYPE "public"."enum_profil_sekolah_info_items_kelompok";`)
}
