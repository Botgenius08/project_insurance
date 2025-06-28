/*
  # Add Demo Users

  1. New Users
    - Add intermediary user: ezrandosi@gmail.com
    - Add employee user: ezrandosi@gmail.com (different password)
  
  2. Security
    - Users will be added to auth.users table
    - Corresponding profiles will be created in public.users table
    - Passwords will be hashed automatically by Supabase
*/

-- Insert intermediary user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'ezrandosi@gmail.com',
  crypt('ezra.', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"user_type": "intermediary"}',
  false,
  'authenticated',
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Insert employee user with different email to avoid conflict
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'ezrandosi.employee@gmail.com',
  crypt('ezran.', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"user_type": "employee"}',
  false,
  'authenticated',
  'authenticated'
) ON CONFLICT (email) DO NOTHING;

-- Create user profiles for intermediary
INSERT INTO public.users (
  auth_user_id,
  name,
  user_type,
  permissions
) 
SELECT 
  au.id,
  'Ezra Ndosi',
  'intermediary',
  ARRAY['view_quotations', 'create_quotations', 'manage_quotations', 'view_policies', 'manage_policies', 'view_claims', 'lodge_claims']
FROM auth.users au 
WHERE au.email = 'ezrandosi@gmail.com'
ON CONFLICT (auth_user_id) DO NOTHING;

-- Create user profiles for employee
INSERT INTO public.users (
  auth_user_id,
  name,
  user_type,
  permissions
) 
SELECT 
  au.id,
  'Ezra Ndosi (Employee)',
  'employee',
  ARRAY['view_tasks', 'manage_tasks', 'view_approvals', 'process_approvals', 'underwriting', 'finance_operations', 'reinsurance_management', 'actuarial_analysis', 'claims_processing']
FROM auth.users au 
WHERE au.email = 'ezrandosi.employee@gmail.com'
ON CONFLICT (auth_user_id) DO NOTHING;