import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "ppdb"
      ADD COLUMN IF NOT EXISTS "official_url" varchar DEFAULT 'https://sd.spmblampung.com';
    ALTER TABLE "ppdb"
      ALTER COLUMN "official_url" SET DEFAULT 'https://sd.spmblampung.com';

    CREATE TABLE IF NOT EXISTS "profil_sekolah_featured_programs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "profil_sekolah_extracurriculars" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "schedule" varchar NOT NULL
    );

    ALTER TABLE "profil_sekolah" ADD COLUMN IF NOT EXISTS "map_embed_url" varchar;
    ALTER TABLE "profil_sekolah" ADD COLUMN IF NOT EXISTS "office_hours" varchar;
    ALTER TABLE "profil_sekolah" ADD COLUMN IF NOT EXISTS "whatsapp_number" varchar;
    ALTER TABLE "profil_sekolah" ADD COLUMN IF NOT EXISTS "ppdb_url" varchar;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profil_sekolah_featured_programs_parent_id_fk') THEN
        ALTER TABLE "profil_sekolah_featured_programs"
          ADD CONSTRAINT "profil_sekolah_featured_programs_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profil_sekolah_extracurriculars_parent_id_fk') THEN
        ALTER TABLE "profil_sekolah_extracurriculars"
          ADD CONSTRAINT "profil_sekolah_extracurriculars_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id")
          ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "profil_sekolah_featured_programs_order_idx"
      ON "profil_sekolah_featured_programs" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "profil_sekolah_featured_programs_parent_id_idx"
      ON "profil_sekolah_featured_programs" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "profil_sekolah_extracurriculars_order_idx"
      ON "profil_sekolah_extracurriculars" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "profil_sekolah_extracurriculars_parent_id_idx"
      ON "profil_sekolah_extracurriculars" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "profil_sekolah_featured_programs" CASCADE;
    DROP TABLE IF EXISTS "profil_sekolah_extracurriculars" CASCADE;
    ALTER TABLE "ppdb" DROP COLUMN IF EXISTS "official_url";
    ALTER TABLE "profil_sekolah" DROP COLUMN IF EXISTS "map_embed_url";
    ALTER TABLE "profil_sekolah" DROP COLUMN IF EXISTS "office_hours";
    ALTER TABLE "profil_sekolah" DROP COLUMN IF EXISTS "whatsapp_number";
    ALTER TABLE "profil_sekolah" DROP COLUMN IF EXISTS "ppdb_url";
  `)
}
