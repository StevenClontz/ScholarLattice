create table "public"."collections" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text,
    "description" text,
    "short_title" text,
    "website" text,
    "parent_id" uuid
);


alter table "public"."collections" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "username" text,
    "first_name" text,
    "last_name" text,
    "affiliation" text,
    "website" text,
    "orcid_id" text
);


alter table "public"."profiles" enable row level security;

create table "public"."submissions" (
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "title" text,
    "abstract" text,
    "collection_id" uuid not null,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."submissions" enable row level security;

CREATE UNIQUE INDEX collections_pkey1 ON public.collections USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX submissions_pkey ON public.submissions USING btree (id);

CREATE UNIQUE INDEX submissions_profile_id_collection_id_key ON public.submissions USING btree (profile_id, collection_id);

alter table "public"."collections" add constraint "collections_pkey1" PRIMARY KEY using index "collections_pkey1";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."submissions" add constraint "submissions_pkey" PRIMARY KEY using index "submissions_pkey";

alter table "public"."collections" add constraint "collections_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collections" validate constraint "collections_parent_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."submissions" add constraint "submissions_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections(id) not valid;

alter table "public"."submissions" validate constraint "submissions_collection_id_fkey";

alter table "public"."submissions" add constraint "submissions_profile_id_collection_id_key" UNIQUE using index "submissions_profile_id_collection_id_key";

alter table "public"."submissions" add constraint "submissions_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."submissions" validate constraint "submissions_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$function$
;

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));