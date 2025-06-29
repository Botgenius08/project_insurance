// Utility to check if demo users exist in the database
import { supabase } from '../lib/supabase';

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
      .single();

    if (error) {
      console.error(`User ${username} not found:`, error);
      return { exists: false, error: error.message };
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