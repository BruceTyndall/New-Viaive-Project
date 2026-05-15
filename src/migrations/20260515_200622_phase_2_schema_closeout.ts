import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_brief_block_fields_type" ADD VALUE 'tel' BEFORE 'textarea';
  ALTER TYPE "public"."enum_pages_blocks_brief_block_fields_type" ADD VALUE 'checkbox';
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "type" SET NOT NULL;
  ALTER TABLE "pages_blocks_brief_block_fields" ADD COLUMN "help_text" varchar;
  ALTER TABLE "pages_blocks_brief_block_fields" ADD COLUMN "autocomplete" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_blocks_brief_block_fields_type";
  CREATE TYPE "public"."enum_pages_blocks_brief_block_fields_type" AS ENUM('text', 'email', 'textarea', 'select', 'date', 'number');
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "type" SET DATA TYPE "public"."enum_pages_blocks_brief_block_fields_type" USING "type"::"public"."enum_pages_blocks_brief_block_fields_type";
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_brief_block_fields" ALTER COLUMN "type" DROP NOT NULL;
  ALTER TABLE "pages_blocks_brief_block_fields" DROP COLUMN "help_text";
  ALTER TABLE "pages_blocks_brief_block_fields" DROP COLUMN "autocomplete";`)
}
