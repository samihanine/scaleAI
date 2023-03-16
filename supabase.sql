-- Executing this file on the Supabase database is optional
-- Is is only necessary in order to send Logsnag notification in combination with a CRON job hitting /api/cron

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public."Profiles" ("userId", email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
