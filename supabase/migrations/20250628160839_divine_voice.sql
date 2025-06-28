/*
  # Create Demo User Setup

  This migration prepares the system for demo users by creating sample data
  that will be linked to users when they sign up through the application.
  
  The actual user authentication records will be created automatically
  when users sign up with the specified email addresses.
*/

-- Create some sample data that can be used by demo users
-- This avoids the foreign key constraint issue by not creating user profiles
-- until the actual auth users exist

-- Insert sample quotations data
INSERT INTO quotations (
  client_name,
  client_email,
  client_phone,
  product,
  coverage_type,
  amount,
  status,
  date
) VALUES 
(
  'Demo Client 1',
  'democlient1@example.com',
  '+255123456789',
  'Motor Insurance',
  'comprehensive',
  2500000,
  'pending',
  CURRENT_DATE
),
(
  'Demo Client 2', 
  'democlient2@example.com',
  '+255987654321',
  'Property & Fire Insurance',
  'comprehensive',
  5000000,
  'approved',
  CURRENT_DATE - INTERVAL '1 day'
);

-- Insert sample policies data
INSERT INTO policies (
  policy_number,
  client_name,
  product,
  premium,
  sum_insured,
  class_of_business,
  status,
  created_by,
  inception_date,
  expiry_date,
  created_date
) VALUES
(
  'POL-2025-DEMO-001',
  'Demo Insured 1',
  'Motor Insurance',
  2500000,
  50000000,
  'Motor',
  'active',
  'intermediary',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '1 year',
  CURRENT_DATE
),
(
  'POL-2025-DEMO-002',
  'Demo Insured 2',
  'Property & Fire Insurance', 
  5000000,
  100000000,
  'Property',
  'active',
  'employee',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '1 year',
  CURRENT_DATE
);

-- Insert sample claims data
INSERT INTO claims (
  claim_number,
  policy_number,
  client_name,
  class_of_business,
  gross_amount,
  excess_amount,
  salvage_amount,
  other_expense,
  amount,
  status,
  date_of_loss,
  date_reported,
  claim_description,
  date
) VALUES
(
  'CLM-2025-DEMO-001',
  'POL-2025-DEMO-001',
  'Demo Insured 1',
  'Motor',
  3000000,
  100000,
  0,
  50000,
  2950000,
  'submitted',
  CURRENT_DATE - INTERVAL '5 days',
  CURRENT_DATE - INTERVAL '3 days',
  'Vehicle accident claim - rear-end collision',
  CURRENT_DATE - INTERVAL '3 days'
),
(
  'CLM-2025-DEMO-002',
  'POL-2025-DEMO-002',
  'Demo Insured 2',
  'Property',
  8000000,
  200000,
  500000,
  100000,
  7400000,
  'processing',
  CURRENT_DATE - INTERVAL '10 days',
  CURRENT_DATE - INTERVAL '8 days',
  'Fire damage to commercial property',
  CURRENT_DATE - INTERVAL '8 days'
);

-- Insert sample tasks data
INSERT INTO tasks (
  type,
  title,
  assigned_to,
  priority,
  due_date,
  status
) VALUES
(
  'underwriting',
  'Review high-value property insurance application',
  'Senior Underwriter',
  'high',
  CURRENT_DATE + INTERVAL '2 days',
  'pending'
),
(
  'finance',
  'Process premium payment for POL-2025-DEMO-001',
  'Finance Team',
  'medium',
  CURRENT_DATE + INTERVAL '1 day',
  'pending'
),
(
  'quotation',
  'Prepare complex marine insurance quotation',
  'Marine Specialist',
  'high',
  CURRENT_DATE + INTERVAL '3 days',
  'in_progress'
);

-- Note: User profiles will be created automatically when users sign up
-- Demo login credentials:
-- Intermediary: ezrandosi@gmail.com (password: ezra.)
-- Employee: ezrandosi.employee@gmail.com (password: ezran.)

-- The application's authentication system will handle user creation and profile linking