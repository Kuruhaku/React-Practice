-- trigger function (what happens, into where, with?)
create function public.handle_new_users()
return trigger
language plpgsql
security definer
set search_path = ""
as $$
begin
  INSERT INTO public.user_profiles (id, name, account_type)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> "name",
    new.raw_user_meta_data ->> "account_type"
  );
end 
$$

-- trigger object (when, after/before?)
create trigger on_auth_user_created
  after INSERT on auth.users_profiles
  for each row
  execute procedure public.handle_new_users()