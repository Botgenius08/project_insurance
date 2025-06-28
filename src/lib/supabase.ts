import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_user_id: string;
          name: string;
          user_type: 'intermediary' | 'employee';
          permissions: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          name: string;
          user_type: 'intermediary' | 'employee';
          permissions?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          name?: string;
          user_type?: 'intermediary' | 'employee';
          permissions?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      quotations: {
        Row: {
          id: string;
          client_name: string;
          client_email: string | null;
          client_phone: string | null;
          product: string;
          coverage_type: string | null;
          vehicle_value: number | null;
          vehicle_usage: string | null;
          property_type: string | null;
          property_value: number | null;
          property_location: string | null;
          coverage_details: string | null;
          amount: number;
          status: 'pending' | 'approved' | 'rejected';
          date: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_email?: string | null;
          client_phone?: string | null;
          product: string;
          coverage_type?: string | null;
          vehicle_value?: number | null;
          vehicle_usage?: string | null;
          property_type?: string | null;
          property_value?: number | null;
          property_location?: string | null;
          coverage_details?: string | null;
          amount: number;
          status?: 'pending' | 'approved' | 'rejected';
          date?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_email?: string | null;
          client_phone?: string | null;
          product?: string;
          coverage_type?: string | null;
          vehicle_value?: number | null;
          vehicle_usage?: string | null;
          property_type?: string | null;
          property_value?: number | null;
          property_location?: string | null;
          coverage_details?: string | null;
          amount?: number;
          status?: 'pending' | 'approved' | 'rejected';
          date?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
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
          leader_insurer: string | null;
          facultative_share: number | null;
          status: 'active' | 'pending' | 'expired';
          created_by: 'intermediary' | 'employee' | null;
          inception_date: string | null;
          expiry_date: string | null;
          created_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          policy_number: string;
          client_name: string;
          product: string;
          premium: number;
          sum_insured?: number | null;
          class_of_business?: string | null;
          leader_insurer?: string | null;
          facultative_share?: number | null;
          status?: 'active' | 'pending' | 'expired';
          created_by?: 'intermediary' | 'employee' | null;
          inception_date?: string | null;
          expiry_date?: string | null;
          created_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          policy_number?: string;
          client_name?: string;
          product?: string;
          premium?: number;
          sum_insured?: number | null;
          class_of_business?: string | null;
          leader_insurer?: string | null;
          facultative_share?: number | null;
          status?: 'active' | 'pending' | 'expired';
          created_by?: 'intermediary' | 'employee' | null;
          inception_date?: string | null;
          expiry_date?: string | null;
          created_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      claims: {
        Row: {
          id: string;
          claim_number: string;
          policy_number: string | null;
          client_name: string;
          class_of_business: string | null;
          gross_amount: number | null;
          excess_amount: number | null;
          salvage_amount: number | null;
          other_expense: number | null;
          net_amount: number | null;
          amount: number;
          status: 'submitted' | 'processing' | 'approved' | 'rejected';
          date_of_loss: string | null;
          date_reported: string | null;
          claim_description: string | null;
          date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          claim_number: string;
          policy_number?: string | null;
          client_name: string;
          class_of_business?: string | null;
          gross_amount?: number | null;
          excess_amount?: number | null;
          salvage_amount?: number | null;
          other_expense?: number | null;
          amount: number;
          status?: 'submitted' | 'processing' | 'approved' | 'rejected';
          date_of_loss?: string | null;
          date_reported?: string | null;
          claim_description?: string | null;
          date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          claim_number?: string;
          policy_number?: string | null;
          client_name?: string;
          class_of_business?: string | null;
          gross_amount?: number | null;
          excess_amount?: number | null;
          salvage_amount?: number | null;
          other_expense?: number | null;
          amount?: number;
          status?: 'submitted' | 'processing' | 'approved' | 'rejected';
          date_of_loss?: string | null;
          date_reported?: string | null;
          claim_description?: string | null;
          date?: string;
          created_at?: string;
          updated_at?: string;
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
          status: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'underwriting' | 'finance' | 'quotation';
          title: string;
          assigned_to: string;
          priority?: 'high' | 'medium' | 'low';
          due_date: string;
          status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'underwriting' | 'finance' | 'quotation';
          title?: string;
          assigned_to?: string;
          priority?: 'high' | 'medium' | 'low';
          due_date?: string;
          status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          message: string;
          type: 'info' | 'warning' | 'error' | 'success';
          time: string;
          user_id: string | null;
          read: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          message: string;
          type?: 'info' | 'warning' | 'error' | 'success';
          time: string;
          user_id?: string | null;
          read?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          message?: string;
          type?: 'info' | 'warning' | 'error' | 'success';
          time?: string;
          user_id?: string | null;
          read?: boolean | null;
          created_at?: string;
        };
      };
    };
  };
}