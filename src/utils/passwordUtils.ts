import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Utility function to generate test user credentials
export const generateTestCredentials = async () => {
  const password = 'password123';
  const hash = await hashPassword(password);
  
  console.log('Test credentials:');
  console.log('Password:', password);
  console.log('Hash:', hash);
  
  return { password, hash };
};