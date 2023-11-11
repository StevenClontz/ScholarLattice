create policy "Enable read access for all users"
on "public"."collections"
as permissive
for select
to public
using (true);


create policy "Enable insert for users based on profile_id"
on "public"."submissions"
as permissive
for insert
to public
with check ((auth.uid() = profile_id));


create policy "Enable read access for all users"
on "public"."submissions"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on profile_id"
on "public"."submissions"
as permissive
for update
to public
using ((auth.uid() = profile_id));
