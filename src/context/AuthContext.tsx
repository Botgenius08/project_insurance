import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserType } from '../types';
import { getUserPermissions } from '../utils/rolePermissions';
import { supabase } from '../lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (username: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUser.id)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        setUser(null);
      } else if (userProfile) {
        setUser({
          id: parseInt(userProfile.id),
          name: userProfile.name,
          type: userProfile.user_type,
          permissions: userProfile.permissions || getUserPermissions(userProfile.user_type),
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      setLoading(true);
      
      // For demo purposes, create a demo email based on username and user type
      const email = `${username.toLowerCase().replace(/\s+/g, '')}.${userType}@example.com`;
      
      // Try to sign in first
      let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'demo123', // Default password for demo
      });

      // If sign in fails, try to sign up (for demo purposes)
      if (signInError) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password: password || 'demo123',
        });

        if (signUpError) {
          console.error('Auth error:', signUpError);
          return false;
        }

        signInData = signUpData;
      }

      if (signInData.user) {
        // Check if user profile exists
        const { data: existingProfile } = await supabase
          .from('users')
          .select('*')
          .eq('auth_user_id', signInData.user.id)
          .single();

        if (!existingProfile) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              auth_user_id: signInData.user.id,
              name: username || 'Demo User',
              user_type: userType,
              permissions: getUserPermissions(userType),
            });

          if (profileError) {
            console.error('Error creating user profile:', profileError);
            return false;
          }
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = !!session && !!user;

  const value: AuthContextType = {
    user,
    session,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};