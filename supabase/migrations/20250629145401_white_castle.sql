/*
  # Insurance Platform Database Schema

  1. New Tables
    - `users` - User authentication and profile data
    - `quotations` - Insurance quotation requests
    - `policies` - Active insurance policies
    - `claims` - Insurance claims
    - `tasks` - Employee task management
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control
    - Create user roles and permissions

  3. Indexes
    - Add performance indexes for common queries
    - Unique constraints for business logic
*/

-- Create custom types
CREATE TYPE user_type AS ENUM ('intermediary', 'employee');
CREATE TYPE quotation_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE policy_status AS ENUM ('active', 'pending', 'expired');
CREATE TYPE claim_status AS ENUM ('submitted', 'processing', 'approved', 'rejected');
CREATE TYPE task_type AS ENUM ('underwriting', 'finance', 'quotation');
CREATE TYPE task_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE notification_type AS ENUM ('info', 'warning', 'error', 'success');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  user_type user_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz,
  is_active boolean DEFAULT true
);

-- Quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_email text,
  product text NOT NULL,
  coverage text,
  amount numeric NOT NULL CHECK (amount > 0),
  status quotation_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE CASCADE
);

-- Policies table
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number text UNIQUE NOT NULL,
  client_name text NOT NULL,
  product text NOT NULL,
  premium numeric NOT NULL CHECK (premium > 0),
  sum_insured numeric CHECK (sum_insured > 0),
  class_of_business text,
  status policy_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE CASCADE
);

-- Claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_number text UNIQUE NOT NULL,
  client_name text NOT NULL,
  policy_number text,
  class_of_business text,
  gross_amount numeric CHECK (gross_amount >= 0),
  excess_amount numeric DEFAULT 0 CHECK (excess_amount >= 0),
  salvage_amount numeric DEFAULT 0 CHECK (salvage_amount >= 0),
  other_expense numeric DEFAULT 0 CHECK (other_expense >= 0),
  net_amount numeric NOT NULL CHECK (net_amount >= 0),
  status claim_status DEFAULT 'submitted',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE CASCADE
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type task_type NOT NULL,
  title text NOT NULL,
  assigned_to text NOT NULL,
  priority task_priority DEFAULT 'medium',
  due_date date NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  type notification_type DEFAULT 'info',
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid()::text = id::text);

-- RLS Policies for quotations table
CREATE POLICY "Intermediaries can manage own quotations"
  ON quotations
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'intermediary'
      AND users.id = quotations.created_by
    )
  );

CREATE POLICY "Employees can view all quotations"
  ON quotations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

-- RLS Policies for policies table
CREATE POLICY "Users can view policies they created"
  ON policies
  FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Employees can manage all policies"
  ON policies
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Intermediaries can create policies"
  ON policies
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'intermediary'
    )
  );

-- RLS Policies for claims table
CREATE POLICY "Users can view claims they created"
  ON claims
  FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Employees can manage all claims"
  ON claims
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Intermediaries can create claims"
  ON claims
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'intermediary'
    )
  );

-- RLS Policies for tasks table
CREATE POLICY "Employees can manage all tasks"
  ON tasks
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

-- RLS Policies for notifications table
CREATE POLICY "Users can view own notifications"
  ON notifications
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  USING (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_quotations_created_by ON quotations(created_by);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);
CREATE INDEX IF NOT EXISTS idx_policies_policy_number ON policies(policy_number);
CREATE INDEX IF NOT EXISTS idx_policies_created_by ON policies(created_by);
CREATE INDEX IF NOT EXISTS idx_claims_claim_number ON claims(claim_number);
CREATE INDEX IF NOT EXISTS idx_claims_created_by ON claims(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Function to update last_login timestamp
CREATE OR REPLACE FUNCTION update_last_login(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE users 
  SET last_login = now() 
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;