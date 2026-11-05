import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_post_type" AS ENUM('berita', 'prestasi', 'pengumuman');
  CREATE TYPE "public"."enum__posts_v_version_post_type" AS ENUM('berita', 'prestasi', 'pengumuman');
  CREATE TYPE "public"."enum_agenda_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__agenda_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faq_category" AS ENUM('ppdb', 'umum');
  CREATE TYPE "public"."enum_faq_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faq_v_version_category" AS ENUM('ppdb', 'umum');
  CREATE TYPE "public"."enum__faq_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_galeri_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__galeri_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimoni_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__testimoni_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "agenda" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" timestamp(3) with time zone,
  	"time" varchar,
  	"location" varchar,
  	"description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_agenda_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_agenda_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_time" varchar,
  	"version_location" varchar,
  	"version_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__agenda_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"category" "enum_faq_category" DEFAULT 'ppdb',
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faq_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_faq_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_answer" varchar,
  	"version_category" "enum__faq_v_version_category" DEFAULT 'ppdb',
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faq_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "galeri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_galeri_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_galeri_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_image_id" integer,
  	"version_category" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__galeri_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "testimoni" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"relation" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_testimoni_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_testimoni_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_quote" varchar,
  	"version_name" varchar,
  	"version_relation" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__testimoni_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "profil_sekolah_misi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"misi_item" varchar NOT NULL
  );
  
  CREATE TABLE "profil_sekolah_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "profil_sekolah_struktur" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"position" varchar NOT NULL
  );
  
  CREATE TABLE "profil_sekolah_stat_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "profil_sekolah_badge_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "profil_sekolah" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'Selamat Datang di Website Resmi',
  	"hero_title" varchar DEFAULT 'SDN 3 Way Galih' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'Mencetak Generasi Cerdas & Berkarakter',
  	"hero_description" varchar DEFAULT 'Sekolah dasar negeri yang menghadirkan lingkungan belajar yang aman, menyenangkan, dan penuh prestasi untuk putra-putri Anda.',
  	"topbar_phone" varchar DEFAULT '(0721) 123456',
  	"topbar_email" varchar DEFAULT 'info@sdn3waygalih.sch.id',
  	"footer_address" varchar DEFAULT 'Jl. Pendidikan No. 3, Way Galih
  Kec. Tanjung Bintang, Lampung Selatan',
  	"footer_tagline" varchar DEFAULT 'Mewujudkan peserta didik yang cerdas, berkarakter, dan berakhlak mulia.',
  	"sambutan_quote" varchar,
  	"sambutan_name" varchar,
  	"sambutan_title" varchar DEFAULT 'Kepala SDN 3 Way Galih',
  	"visi" varchar,
  	"sejarah" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ppdb_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "ppdb_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "ppdb_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"requirement" varchar NOT NULL
  );
  
  CREATE TABLE "ppdb" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"academic_year" varchar DEFAULT '2026/2027' NOT NULL,
  	"banner_title" varchar DEFAULT 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027 Telah Dibuka!',
  	"banner_description" varchar DEFAULT 'Daftarkan putra-putri Anda sekarang. Kuota terbatas, pendaftaran gratis dan mudah.',
  	"registration_form_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "posts" ADD COLUMN "post_type" "enum_posts_post_type" DEFAULT 'berita';
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_post_type" "enum__posts_v_version_post_type" DEFAULT 'berita';
  ALTER TABLE "_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "agenda_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faq_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "galeri_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimoni_id" integer;
  ALTER TABLE "_agenda_v" ADD CONSTRAINT "_agenda_v_parent_id_agenda_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."agenda"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faq_v" ADD CONSTRAINT "_faq_v_parent_id_faq_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faq"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galeri" ADD CONSTRAINT "galeri_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galeri_v" ADD CONSTRAINT "_galeri_v_parent_id_galeri_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."galeri"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_galeri_v" ADD CONSTRAINT "_galeri_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_testimoni_v" ADD CONSTRAINT "_testimoni_v_parent_id_testimoni_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimoni"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profil_sekolah_misi" ADD CONSTRAINT "profil_sekolah_misi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_info_items" ADD CONSTRAINT "profil_sekolah_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_struktur" ADD CONSTRAINT "profil_sekolah_struktur_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_stat_items" ADD CONSTRAINT "profil_sekolah_stat_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profil_sekolah_badge_items" ADD CONSTRAINT "profil_sekolah_badge_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profil_sekolah"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ppdb_steps" ADD CONSTRAINT "ppdb_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ppdb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ppdb_timeline" ADD CONSTRAINT "ppdb_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ppdb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ppdb_requirements" ADD CONSTRAINT "ppdb_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ppdb"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ppdb" ADD CONSTRAINT "ppdb_registration_form_id_media_id_fk" FOREIGN KEY ("registration_form_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "agenda_updated_at_idx" ON "agenda" USING btree ("updated_at");
  CREATE INDEX "agenda_created_at_idx" ON "agenda" USING btree ("created_at");
  CREATE INDEX "agenda__status_idx" ON "agenda" USING btree ("_status");
  CREATE INDEX "_agenda_v_parent_idx" ON "_agenda_v" USING btree ("parent_id");
  CREATE INDEX "_agenda_v_version_version_updated_at_idx" ON "_agenda_v" USING btree ("version_updated_at");
  CREATE INDEX "_agenda_v_version_version_created_at_idx" ON "_agenda_v" USING btree ("version_created_at");
  CREATE INDEX "_agenda_v_version_version__status_idx" ON "_agenda_v" USING btree ("version__status");
  CREATE INDEX "_agenda_v_created_at_idx" ON "_agenda_v" USING btree ("created_at");
  CREATE INDEX "_agenda_v_updated_at_idx" ON "_agenda_v" USING btree ("updated_at");
  CREATE INDEX "_agenda_v_latest_idx" ON "_agenda_v" USING btree ("latest");
  CREATE INDEX "_agenda_v_autosave_idx" ON "_agenda_v" USING btree ("autosave");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "faq__status_idx" ON "faq" USING btree ("_status");
  CREATE INDEX "_faq_v_parent_idx" ON "_faq_v" USING btree ("parent_id");
  CREATE INDEX "_faq_v_version_version_updated_at_idx" ON "_faq_v" USING btree ("version_updated_at");
  CREATE INDEX "_faq_v_version_version_created_at_idx" ON "_faq_v" USING btree ("version_created_at");
  CREATE INDEX "_faq_v_version_version__status_idx" ON "_faq_v" USING btree ("version__status");
  CREATE INDEX "_faq_v_created_at_idx" ON "_faq_v" USING btree ("created_at");
  CREATE INDEX "_faq_v_updated_at_idx" ON "_faq_v" USING btree ("updated_at");
  CREATE INDEX "_faq_v_latest_idx" ON "_faq_v" USING btree ("latest");
  CREATE INDEX "_faq_v_autosave_idx" ON "_faq_v" USING btree ("autosave");
  CREATE INDEX "galeri_image_idx" ON "galeri" USING btree ("image_id");
  CREATE INDEX "galeri_updated_at_idx" ON "galeri" USING btree ("updated_at");
  CREATE INDEX "galeri_created_at_idx" ON "galeri" USING btree ("created_at");
  CREATE INDEX "galeri__status_idx" ON "galeri" USING btree ("_status");
  CREATE INDEX "_galeri_v_parent_idx" ON "_galeri_v" USING btree ("parent_id");
  CREATE INDEX "_galeri_v_version_version_image_idx" ON "_galeri_v" USING btree ("version_image_id");
  CREATE INDEX "_galeri_v_version_version_updated_at_idx" ON "_galeri_v" USING btree ("version_updated_at");
  CREATE INDEX "_galeri_v_version_version_created_at_idx" ON "_galeri_v" USING btree ("version_created_at");
  CREATE INDEX "_galeri_v_version_version__status_idx" ON "_galeri_v" USING btree ("version__status");
  CREATE INDEX "_galeri_v_created_at_idx" ON "_galeri_v" USING btree ("created_at");
  CREATE INDEX "_galeri_v_updated_at_idx" ON "_galeri_v" USING btree ("updated_at");
  CREATE INDEX "_galeri_v_latest_idx" ON "_galeri_v" USING btree ("latest");
  CREATE INDEX "_galeri_v_autosave_idx" ON "_galeri_v" USING btree ("autosave");
  CREATE INDEX "testimoni_updated_at_idx" ON "testimoni" USING btree ("updated_at");
  CREATE INDEX "testimoni_created_at_idx" ON "testimoni" USING btree ("created_at");
  CREATE INDEX "testimoni__status_idx" ON "testimoni" USING btree ("_status");
  CREATE INDEX "_testimoni_v_parent_idx" ON "_testimoni_v" USING btree ("parent_id");
  CREATE INDEX "_testimoni_v_version_version_updated_at_idx" ON "_testimoni_v" USING btree ("version_updated_at");
  CREATE INDEX "_testimoni_v_version_version_created_at_idx" ON "_testimoni_v" USING btree ("version_created_at");
  CREATE INDEX "_testimoni_v_version_version__status_idx" ON "_testimoni_v" USING btree ("version__status");
  CREATE INDEX "_testimoni_v_created_at_idx" ON "_testimoni_v" USING btree ("created_at");
  CREATE INDEX "_testimoni_v_updated_at_idx" ON "_testimoni_v" USING btree ("updated_at");
  CREATE INDEX "_testimoni_v_latest_idx" ON "_testimoni_v" USING btree ("latest");
  CREATE INDEX "_testimoni_v_autosave_idx" ON "_testimoni_v" USING btree ("autosave");
  CREATE INDEX "profil_sekolah_misi_order_idx" ON "profil_sekolah_misi" USING btree ("_order");
  CREATE INDEX "profil_sekolah_misi_parent_id_idx" ON "profil_sekolah_misi" USING btree ("_parent_id");
  CREATE INDEX "profil_sekolah_info_items_order_idx" ON "profil_sekolah_info_items" USING btree ("_order");
  CREATE INDEX "profil_sekolah_info_items_parent_id_idx" ON "profil_sekolah_info_items" USING btree ("_parent_id");
  CREATE INDEX "profil_sekolah_struktur_order_idx" ON "profil_sekolah_struktur" USING btree ("_order");
  CREATE INDEX "profil_sekolah_struktur_parent_id_idx" ON "profil_sekolah_struktur" USING btree ("_parent_id");
  CREATE INDEX "profil_sekolah_stat_items_order_idx" ON "profil_sekolah_stat_items" USING btree ("_order");
  CREATE INDEX "profil_sekolah_stat_items_parent_id_idx" ON "profil_sekolah_stat_items" USING btree ("_parent_id");
  CREATE INDEX "profil_sekolah_badge_items_order_idx" ON "profil_sekolah_badge_items" USING btree ("_order");
  CREATE INDEX "profil_sekolah_badge_items_parent_id_idx" ON "profil_sekolah_badge_items" USING btree ("_parent_id");
  CREATE INDEX "ppdb_steps_order_idx" ON "ppdb_steps" USING btree ("_order");
  CREATE INDEX "ppdb_steps_parent_id_idx" ON "ppdb_steps" USING btree ("_parent_id");
  CREATE INDEX "ppdb_timeline_order_idx" ON "ppdb_timeline" USING btree ("_order");
  CREATE INDEX "ppdb_timeline_parent_id_idx" ON "ppdb_timeline" USING btree ("_parent_id");
  CREATE INDEX "ppdb_requirements_order_idx" ON "ppdb_requirements" USING btree ("_order");
  CREATE INDEX "ppdb_requirements_parent_id_idx" ON "ppdb_requirements" USING btree ("_parent_id");
  CREATE INDEX "ppdb_registration_form_idx" ON "ppdb" USING btree ("registration_form_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_agenda_fk" FOREIGN KEY ("agenda_id") REFERENCES "public"."agenda"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galeri_fk" FOREIGN KEY ("galeri_id") REFERENCES "public"."galeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimoni_fk" FOREIGN KEY ("testimoni_id") REFERENCES "public"."testimoni"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_agenda_id_idx" ON "payload_locked_documents_rels" USING btree ("agenda_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_galeri_id_idx" ON "payload_locked_documents_rels" USING btree ("galeri_id");
  CREATE INDEX "payload_locked_documents_rels_testimoni_id_idx" ON "payload_locked_documents_rels" USING btree ("testimoni_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "agenda" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_agenda_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faq_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "galeri" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_galeri_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimoni" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_testimoni_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profil_sekolah_misi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profil_sekolah_info_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profil_sekolah_struktur" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profil_sekolah_stat_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profil_sekolah_badge_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profil_sekolah" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ppdb_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ppdb_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ppdb_requirements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ppdb" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "agenda" CASCADE;
  DROP TABLE "_agenda_v" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "_faq_v" CASCADE;
  DROP TABLE "galeri" CASCADE;
  DROP TABLE "_galeri_v" CASCADE;
  DROP TABLE "testimoni" CASCADE;
  DROP TABLE "_testimoni_v" CASCADE;
  DROP TABLE "profil_sekolah_misi" CASCADE;
  DROP TABLE "profil_sekolah_info_items" CASCADE;
  DROP TABLE "profil_sekolah_struktur" CASCADE;
  DROP TABLE "profil_sekolah_stat_items" CASCADE;
  DROP TABLE "profil_sekolah_badge_items" CASCADE;
  DROP TABLE "profil_sekolah" CASCADE;
  DROP TABLE "ppdb_steps" CASCADE;
  DROP TABLE "ppdb_timeline" CASCADE;
  DROP TABLE "ppdb_requirements" CASCADE;
  DROP TABLE "ppdb" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_agenda_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faq_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_galeri_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimoni_fk";
  
  DROP INDEX "payload_locked_documents_rels_agenda_id_idx";
  DROP INDEX "payload_locked_documents_rels_faq_id_idx";
  DROP INDEX "payload_locked_documents_rels_galeri_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimoni_id_idx";
  ALTER TABLE "posts" DROP COLUMN "post_type";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "_posts_v" DROP COLUMN "version_post_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "agenda_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faq_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "galeri_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimoni_id";
  DROP TYPE "public"."enum_posts_post_type";
  DROP TYPE "public"."enum__posts_v_version_post_type";
  DROP TYPE "public"."enum_agenda_status";
  DROP TYPE "public"."enum__agenda_v_version_status";
  DROP TYPE "public"."enum_faq_category";
  DROP TYPE "public"."enum_faq_status";
  DROP TYPE "public"."enum__faq_v_version_category";
  DROP TYPE "public"."enum__faq_v_version_status";
  DROP TYPE "public"."enum_galeri_status";
  DROP TYPE "public"."enum__galeri_v_version_status";
  DROP TYPE "public"."enum_testimoni_status";
  DROP TYPE "public"."enum__testimoni_v_version_status";`)
}
