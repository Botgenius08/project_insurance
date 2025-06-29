export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          password_hash: string;
          user_type: 'intermediary' | 'employee';
          created_at: string;
          last_login: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          username: string;
          password_hash: string;
          user_type: 'intermediary' | 'employee';
          created_at?: string;
          last_login?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          username?: string;
          password_hash?: string;
          user_type?: 'intermediary' | 'employee';
          created_at?: string;
          last_login?: string | null;
          is_active?: boolean;
        };
      };
      quotations: {
        Row: {
          id: string;
          client_name: string;
          client_email: string | null;
          product: string;
          coverage: string | null;
          amount: number;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_email?: string | null;
          product: string;
          coverage?: string | null;
          amount: number;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_email?: string | null;
          product?: string;
          coverage?: string | null;
          amount?: number;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          created_by?: string;
        };
      };
      policies: {
        Row: {
          id: string;
          policy_number: string;
          client_name: string;
          product: string;
          premium: number;
          sum_insured: number | null;
          class_of_business: string | null;
          status: 'active' | 'pending' | 'expired';
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          policy_number: string;
          client_name: string;
          product: string;
          premium: number;
          sum_insured?: number | null;
          class_of_business?: string | null;
          status?: 'active' | 'pending' | 'expired';
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          policy_number?: string;
          client_name?: string;
          product?: string;
          premium?: number;
          sum_insured?: number | null;
          class_of_business?: string | null;
          status?: 'active' | 'pending' | 'expired';
          created_at?: string;
          created_by?: string;
        };
      };
      claims: {
        Row: {
          id: string;
          claim_number: string;
          client_name: string;
          policy_number: string | null;
          class_of_business: string | null;
          gross_amount: number | null;
          excess_amount: number | null;
          salvage_amount: number | null;
          other_expense: number | null;
          net_amount: number;
          status: 'submitted' | 'processing' | 'approved' | 'rejected';
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          claim_number: string;
          client_name: string;
          policy_number?: string | null;
          class_of_business?: string | null;
          gross_amount?: number | null;
          excess_amount?: number | null;
          salvage_amount?: number | null;
          other_expense?: number | null;
          net_amount: number;
          status?: 'submitted' | 'processing' | 'approved' | 'rejected';
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          claim_number?: string;
          client_name?: string;
          policy_number?: string | null;
          class_of_business?: string | null;
          gross_amount?: number | null;
          excess_amount?: number | null;
          salvage_amount?: number | null;
          other_expense?: number | null;
          net_amount?: number;
          status?: 'submitted' | 'processing' | 'approved' | 'rejected';
          created_at?: string;
          created_by?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          type: 'underwriting' | 'finance' | 'quotation';
          title: string;
          assigned_to: string;
          priority: 'high' | 'medium' | 'low';
          due_date: string;
          status: string;
          created_at: string;
          created_by: string;
        };
        Insert: {
          id?: string;
          type: 'underwriting' | 'finance' | 'quotation';
          title: string;
          assigned_to: string;
          priority: 'high' | 'medium' | 'low';
          due_date: string;
          status?: string;
          created_at?: string;
          created_by: string;
        };
        Update: {
          id?: string;
          type?: 'underwriting' | 'finance' | 'quotation';
          title?: string;
          assigned_to?: string;
          priority?: 'high' | 'medium' | 'low';
          due_date?: string;
          status?: string;
          created_at?: string;
          created_by?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          message: string;
          type: 'info' | 'warning' | 'error' | 'success';
          user_id: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          message: string;
          type: 'info' | 'warning' | 'error' | 'success';
          user_id: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          message?: string;
          type?: 'info' | 'warning' | 'error' | 'success';
          user_id?: string;
          read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}