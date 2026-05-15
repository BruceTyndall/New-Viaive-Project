import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_brief_block_fields_type" AS ENUM('text', 'email', 'textarea', 'select', 'date', 'number');
  CREATE TYPE "public"."enum_pages_review_status" AS ENUM('draft', 'staging', 'readyForReview', 'approved', 'live', 'archived');
  CREATE TYPE "public"."enum_destinations_hotels_tier" AS ENUM('Palace', 'Resort', 'Boutique', 'Villa', 'Riad', 'Ryokan');
  CREATE TYPE "public"."enum_destinations_watch2026_kind" AS ENUM('Opening', 'Refurb', 'Watch');
  CREATE TYPE "public"."enum_destinations_review_status" AS ENUM('draft', 'staging', 'readyForReview', 'approved', 'live', 'archived');
  CREATE TYPE "public"."enum_desks_review_status" AS ENUM('draft', 'staging', 'readyForReview', 'approved', 'live', 'archived');
  CREATE TYPE "public"."enum_best_of_review_status" AS ENUM('draft', 'staging', 'readyForReview', 'approved', 'live', 'archived');
  CREATE TYPE "public"."enum_compares_review_status" AS ENUM('draft', 'staging', 'readyForReview', 'approved', 'live', 'archived');
  CREATE TYPE "public"."enum_posts_review_status" AS ENUM('draft', 'staging', 'readyForReview', 'approved', 'live', 'archived');
  CREATE TYPE "public"."enum_media_license" AS ENUM('owned', 'licensed', 'editorial');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('instagram', 'x', 'linkedin', 'substack');
  CREATE TYPE "public"."enum_viaive_standard_criteria_icon" AS ENUM('bed', 'compass', 'scroll', 'key', 'leaf', 'scales', 'heart');
  CREATE TABLE "pages_blocks_hero_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"headline" varchar,
  	"italic_headline" varchar,
  	"lede" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_bar_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"logo_id" integer,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_bar_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_intent_router_block_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"blurb" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_intent_router_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_desks_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_atlas_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_destinations_rail_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"italic_title" varchar,
  	"eyebrow" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_destination_guide_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"destination_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_standard_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_editorial_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stay_module_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"lede" varchar,
  	"default_destination" varchar,
  	"disclosure_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_proof_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brief_block_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_brief_block_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"label" varchar,
  	"type" "enum_pages_blocks_brief_block_fields_type",
  	"placeholder" varchar,
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_brief_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"lede" varchar,
  	"submit_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_email_capture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_title" varchar,
  	"override_lede" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_f_a_q_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_f_a_q_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical" varchar,
  	"seo_noindex" boolean DEFAULT false,
  	"review_status" "enum_pages_review_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"destinations_id" integer
  );
  
  CREATE TABLE "destinations_hotels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tier" "enum_destinations_hotels_tier",
  	"neighborhood" varchar,
  	"note" varchar,
  	"cover_id" integer
  );
  
  CREATE TABLE "destinations_watch2026" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_destinations_watch2026_kind",
  	"title" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "destinations_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"h2" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "destinations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"country" varchar NOT NULL,
  	"region_id" integer,
  	"lat" numeric NOT NULL,
  	"lng" numeric NOT NULL,
  	"best_months" varchar,
  	"lead_time" varchar,
  	"read_minutes" numeric,
  	"last_reviewed" timestamp(3) with time zone,
  	"hero_eyebrow" varchar,
  	"h1" varchar NOT NULL,
  	"h1_italic" varchar,
  	"geo_answer" varchar NOT NULL,
  	"cta_eyebrow" varchar,
  	"cta_headline" varchar,
  	"cta_body" varchar,
  	"concierge_intent" varchar,
  	"featured" boolean DEFAULT false,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"review_status" "enum_destinations_review_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "desks_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "desks_sample_briefs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"outcome" varchar
  );
  
  CREATE TABLE "desks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "desks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"eyebrow" varchar,
  	"lede" jsonb,
  	"lead_time" varchar,
  	"price_floor" varchar,
  	"cta_href" varchar DEFAULT '/concierge',
  	"review_status" "enum_desks_review_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "regions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"name" varchar,
  	"lead" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "regions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"destinations_id" integer
  );
  
  CREATE TABLE "best_of_ranking" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rank" numeric,
  	"hotel" varchar,
  	"verdict" varchar,
  	"note" varchar,
  	"book_href" varchar
  );
  
  CREATE TABLE "best_of_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "best_of" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"intro" jsonb,
  	"methodology" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"review_status" "enum_best_of_review_status",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "compares_comparison_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criterion" varchar,
  	"option_a" varchar,
  	"option_b" varchar,
  	"option_c" varchar
  );
  
  CREATE TABLE "compares_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "compares" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"intro" jsonb,
  	"verdict" jsonb,
  	"review_status" "enum_compares_review_status",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"dek" varchar,
  	"author" varchar,
  	"published_at" timestamp(3) with time zone,
  	"cover_id" integer,
  	"read_minutes" numeric,
  	"body" jsonb,
  	"review_status" "enum_posts_review_status",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"active" boolean
  );
  
  CREATE TABLE "legal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"last_updated" timestamp(3) with time zone,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "briefs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intent" varchar,
  	"desk" varchar,
  	"name" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"dates" varchar,
  	"party_size" numeric,
  	"budget" varchar,
  	"notes" varchar,
  	"source" varchar,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"license" "enum_media_license",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "navigation_primary_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_wordmark_id" integer,
  	"brand_href" varchar DEFAULT '/',
  	"cta_label" varchar DEFAULT 'Begin a private brief',
  	"cta_href" varchar DEFAULT '/concierge',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform",
  	"href" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"disclosure" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "viaive_standard_criteria" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"icon" "enum_viaive_standard_criteria_icon"
  );
  
  CREATE TABLE "viaive_standard" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "proof_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "proof_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"attribution" varchar,
  	"role" varchar
  );
  
  CREATE TABLE "proof" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "newsletter" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'The Quiet Letter',
  	"lede" jsonb,
  	"placeholder" varchar DEFAULT 'your@email.com',
  	"consent_text" jsonb,
  	"success_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nova_exit_intent" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"italic_headline" varchar,
  	"body" jsonb,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"dismiss_label" varchar DEFAULT 'Keep browsing',
  	"min_dwell_sec" numeric DEFAULT 8,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "destinations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "desks_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "regions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "best_of_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "compares_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "briefs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block" ADD CONSTRAINT "pages_blocks_hero_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar_block_items" ADD CONSTRAINT "pages_blocks_trust_bar_block_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar_block_items" ADD CONSTRAINT "pages_blocks_trust_bar_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_bar_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_bar_block" ADD CONSTRAINT "pages_blocks_trust_bar_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intent_router_block_cards" ADD CONSTRAINT "pages_blocks_intent_router_block_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_intent_router_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intent_router_block" ADD CONSTRAINT "pages_blocks_intent_router_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_desks_block" ADD CONSTRAINT "pages_blocks_desks_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_atlas_block" ADD CONSTRAINT "pages_blocks_atlas_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destinations_rail_block" ADD CONSTRAINT "pages_blocks_destinations_rail_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_guide_block" ADD CONSTRAINT "pages_blocks_destination_guide_block_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_guide_block" ADD CONSTRAINT "pages_blocks_destination_guide_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_standard_block" ADD CONSTRAINT "pages_blocks_standard_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_editorial_block" ADD CONSTRAINT "pages_blocks_editorial_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stay_module_block" ADD CONSTRAINT "pages_blocks_stay_module_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_proof_block" ADD CONSTRAINT "pages_blocks_proof_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brief_block_fields_options" ADD CONSTRAINT "pages_blocks_brief_block_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brief_block_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brief_block_fields" ADD CONSTRAINT "pages_blocks_brief_block_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_brief_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brief_block" ADD CONSTRAINT "pages_blocks_brief_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_email_capture_block" ADD CONSTRAINT "pages_blocks_email_capture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_f_a_q_block_items" ADD CONSTRAINT "pages_blocks_f_a_q_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_f_a_q_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_f_a_q_block" ADD CONSTRAINT "pages_blocks_f_a_q_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_hotels" ADD CONSTRAINT "destinations_hotels_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "destinations_hotels" ADD CONSTRAINT "destinations_hotels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_watch2026" ADD CONSTRAINT "destinations_watch2026_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations_sections" ADD CONSTRAINT "destinations_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "destinations" ADD CONSTRAINT "destinations_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "destinations" ADD CONSTRAINT "destinations_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "desks_specialties" ADD CONSTRAINT "desks_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."desks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "desks_sample_briefs" ADD CONSTRAINT "desks_sample_briefs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."desks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "desks_faq" ADD CONSTRAINT "desks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."desks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regions_rels" ADD CONSTRAINT "regions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regions_rels" ADD CONSTRAINT "regions_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "best_of_ranking" ADD CONSTRAINT "best_of_ranking_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."best_of"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "best_of_faq" ADD CONSTRAINT "best_of_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."best_of"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "compares_comparison_table" ADD CONSTRAINT "compares_comparison_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."compares"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "compares_faq" ADD CONSTRAINT "compares_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."compares"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "legal_partners" ADD CONSTRAINT "legal_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_links" ADD CONSTRAINT "navigation_primary_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation" ADD CONSTRAINT "navigation_brand_wordmark_id_media_id_fk" FOREIGN KEY ("brand_wordmark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "viaive_standard_criteria" ADD CONSTRAINT "viaive_standard_criteria_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."viaive_standard"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "proof_metrics" ADD CONSTRAINT "proof_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "proof_quotes" ADD CONSTRAINT "proof_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."proof"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_block_order_idx" ON "pages_blocks_hero_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_parent_id_idx" ON "pages_blocks_hero_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_block_path_idx" ON "pages_blocks_hero_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_block_image_idx" ON "pages_blocks_hero_block" USING btree ("image_id");
  CREATE INDEX "pages_blocks_trust_bar_block_items_order_idx" ON "pages_blocks_trust_bar_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_bar_block_items_parent_id_idx" ON "pages_blocks_trust_bar_block_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_block_items_logo_idx" ON "pages_blocks_trust_bar_block_items" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_trust_bar_block_order_idx" ON "pages_blocks_trust_bar_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_bar_block_parent_id_idx" ON "pages_blocks_trust_bar_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_bar_block_path_idx" ON "pages_blocks_trust_bar_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_intent_router_block_cards_order_idx" ON "pages_blocks_intent_router_block_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_intent_router_block_cards_parent_id_idx" ON "pages_blocks_intent_router_block_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intent_router_block_order_idx" ON "pages_blocks_intent_router_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_intent_router_block_parent_id_idx" ON "pages_blocks_intent_router_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intent_router_block_path_idx" ON "pages_blocks_intent_router_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_desks_block_order_idx" ON "pages_blocks_desks_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_desks_block_parent_id_idx" ON "pages_blocks_desks_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_desks_block_path_idx" ON "pages_blocks_desks_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_atlas_block_order_idx" ON "pages_blocks_atlas_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_atlas_block_parent_id_idx" ON "pages_blocks_atlas_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_atlas_block_path_idx" ON "pages_blocks_atlas_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_destinations_rail_block_order_idx" ON "pages_blocks_destinations_rail_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_destinations_rail_block_parent_id_idx" ON "pages_blocks_destinations_rail_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destinations_rail_block_path_idx" ON "pages_blocks_destinations_rail_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_destination_guide_block_order_idx" ON "pages_blocks_destination_guide_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_guide_block_parent_id_idx" ON "pages_blocks_destination_guide_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_guide_block_path_idx" ON "pages_blocks_destination_guide_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_destination_guide_block_destination_idx" ON "pages_blocks_destination_guide_block" USING btree ("destination_id");
  CREATE INDEX "pages_blocks_standard_block_order_idx" ON "pages_blocks_standard_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_standard_block_parent_id_idx" ON "pages_blocks_standard_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_standard_block_path_idx" ON "pages_blocks_standard_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_editorial_block_order_idx" ON "pages_blocks_editorial_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_editorial_block_parent_id_idx" ON "pages_blocks_editorial_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_editorial_block_path_idx" ON "pages_blocks_editorial_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_stay_module_block_order_idx" ON "pages_blocks_stay_module_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_stay_module_block_parent_id_idx" ON "pages_blocks_stay_module_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stay_module_block_path_idx" ON "pages_blocks_stay_module_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_proof_block_order_idx" ON "pages_blocks_proof_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_proof_block_parent_id_idx" ON "pages_blocks_proof_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_proof_block_path_idx" ON "pages_blocks_proof_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_brief_block_fields_options_order_idx" ON "pages_blocks_brief_block_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_brief_block_fields_options_parent_id_idx" ON "pages_blocks_brief_block_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brief_block_fields_order_idx" ON "pages_blocks_brief_block_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_brief_block_fields_parent_id_idx" ON "pages_blocks_brief_block_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brief_block_order_idx" ON "pages_blocks_brief_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_brief_block_parent_id_idx" ON "pages_blocks_brief_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brief_block_path_idx" ON "pages_blocks_brief_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_email_capture_block_order_idx" ON "pages_blocks_email_capture_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_email_capture_block_parent_id_idx" ON "pages_blocks_email_capture_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_email_capture_block_path_idx" ON "pages_blocks_email_capture_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_f_a_q_block_items_order_idx" ON "pages_blocks_f_a_q_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_f_a_q_block_items_parent_id_idx" ON "pages_blocks_f_a_q_block_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_f_a_q_block_order_idx" ON "pages_blocks_f_a_q_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_f_a_q_block_parent_id_idx" ON "pages_blocks_f_a_q_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_f_a_q_block_path_idx" ON "pages_blocks_f_a_q_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_destinations_id_idx" ON "pages_rels" USING btree ("destinations_id");
  CREATE INDEX "destinations_hotels_order_idx" ON "destinations_hotels" USING btree ("_order");
  CREATE INDEX "destinations_hotels_parent_id_idx" ON "destinations_hotels" USING btree ("_parent_id");
  CREATE INDEX "destinations_hotels_cover_idx" ON "destinations_hotels" USING btree ("cover_id");
  CREATE INDEX "destinations_watch2026_order_idx" ON "destinations_watch2026" USING btree ("_order");
  CREATE INDEX "destinations_watch2026_parent_id_idx" ON "destinations_watch2026" USING btree ("_parent_id");
  CREATE INDEX "destinations_sections_order_idx" ON "destinations_sections" USING btree ("_order");
  CREATE INDEX "destinations_sections_parent_id_idx" ON "destinations_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "destinations_slug_idx" ON "destinations" USING btree ("slug");
  CREATE INDEX "destinations_region_idx" ON "destinations" USING btree ("region_id");
  CREATE INDEX "destinations_seo_seo_og_image_idx" ON "destinations" USING btree ("seo_og_image_id");
  CREATE INDEX "destinations_updated_at_idx" ON "destinations" USING btree ("updated_at");
  CREATE INDEX "destinations_created_at_idx" ON "destinations" USING btree ("created_at");
  CREATE INDEX "desks_specialties_order_idx" ON "desks_specialties" USING btree ("_order");
  CREATE INDEX "desks_specialties_parent_id_idx" ON "desks_specialties" USING btree ("_parent_id");
  CREATE INDEX "desks_sample_briefs_order_idx" ON "desks_sample_briefs" USING btree ("_order");
  CREATE INDEX "desks_sample_briefs_parent_id_idx" ON "desks_sample_briefs" USING btree ("_parent_id");
  CREATE INDEX "desks_faq_order_idx" ON "desks_faq" USING btree ("_order");
  CREATE INDEX "desks_faq_parent_id_idx" ON "desks_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "desks_slug_idx" ON "desks" USING btree ("slug");
  CREATE INDEX "desks_updated_at_idx" ON "desks" USING btree ("updated_at");
  CREATE INDEX "desks_created_at_idx" ON "desks" USING btree ("created_at");
  CREATE UNIQUE INDEX "regions_slug_idx" ON "regions" USING btree ("slug");
  CREATE INDEX "regions_updated_at_idx" ON "regions" USING btree ("updated_at");
  CREATE INDEX "regions_created_at_idx" ON "regions" USING btree ("created_at");
  CREATE INDEX "regions_rels_order_idx" ON "regions_rels" USING btree ("order");
  CREATE INDEX "regions_rels_parent_idx" ON "regions_rels" USING btree ("parent_id");
  CREATE INDEX "regions_rels_path_idx" ON "regions_rels" USING btree ("path");
  CREATE INDEX "regions_rels_destinations_id_idx" ON "regions_rels" USING btree ("destinations_id");
  CREATE INDEX "best_of_ranking_order_idx" ON "best_of_ranking" USING btree ("_order");
  CREATE INDEX "best_of_ranking_parent_id_idx" ON "best_of_ranking" USING btree ("_parent_id");
  CREATE INDEX "best_of_faq_order_idx" ON "best_of_faq" USING btree ("_order");
  CREATE INDEX "best_of_faq_parent_id_idx" ON "best_of_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "best_of_slug_idx" ON "best_of" USING btree ("slug");
  CREATE INDEX "best_of_updated_at_idx" ON "best_of" USING btree ("updated_at");
  CREATE INDEX "best_of_created_at_idx" ON "best_of" USING btree ("created_at");
  CREATE INDEX "compares_comparison_table_order_idx" ON "compares_comparison_table" USING btree ("_order");
  CREATE INDEX "compares_comparison_table_parent_id_idx" ON "compares_comparison_table" USING btree ("_parent_id");
  CREATE INDEX "compares_faq_order_idx" ON "compares_faq" USING btree ("_order");
  CREATE INDEX "compares_faq_parent_id_idx" ON "compares_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "compares_slug_idx" ON "compares" USING btree ("slug");
  CREATE INDEX "compares_updated_at_idx" ON "compares" USING btree ("updated_at");
  CREATE INDEX "compares_created_at_idx" ON "compares" USING btree ("created_at");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "legal_partners_order_idx" ON "legal_partners" USING btree ("_order");
  CREATE INDEX "legal_partners_parent_id_idx" ON "legal_partners" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "legal_slug_idx" ON "legal" USING btree ("slug");
  CREATE INDEX "legal_updated_at_idx" ON "legal" USING btree ("updated_at");
  CREATE INDEX "legal_created_at_idx" ON "legal" USING btree ("created_at");
  CREATE INDEX "briefs_updated_at_idx" ON "briefs" USING btree ("updated_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "navigation_primary_links_order_idx" ON "navigation_primary_links" USING btree ("_order");
  CREATE INDEX "navigation_primary_links_parent_id_idx" ON "navigation_primary_links" USING btree ("_parent_id");
  CREATE INDEX "navigation_brand_brand_wordmark_idx" ON "navigation" USING btree ("brand_wordmark_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "viaive_standard_criteria_order_idx" ON "viaive_standard_criteria" USING btree ("_order");
  CREATE INDEX "viaive_standard_criteria_parent_id_idx" ON "viaive_standard_criteria" USING btree ("_parent_id");
  CREATE INDEX "proof_metrics_order_idx" ON "proof_metrics" USING btree ("_order");
  CREATE INDEX "proof_metrics_parent_id_idx" ON "proof_metrics" USING btree ("_parent_id");
  CREATE INDEX "proof_quotes_order_idx" ON "proof_quotes" USING btree ("_order");
  CREATE INDEX "proof_quotes_parent_id_idx" ON "proof_quotes" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_desks_fk" FOREIGN KEY ("desks_id") REFERENCES "public"."desks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_best_of_fk" FOREIGN KEY ("best_of_id") REFERENCES "public"."best_of"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_compares_fk" FOREIGN KEY ("compares_id") REFERENCES "public"."compares"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_fk" FOREIGN KEY ("legal_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_briefs_fk" FOREIGN KEY ("briefs_id") REFERENCES "public"."briefs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_destinations_id_idx" ON "payload_locked_documents_rels" USING btree ("destinations_id");
  CREATE INDEX "payload_locked_documents_rels_desks_id_idx" ON "payload_locked_documents_rels" USING btree ("desks_id");
  CREATE INDEX "payload_locked_documents_rels_regions_id_idx" ON "payload_locked_documents_rels" USING btree ("regions_id");
  CREATE INDEX "payload_locked_documents_rels_best_of_id_idx" ON "payload_locked_documents_rels" USING btree ("best_of_id");
  CREATE INDEX "payload_locked_documents_rels_compares_id_idx" ON "payload_locked_documents_rels" USING btree ("compares_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_legal_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_id");
  CREATE INDEX "payload_locked_documents_rels_briefs_id_idx" ON "payload_locked_documents_rels" USING btree ("briefs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_bar_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_bar_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_intent_router_block_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_intent_router_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_desks_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_atlas_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_destinations_rail_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_destination_guide_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_standard_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_editorial_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stay_module_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_proof_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brief_block_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brief_block_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brief_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_email_capture_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_f_a_q_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_f_a_q_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "destinations_hotels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "destinations_watch2026" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "destinations_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "destinations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "desks_specialties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "desks_sample_briefs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "desks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "desks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "regions_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "best_of_ranking" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "best_of_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "best_of" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "compares_comparison_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "compares_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "compares" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "legal" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "briefs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_primary_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "viaive_standard_criteria" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "viaive_standard" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "proof_metrics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "proof_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "nova_exit_intent" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_block" CASCADE;
  DROP TABLE "pages_blocks_trust_bar_block_items" CASCADE;
  DROP TABLE "pages_blocks_trust_bar_block" CASCADE;
  DROP TABLE "pages_blocks_intent_router_block_cards" CASCADE;
  DROP TABLE "pages_blocks_intent_router_block" CASCADE;
  DROP TABLE "pages_blocks_desks_block" CASCADE;
  DROP TABLE "pages_blocks_atlas_block" CASCADE;
  DROP TABLE "pages_blocks_destinations_rail_block" CASCADE;
  DROP TABLE "pages_blocks_destination_guide_block" CASCADE;
  DROP TABLE "pages_blocks_standard_block" CASCADE;
  DROP TABLE "pages_blocks_editorial_block" CASCADE;
  DROP TABLE "pages_blocks_stay_module_block" CASCADE;
  DROP TABLE "pages_blocks_proof_block" CASCADE;
  DROP TABLE "pages_blocks_brief_block_fields_options" CASCADE;
  DROP TABLE "pages_blocks_brief_block_fields" CASCADE;
  DROP TABLE "pages_blocks_brief_block" CASCADE;
  DROP TABLE "pages_blocks_email_capture_block" CASCADE;
  DROP TABLE "pages_blocks_f_a_q_block_items" CASCADE;
  DROP TABLE "pages_blocks_f_a_q_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "destinations_hotels" CASCADE;
  DROP TABLE "destinations_watch2026" CASCADE;
  DROP TABLE "destinations_sections" CASCADE;
  DROP TABLE "destinations" CASCADE;
  DROP TABLE "desks_specialties" CASCADE;
  DROP TABLE "desks_sample_briefs" CASCADE;
  DROP TABLE "desks_faq" CASCADE;
  DROP TABLE "desks" CASCADE;
  DROP TABLE "regions" CASCADE;
  DROP TABLE "regions_rels" CASCADE;
  DROP TABLE "best_of_ranking" CASCADE;
  DROP TABLE "best_of_faq" CASCADE;
  DROP TABLE "best_of" CASCADE;
  DROP TABLE "compares_comparison_table" CASCADE;
  DROP TABLE "compares_faq" CASCADE;
  DROP TABLE "compares" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "legal_partners" CASCADE;
  DROP TABLE "legal" CASCADE;
  DROP TABLE "briefs" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "navigation_primary_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "viaive_standard_criteria" CASCADE;
  DROP TABLE "viaive_standard" CASCADE;
  DROP TABLE "proof_metrics" CASCADE;
  DROP TABLE "proof_quotes" CASCADE;
  DROP TABLE "proof" CASCADE;
  DROP TABLE "newsletter" CASCADE;
  DROP TABLE "nova_exit_intent" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_destinations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_desks_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_regions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_best_of_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_compares_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_briefs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_destinations_id_idx";
  DROP INDEX "payload_locked_documents_rels_desks_id_idx";
  DROP INDEX "payload_locked_documents_rels_regions_id_idx";
  DROP INDEX "payload_locked_documents_rels_best_of_id_idx";
  DROP INDEX "payload_locked_documents_rels_compares_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_legal_id_idx";
  DROP INDEX "payload_locked_documents_rels_briefs_id_idx";
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "destinations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "desks_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "regions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "best_of_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "compares_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "briefs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  DROP TYPE "public"."enum_pages_blocks_brief_block_fields_type";
  DROP TYPE "public"."enum_pages_review_status";
  DROP TYPE "public"."enum_destinations_hotels_tier";
  DROP TYPE "public"."enum_destinations_watch2026_kind";
  DROP TYPE "public"."enum_destinations_review_status";
  DROP TYPE "public"."enum_desks_review_status";
  DROP TYPE "public"."enum_best_of_review_status";
  DROP TYPE "public"."enum_compares_review_status";
  DROP TYPE "public"."enum_posts_review_status";
  DROP TYPE "public"."enum_media_license";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_viaive_standard_criteria_icon";`)
}
