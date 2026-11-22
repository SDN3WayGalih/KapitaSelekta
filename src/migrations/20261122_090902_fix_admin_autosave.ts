import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "_posts_v_autosave_idx";
  DROP INDEX "_agenda_v_autosave_idx";
  DROP INDEX "_faq_v_autosave_idx";
  DROP INDEX "_galeri_v_autosave_idx";
  DROP INDEX "_testimoni_v_autosave_idx";
  ALTER TABLE "profil_sekolah" ALTER COLUMN "footer_address" SET DEFAULT 'Jln. Desa nagaria No.Kel, Way Galih
  Kec. Tj. Bintang, Kabupaten Lampung Selatan, Lampung 35361';
  ALTER TABLE "_posts_v" DROP COLUMN "autosave";
  ALTER TABLE "_agenda_v" DROP COLUMN "autosave";
  ALTER TABLE "_faq_v" DROP COLUMN "autosave";
  ALTER TABLE "_galeri_v" DROP COLUMN "autosave";
  ALTER TABLE "_testimoni_v" DROP COLUMN "autosave";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "profil_sekolah" ALTER COLUMN "footer_address" SET DEFAULT 'Jl. Pendidikan No. 3, Way Galih
  Kec. Tanjung Bintang, Lampung Selatan';
  ALTER TABLE "_posts_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_agenda_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_galeri_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_faq_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_testimoni_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_agenda_v_autosave_idx" ON "_agenda_v" USING btree ("autosave");
  CREATE INDEX "_galeri_v_autosave_idx" ON "_galeri_v" USING btree ("autosave");
  CREATE INDEX "_faq_v_autosave_idx" ON "_faq_v" USING btree ("autosave");
  CREATE INDEX "_testimoni_v_autosave_idx" ON "_testimoni_v" USING btree ("autosave");`)
}
