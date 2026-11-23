import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "profil_sekolah_struktur" ADD COLUMN "photo_id" integer;
  ALTER TABLE "profil_sekolah" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "profil_sekolah" ADD COLUMN "sambutan_photo_id" integer;
  ALTER TABLE "profil_sekolah_struktur" ADD CONSTRAINT "profil_sekolah_struktur_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profil_sekolah" ADD CONSTRAINT "profil_sekolah_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profil_sekolah" ADD CONSTRAINT "profil_sekolah_sambutan_photo_id_media_id_fk" FOREIGN KEY ("sambutan_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "profil_sekolah_struktur_photo_idx" ON "profil_sekolah_struktur" USING btree ("photo_id");
  CREATE INDEX "profil_sekolah_hero_image_idx" ON "profil_sekolah" USING btree ("hero_image_id");
  CREATE INDEX "profil_sekolah_sambutan_photo_idx" ON "profil_sekolah" USING btree ("sambutan_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "profil_sekolah_struktur" DROP CONSTRAINT "profil_sekolah_struktur_photo_id_media_id_fk";
  
  ALTER TABLE "profil_sekolah" DROP CONSTRAINT "profil_sekolah_hero_image_id_media_id_fk";
  
  ALTER TABLE "profil_sekolah" DROP CONSTRAINT "profil_sekolah_sambutan_photo_id_media_id_fk";
  
  DROP INDEX "profil_sekolah_struktur_photo_idx";
  DROP INDEX "profil_sekolah_hero_image_idx";
  DROP INDEX "profil_sekolah_sambutan_photo_idx";
  ALTER TABLE "profil_sekolah_struktur" DROP COLUMN "photo_id";
  ALTER TABLE "profil_sekolah" DROP COLUMN "hero_image_id";
  ALTER TABLE "profil_sekolah" DROP COLUMN "sambutan_photo_id";`)
}
