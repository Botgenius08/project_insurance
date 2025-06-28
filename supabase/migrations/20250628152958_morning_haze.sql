/*
  # Seed Initial Data

  1. Sample Data
    - Insert sample reinsurers
    - Insert sample brokers
    - Insert chart of accounts
    - Insert currencies
    - Insert sample ledger entries
    - Insert sample budget data

  2. Reference Data
    - Standard insurance industry data
    - Tanzania market specific data
*/

-- Insert sample reinsurers
INSERT INTO reinsurers (code, name, country, rating) VALUES
  ('MUN001', 'Munich Re', 'Germany', 'AA-'),
  ('SWI001', 'Swiss Re', 'Switzerland', 'AA-'),
  ('HAL001', 'Hannover Re', 'Germany', 'AA-'),
  ('SCO001', 'SCOR', 'France', 'AA-'),
  ('LLO001', 'Lloyd''s of London', 'United Kingdom', 'A+')
ON CONFLICT (code) DO NOTHING;

-- Insert sample brokers
INSERT INTO brokers (code, name, country) VALUES
  ('AON001', 'Aon Benfield', 'United Kingdom'),
  ('WIL001', 'Willis Re', 'United Kingdom'),
  ('GUY001', 'Guy Carpenter', 'United States'),
  ('GAL001', 'Gallagher Re', 'United Kingdom'),
  ('JLT001', 'JLT Re', 'United Kingdom')
ON CONFLICT (code) DO NOTHING;

-- Insert chart of accounts
INSERT INTO chart_of_accounts (code, name, type, category) VALUES
  ('1000', 'Cash and Bank', 'Asset', 'Current Assets'),
  ('1100', 'Accounts Receivable', 'Asset', 'Current Assets'),
  ('1200', 'Prepaid Expenses', 'Asset', 'Current Assets'),
  ('1300', 'Inventory', 'Asset', 'Current Assets'),
  ('1500', 'Fixed Assets', 'Asset', 'Non-Current Assets'),
  ('1600', 'Accumulated Depreciation', 'Asset', 'Non-Current Assets'),
  ('1700', 'Intangible Assets', 'Asset', 'Non-Current Assets'),
  ('2000', 'Accounts Payable', 'Liability', 'Current Liabilities'),
  ('2100', 'Accrued Expenses', 'Liability', 'Current Liabilities'),
  ('2200', 'Short-term Loans', 'Liability', 'Current Liabilities'),
  ('2500', 'Technical Reserves', 'Liability', 'Insurance Reserves'),
  ('2600', 'Unearned Premium Reserve', 'Liability', 'Insurance Reserves'),
  ('2700', 'Claims Reserve', 'Liability', 'Insurance Reserves'),
  ('2800', 'IBNR Reserve', 'Liability', 'Insurance Reserves'),
  ('3000', 'Share Capital', 'Equity', 'Capital'),
  ('3100', 'Retained Earnings', 'Equity', 'Reserves'),
  ('3200', 'General Reserve', 'Equity', 'Reserves'),
  ('4100', 'Premium Income', 'Income', 'Insurance Revenue'),
  ('4200', 'Investment Income', 'Income', 'Investment Revenue'),
  ('4300', 'Commission Income', 'Income', 'Other Revenue'),
  ('5100', 'Claims Expense', 'Expense', 'Insurance Expenses'),
  ('5200', 'Reinsurance Expense', 'Expense', 'Insurance Expenses'),
  ('5300', 'Change in Reserves', 'Expense', 'Insurance Expenses'),
  ('6100', 'Operating Expenses', 'Expense', 'Operating Expenses'),
  ('6200', 'Commission Expense', 'Expense', 'Operating Expenses'),
  ('6300', 'Staff Costs', 'Expense', 'Operating Expenses'),
  ('6400', 'Administrative Expenses', 'Expense', 'Operating Expenses'),
  ('6500', 'Depreciation Expense', 'Expense', 'Operating Expenses')
ON CONFLICT (code) DO NOTHING;

-- Insert currencies
INSERT INTO currencies (code, name, rate, symbol) VALUES
  ('TZS', 'Tanzanian Shilling', 1.0000, 'TZS'),
  ('USD', 'US Dollar', 2400.0000, '$'),
  ('EUR', 'Euro', 2600.0000, '€'),
  ('GBP', 'British Pound', 3000.0000, '£'),
  ('KES', 'Kenyan Shilling', 18.5000, 'KSh'),
  ('UGX', 'Ugandan Shilling', 0.65, 'UGX'),
  ('RWF', 'Rwandan Franc', 1.95, 'RWF')
