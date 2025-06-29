/*
  # Seed Sample Data

  1. Sample Users
    - Create test users for both intermediary and employee types
    - Passwords are hashed using bcrypt

  2. Sample Data
    - Migrate existing mock data to database tables
    - Maintain relationships and data integrity
*/

-- Insert sample users (passwords are hashed versions of 'password123')
INSERT INTO users (username, password_hash, user_type) VALUES
  ('intermediary1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'intermediary'),
  ('intermediary2', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'intermediary'),
  ('employee1', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee'),
  ('employee2', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee'),
  ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee');

-- Get user IDs for foreign key references
DO $$
DECLARE
  intermediary1_id uuid;
  intermediary2_id uuid;
  employee1_id uuid;
  employee2_id uuid;
BEGIN
  SELECT id INTO intermediary1_id FROM users WHERE username = 'intermediary1';
  SELECT id INTO intermediary2_id FROM users WHERE username = 'intermediary2';
  SELECT id INTO employee1_id FROM users WHERE username = 'employee1';
  SELECT id INTO employee2_id FROM users WHERE username = 'employee2';

  -- Insert sample quotations
  INSERT INTO quotations (client_name, client_email, product, coverage, amount, status, created_by) VALUES
    ('John Doe', 'john.doe@example.com', 'Motor Insurance', 'comprehensive', 2880000, 'pending', intermediary1_id),
    ('Jane Smith', 'jane.smith@example.com', 'Property & Fire Insurance', 'comprehensive', 1920000, 'approved', intermediary1_id),
    ('Robert Johnson', 'robert.johnson@example.com', 'Life Insurance', 'term', 5760000, 'pending', intermediary2_id);

  -- Insert sample policies
  INSERT INTO policies (policy_number, client_name, product, premium, sum_insured, class_of_business, status, created_by) VALUES
    ('POL-2025-0001', 'Alice Johnson', 'Motor Insurance', 2880000, 50000000, 'Motor', 'active', intermediary1_id),
    ('POL-2025-0002', 'Bob Wilson', 'Property & Fire Insurance', 4320000, 100000000, 'Property', 'active', employee1_id),
    ('POL-2025-0003', 'Carol Davis', 'Life Insurance', 5760000, 200000000, 'Life', 'pending', intermediary2_id);

  -- Insert sample claims
  INSERT INTO claims (claim_number, client_name, policy_number, class_of_business, gross_amount, excess_amount, salvage_amount, other_expense, net_amount, status, created_by) VALUES
    ('CLM-2025-0001', 'Charlie Brown', 'POL-2025-0001', 'Motor', 3000000, 100000, 0, 50000, 2950000, 'submitted', intermediary1_id),
    ('CLM-2025-0002', 'Diana Prince', 'POL-2025-0002', 'Property', 8000000, 200000, 500000, 100000, 7400000, 'processing', employee1_id),
    ('CLM-2025-0003', 'Edward Norton', 'POL-2025-0003', 'Life', 15000000, 0, 0, 25000, 15025000, 'approved', employee2_id);

  -- Insert sample tasks
  INSERT INTO tasks (type, title, assigned_to, priority, due_date, status, created_by) VALUES
    ('underwriting', 'Review High-Value Policy Application', 'Senior Underwriter', 'high', '2025-01-26', 'pending', employee1_id),
    ('finance', 'Verify Payment for Policy POL-2025-0002', 'Finance Team', 'medium', '2025-01-27', 'pending', employee1_id),
    ('quotation', 'Complex Commercial Insurance Quote', 'Marine Specialist', 'high', '2025-01-25', 'in_progress', employee2_id),
    ('underwriting', 'Process Facultative Reinsurance Application', 'Reinsurance Manager', 'medium', '2025-01-28', 'pending', employee2_id);

  -- Insert sample notifications
  INSERT INTO notifications (message, type, user_id) VALUES
    ('New quotation request from intermediary John Doe', 'info', employee1_id),
    ('Policy POL-2025-0001 requires payment approval', 'warning', employee1_id),
    ('Claim CLM-2025-0003 has been approved for payment', 'success', employee2_id),
    ('High-priority underwriting task assigned', 'warning', employee2_id),
    ('Monthly actuarial report is ready for review', 'info', employee1_id);

END $$;