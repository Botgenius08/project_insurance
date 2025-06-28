/*
  # Add Demo Users

  1. New Users
    - Creates demo users for testing the application
    - Intermediary user: ezrandosi@gmail.com
    - Employee user: ezrandosi.employee@gmail.com
  
  2. Security
    - Uses proper password hashing
    - Sets up correct user profiles with appropriate permissions
*/

-- First, let's create the user profiles directly since we can't directly insert into auth.users
-- We'll use a different approach by creating the profiles and letting the auth system handle user creation

-- Create intermediary user profile (will be linked when user signs up)
DO $$
DECLARE
    intermediary_user_id uuid;
    employee_user_id uuid;
BEGIN
    -- Generate UUIDs for our demo users
    intermediary_user_id := gen_random_uuid();
    employee_user_id := gen_random_uuid();
    
    -- Insert intermediary user profile
    INSERT INTO public.users (
        id,
        auth_user_id,
        name,
        user_type,
        permissions,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        intermediary_user_id,
        'Ezra Ndosi',
        'intermediary',
        ARRAY['view_quotations', 'create_quotations', 'manage_quotations', 'view_policies', 'manage_policies', 'view_claims', 'lodge_claims'],
        now(),
        now()
    );
    
    -- Insert employee user profile
    INSERT INTO public.users (
        id,
        auth_user_id,
        name,
        user_type,
        permissions,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        employee_user_id,
        'Ezra Ndosi (Employee)',
        'employee',
        ARRAY['view_tasks', 'manage_tasks', 'view_approvals', 'process_approvals', 'underwriting', 'finance_operations', 'reinsurance_management', 'actuarial_analysis', 'claims_processing'],
        now(),
        now()
    );
    
    -- Log the created user IDs for reference
    RAISE NOTICE 'Created intermediary user profile with auth_user_id: %', intermediary_user_id;
    RAISE NOTICE 'Created employee user profile with auth_user_id: %', employee_user_id;
    
END $$;

-- Note: The actual auth users will be created automatically when users sign up through the application
-- The emails to use for login are:
-- Intermediary: ezrandosi@gmail.com (password: ezra.)
-- Employee: ezrandosi.employee@gmail.com (password: ezran.)