ON CONFLICT (code) DO NOTHING;

-- Insert sample ledger entries
INSERT INTO ledger_entries (date, reference, description, account_code, account_name, debit, credit, currency, exchange_rate, project, cost_center) VALUES
  ('2025-01-15', 'POL-2025-001', 'Premium Income - Motor Insurance', '4100', 'Premium Income', 0, 15000000, 'TZS', 1, 'MOTOR-2025', 'UW001'),
  ('2025-01-15', 'POL-2025-001', 'Commission Expense', '6200', 'Commission Expense', 3750000, 0, 'TZS', 1, 'MOTOR-2025', 'UW001'),
  ('2025-01-15', 'CLM-2025-001', 'Claims Paid - Property', '5100', 'Claims Expense', 8500000, 0, 'TZS', 1, 'PROP-2025', 'CL001'),
  ('2025-01-15', 'INV-2025-001', 'Investment Income - Government Bonds', '4200', 'Investment Income', 0, 2500000, 'TZS', 1, 'INV-2025', 'FIN001'),
  ('2025-01-15', 'EXP-2025-001', 'Office Rent Expense', '6400', 'Administrative Expenses', 5000000, 0, 'TZS', 1, 'ADMIN-2025', 'ADM001')
ON CONFLICT DO NOTHING;

-- Insert sample budget data
INSERT INTO budget_data (account_code, account_name, budget_amount, actual_amount, period) VALUES
  ('4100', 'Premium Income', 1200000000, 450000000, '2025-01'),
  ('5100', 'Claims Expense', 600000000, 125000000, '2025-01'),
  ('6200', 'Commission Expense', 180000000, 67500000, '2025-01'),
  ('6300', 'Staff Costs', 240000000, 85000000, '2025-01'),
  ('6400', 'Administrative Expenses', 120000000, 45000000, '2025-01'),
  ('4200', 'Investment Income', 60000000, 25000000, '2025-01')
ON CONFLICT DO NOTHING;

-- Insert sample fixed assets
INSERT INTO fixed_assets (asset_code, asset_name, category, cost, accumulated_depreciation, depreciation_rate, acquisition_date) VALUES
  ('BLD001', 'Head Office Building', 'Buildings', 500000000, 50000000, 2.5, '2020-01-01'),
  ('VEH001', 'Company Vehicle - Toyota Land Cruiser', 'Motor Vehicles', 80000000, 32000000, 20.0, '2021-06-15'),
  ('IT001', 'Computer Equipment - Dell Workstations', 'Computer Equipment', 25000000, 15000000, 25.0, '2022-03-01'),
  ('FUR001', 'Office Furniture & Fixtures', 'Furniture & Fixtures', 15000000, 6000000, 10.0, '2021-01-01'),
  ('IT002', 'Server Infrastructure', 'Computer Equipment', 20000000, 8000000, 20.0, '2022-01-01')
ON CONFLICT (asset_code) DO NOTHING;

-- Insert sample IBNR calculations
INSERT INTO ibnr_calculations (class_of_business, development_factor, ultimate_loss, paid_loss, calculation_date) VALUES
  ('Motor', 1.25, 125000000, 100000000, '2025-01-15'),
  ('Property', 1.15, 230000000, 200000000, '2025-01-15'),
  ('Marine', 1.30, 65000000, 50000000, '2025-01-15'),
  ('Aviation', 1.40, 140000000, 100000000, '2025-01-15')
ON CONFLICT DO NOTHING;

-- Insert sample UPR calculations
INSERT INTO upr_calculations (policy_number, premium, inception_date, expiry_date, upr_amount, calculation_date) VALUES
  ('POL-2025-0001', 15000000, '2025-01-01', '2025-12-31', 12500000, '2025-01-15'),
  ('POL-2025-0002', 8500000, '2025-01-01', '2025-12-31', 7083333, '2025-01-15'),
  ('POL-2025-0003', 12000000, '2025-01-01', '2025-12-31', 10000000, '2025-01-15')
ON CONFLICT DO NOTHING;

-- Insert sample IFRS 17 data
INSERT INTO ifrs17_data (contract_group, measurement_model, liability_coverage, liability_remaining, contractual_service_margin, risk_adjustment, reporting_date) VALUES
  ('Motor Insurance 2025', 'PAA', 150000000, 125000000, 0, 7500000, '2025-01-15'),
  ('Property Insurance 2025', 'GMM', 300000000, 280000000, 15000000, 14000000, '2025-01-15'),
  ('Marine Insurance 2025', 'PAA', 100000000, 85000000, 0, 5000000, '2025-01-15')
ON CONFLICT DO NOTHING;