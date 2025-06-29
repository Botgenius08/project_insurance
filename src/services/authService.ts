import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { Database } from '../types/database';

type User = Database['public']['Tables']['users']['Row'];

export interface AuthUser {
  id: string;
  username: string;
  user_type: 'intermediary' | 'employee';
  permissions: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

class AuthService {
  private currentUser: AuthUser | null = null;

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const { username, password } = credentials;

      // Fetch user from database - using maybeSingle() to avoid console errors when no user found
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Database error during login:', error);
        return {
          success: false,
          error: 'An error occurred during login'
        };
      }

      if (!user) {
        return {
          success: false,
          error: 'Invalid username or password'
        };
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Invalid username or password'
        };
      }

      // Update last login timestamp
      await supabase.rpc('update_last_login', { user_id: user.id });

      // Create auth user object
      const authUser: AuthUser = {
        id: user.id,
        username: user.username,
        user_type: user.user_type,
        permissions: this.getUserPermissions(user.user_type)
      };

      this.currentUser = authUser;

      return {
        success: true,
        user: authUser
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An error occurred during login'
      };
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  private getUserPermissions(userType: 'intermediary' | 'employee'): string[] {
    const permissions = {
      intermediary: [
        'view_quotations',
        'create_quotations',
        'manage_quotations',
        'view_policies',
        'manage_policies',
        'view_claims',
        'lodge_claims'
      ],
      employee: [
        'view_tasks',
        'manage_tasks',
        'view_approvals',
        'process_approvals',
        'underwriting',
        'finance_operations',
        'reinsurance_management',
        'actuarial_analysis',
        'claims_processing'
      ]
    };

    return permissions[userType] || [];
  }

  hasPermission(permission: string): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  canAccessModule(module: string): boolean {
    if (!this.currentUser) return false;

    const modulePermissions: Record<string, string[]> = {
      quotations: ['view_quotations'],
      policies: ['view_policies'],
      claims: ['view_claims'],
      finance: ['finance_operations'],
      underwriting: ['underwriting'],
      reinsurance: ['reinsurance_management'],
      actuarial: ['actuarial_analysis'],
      tasks: ['view_tasks'],
      approvals: ['view_approvals']
    };

    const requiredPermissions = modulePermissions[module] || [];
    return requiredPermissions.some(permission => this.hasPermission(permission));
  }
}

export const authService = new AuthService();