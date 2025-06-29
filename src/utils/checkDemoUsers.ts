// Utility to check if demo users exist in the database
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

export const checkDemoUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, user_type, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: error.message };
    }

    console.log('Demo users in database:', data);
    return { success: true, users: data };
  } catch (error) {
    console.error('Error checking demo users:', error);
    return { success: false, error: 'Failed to check demo users' };
  }
};

// Function to verify a specific user exists
export const verifyDemoUser = async (username: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error(`User ${username} not found:`, error);
      return { exists: false, error: error.message };
    }

    if (!data) {
      console.log(`User ${username} does not exist`);
      return { exists: false, error: 'User not found' };
    }

    console.log(`User ${username} found:`, {
      username: data.username,
      user_type: data.user_type,
      created_at: data.created_at,
      is_active: data.is_active
    });

    return { exists: true, user: data };
  } catch (error) {
    console.error(`Error verifying user ${username}:`, error);
    return { exists: false, error: 'Failed to verify user' };
  }
};

// Function to create demo users
export const createDemoUsers = async () => {
  try {
    // Hash the password
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const demoUsers = [
      { username: 'intermediary1', password_hash: passwordHash, user_type: 'intermediary' },
      { username: 'intermediary2', password_hash: passwordHash, user_type: 'intermediary' },
      { username: 'employee1', password_hash: passwordHash, user_type: 'employee' },
      { username: 'employee2', password_hash: passwordHash, user_type: 'employee' },
      { username: 'admin', password_hash: passwordHash, user_type: 'employee' }
    ];

    // Check if users already exist
    const { data: existingUsers } = await supabase
      .from('users')
      .select('username');

    const existingUsernames = existingUsers?.map(u => u.username) || [];
    const usersToCreate = demoUsers.filter(user => !existingUsernames.includes(user.username));

    if (usersToCreate.length === 0) {
      return { success: true, created: 0, message: 'All demo users already exist' };
    }

    // Insert new users
    const { data, error } = await supabase
      .from('users')
      .insert(usersToCreate)
      .select();

    if (error) {
      console.error('Error creating demo users:', error);
      return { success: false, error: error.message };
    }

    console.log('Created demo users:', data);
    return { success: true, created: usersToCreate.length, users: data };

  } catch (error) {
    console.error('Error creating demo users:', error);
    return { success: false, error: 'Failed to create demo users' };
  }
};