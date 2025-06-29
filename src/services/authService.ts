import { User, UserType } from '../types';

export interface AuthUser {
  id: string;
  name: string;
  type: UserType;
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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Accept any credentials - no validation
      // Default to intermediary type, but this could be customized
      const authUser: AuthUser = {
        id: '1',
        name: username || 'Demo User',
        type: 'intermediary', // Default type
        permissions: this.getUserPermissions('intermediary')
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

  private getUserPermissions(userType: UserType): string[] {
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