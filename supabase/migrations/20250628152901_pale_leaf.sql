/*
  # Insurance Platform Database Schema

  1. New Tables
    - `users` - User authentication and profile data
    - `quotations` - Insurance quotation requests
    - `policies` - Active insurance policies
    - `claims` - Insurance claims
    - `tasks` - Employee tasks and assignments
    - `notifications` - System notifications
    - `reinsurers` - Reinsurance company data
    - `brokers` - Insurance broker data
    - `treaty_configs` - Reinsurance treaty configurations
    - `excess_of_loss` - Excess of loss configurations
    - `facultative_policies` - Facultative reinsurance policies
    - `ibnr_calculations` - IBNR reserve calculations
    - `upr_calculations` - Unearned premium reserve calculations
    - `ifrs17_data` - IFRS 17 reporting data
    - `ledger_entries` - Accounting ledger entries
    - `chart_of_accounts` - Chart of accounts
    - `currencies` - Multi-currency support
    - `budget_data` - Budget vs actual data
    - `fixed_assets` - Fixed asset register

  2. Security
    - Enable RLS on all tables
    - Add policies for user-based access control
    - Separate access for intermediaries vs employees
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('intermediary', 'employee')),
  permissions text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name text NOT NULL,
  client_email text,
  client_phone text,
  product text NOT NULL,
  coverage_type text,
  vehicle_value numeric,
  vehicle_usage text,
  property_type text,
  property_value numeric,
  property_location text,
  coverage_details text,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Policies table
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_number text UNIQUE NOT NULL,
  client_name text NOT NULL,
  product text NOT NULL,
  premium numeric NOT NULL,
  sum_insured numeric,
  class_of_business text,
  leader_insurer text,
  facultative_share numeric,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'expired')),
  created_by text DEFAULT 'intermediary' CHECK (created_by IN ('intermediary', 'employee')),
  inception_date date,
  expiry_date date,
  created_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_number text UNIQUE NOT NULL,
  policy_number text,
  client_name text NOT NULL,
  class_of_business text,
  gross_amount numeric,
  excess_amount numeric DEFAULT 0,
  salvage_amount numeric DEFAULT 0,
  other_expense numeric DEFAULT 0,
  net_amount numeric GENERATED ALWAYS AS (COALESCE(gross_amount, 0) - COALESCE(excess_amount, 0) - COALESCE(salvage_amount, 0) + COALESCE(other_expense, 0)) STORED,
  amount numeric NOT NULL, -- For backward compatibility
  status text NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'processing', 'approved', 'rejected')),
  date_of_loss date,
  date_reported date,
  claim_description text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL CHECK (type IN ('underwriting', 'finance', 'quotation')),
  title text NOT NULL,
  assigned_to text NOT NULL,
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  due_date date NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'approved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  time text NOT NULL,
  user_id uuid REFERENCES users(id),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Reinsurers table
CREATE TABLE IF NOT EXISTS reinsurers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  country text NOT NULL,
  rating text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Brokers table
CREATE TABLE IF NOT EXISTS brokers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Treaty configurations table
CREATE TABLE IF NOT EXISTS treaty_configs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL CHECK (type IN ('quota_share', 'excess_of_loss', 'surplus', 'facultative_obligatory')),
  name text NOT NULL,
  class_of_business text[] DEFAULT '{}',
  gross_retention numeric NOT NULL,
  capacity numeric NOT NULL,
  reinsurers jsonb DEFAULT '[]', -- Array of {reinsurerCode, share}
  broker_code text,
  effective_date date NOT NULL,
  expiry_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Excess of Loss table
CREATE TABLE IF NOT EXISTS excess_of_loss (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  net_retention numeric NOT NULL,
  layers jsonb DEFAULT '[]', -- Array of {from, to, rate, reinstatements}
  annual_aggregate_limit numeric NOT NULL,
  class_of_business text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Facultative policies table
CREATE TABLE IF NOT EXISTS facultative_policies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_number text UNIQUE NOT NULL,
  insured_name text NOT NULL,
  sum_insured numeric NOT NULL,
  facultative_share numeric NOT NULL,
  reinsurers jsonb DEFAULT '[]', -- Array of {reinsurerCode, share}
  broker_code text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- IBNR calculations table
CREATE TABLE IF NOT EXISTS ibnr_calculations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_of_business text NOT NULL,
  development_factor numeric NOT NULL,
  ultimate_loss numeric NOT NULL,
  paid_loss numeric NOT NULL,
  ibnr_reserve numeric GENERATED ALWAYS AS (ultimate_loss - paid_loss) STORED,
  calculation_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- UPR calculations table
CREATE TABLE IF NOT EXISTS upr_calculations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_number text NOT NULL,
  premium numeric NOT NULL,
  inception_date date NOT NULL,
  expiry_date date NOT NULL,
  upr_amount numeric NOT NULL,
  calculation_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- IFRS 17 data table
CREATE TABLE IF NOT EXISTS ifrs17_data (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_group text NOT NULL,
  measurement_model text NOT NULL CHECK (measurement_model IN ('PAA', 'GMM')),
  liability_coverage numeric NOT NULL,
  liability_remaining numeric NOT NULL,
  contractual_service_margin numeric DEFAULT 0,
  risk_adjustment numeric NOT NULL,
  reporting_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Chart of accounts table
CREATE TABLE IF NOT EXISTS chart_of_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('Asset', 'Liability', 'Equity', 'Income', 'Expense')),
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Currencies table
CREATE TABLE IF NOT EXISTS currencies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  rate numeric NOT NULL DEFAULT 1.0000,
  symbol text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Ledger entries table
CREATE TABLE IF NOT EXISTS ledger_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  date date NOT NULL,
  reference text NOT NULL,
  description text NOT NULL,
  account_code text NOT NULL,
  account_name text NOT NULL,
  debit numeric DEFAULT 0,
  credit numeric DEFAULT 0,
  currency text DEFAULT 'TZS',
  exchange_rate numeric DEFAULT 1.0000,
  project text,
  cost_center text,
  created_at timestamptz DEFAULT now()
);

-- Budget data table
CREATE TABLE IF NOT EXISTS budget_data (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_code text NOT NULL,
  account_name text NOT NULL,
  budget_amount numeric NOT NULL,
  actual_amount numeric DEFAULT 0,
  variance_amount numeric GENERATED ALWAYS AS (actual_amount - budget_amount) STORED,
  period text NOT NULL, -- e.g., '2025-01'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Fixed assets table
CREATE TABLE IF NOT EXISTS fixed_assets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_code text UNIQUE NOT NULL,
  asset_name text NOT NULL,
  category text NOT NULL,
  cost numeric NOT NULL,
  accumulated_depreciation numeric DEFAULT 0,
  depreciation_rate numeric NOT NULL,
  acquisition_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reinsurers ENABLE ROW LEVEL SECURITY;
ALTER TABLE brokers ENABLE ROW LEVEL SECURITY;
ALTER TABLE treaty_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE excess_of_loss ENABLE ROW LEVEL SECURITY;
ALTER TABLE facultative_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ibnr_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE upr_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ifrs17_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE currencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixed_assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth_user_id = auth.uid());

-- RLS Policies for Quotations (Intermediaries only)
CREATE POLICY "Intermediaries can manage quotations"
  ON quotations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'intermediary'
    )
  );

-- RLS Policies for Policies
CREATE POLICY "Users can read policies"
  ON policies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Employees can manage policies"
  ON policies
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

-- RLS Policies for Claims
CREATE POLICY "Users can read claims"
  ON claims
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Intermediaries can create claims"
  ON claims
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'intermediary'
    )
  );

CREATE POLICY "Employees can manage claims"
  ON claims
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

-- RLS Policies for Employee-only tables
CREATE POLICY "Employees only access"
  ON tasks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON reinsurers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON brokers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON treaty_configs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON excess_of_loss
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON facultative_policies
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON ibnr_calculations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON upr_calculations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON ifrs17_data
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON chart_of_accounts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON currencies
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON ledger_entries
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON budget_data
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

CREATE POLICY "Employees only access"
  ON fixed_assets
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.auth_user_id = auth.uid() 
      AND users.user_type = 'employee'
    )
  );

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (user_id IN (
    SELECT id FROM users WHERE auth_user_id = auth.uid()
  ));

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (user_id IN (
    SELECT id FROM users WHERE auth_user_id = auth.uid()
  ));