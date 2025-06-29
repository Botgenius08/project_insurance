/*
  # Add INSERT policy for users table

  1. Security Changes
    - Add policy to allow INSERT operations on users table
    - This enables demo user creation functionality
    - Policy allows anonymous users to create accounts (needed for demo setup)

  2. Notes
    - This policy is specifically designed to support the demo user creation feature
    - In production, you may want to restrict this further based on your authentication flow
*/

-- Add policy to allow INSERT operations on users table
-- This is needed for demo user creation functionality
CREATE POLICY "Allow demo user creation"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);