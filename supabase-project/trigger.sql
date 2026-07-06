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

CREATE policy "Reps can only add their own deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.account_type = 'rep'
  )
)


CREATE policy "Admins to add anyone's deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
  WITH EXISTS (
    SELECT 1 FROM sales_deals WHERE user_profiles.account_type = "admin" AND auth.uid() = user_profiles.id
  )
)

SELECT name, SUM(value) FROM sales_deals INNER JOIN user_profiles ON sales_deals.user_id = user_profiles.id GROUP BY name