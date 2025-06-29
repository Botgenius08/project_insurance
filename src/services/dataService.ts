import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import { authService } from './authService';

type Quotation = Database['public']['Tables']['quotations']['Row'];
type Policy = Database['public']['Tables']['policies']['Row'];
type Claim = Database['public']['Tables']['claims']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];

class DataService {
  // Quotations
  async getQuotations(): Promise<Quotation[]> {
    const { data, error } = await supabase
      .from('quotations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching quotations:', error);
      return [];
    }

    return data || [];
  }

  async createQuotation(quotation: Database['public']['Tables']['quotations']['Insert']): Promise<boolean> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return false;

    const { error } = await supabase
      .from('quotations')
      .insert({
        ...quotation,
        created_by: currentUser.id
      });

    if (error) {
      console.error('Error creating quotation:', error);
      return false;
    }

    return true;
  }

  // Policies
  async getPolicies(): Promise<Policy[]> {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching policies:', error);
      return [];
    }

    return data || [];
  }

  async createPolicy(policy: Database['public']['Tables']['policies']['Insert']): Promise<boolean> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return false;

    const { error } = await supabase
      .from('policies')
      .insert({
        ...policy,
        created_by: currentUser.id
      });

    if (error) {
      console.error('Error creating policy:', error);
      return false;
    }

    return true;
  }

  // Claims
  async getClaims(): Promise<Claim[]> {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching claims:', error);
      return [];
    }

    return data || [];
  }

  async createClaim(claim: Database['public']['Tables']['claims']['Insert']): Promise<boolean> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return false;

    const { error } = await supabase
      .from('claims')
      .insert({
        ...claim,
        created_by: currentUser.id
      });

    if (error) {
      console.error('Error creating claim:', error);
      return false;
    }

    return true;
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }

    return data || [];
  }

  async updateTask(taskId: string, updates: Database['public']['Tables']['tasks']['Update']): Promise<boolean> {
    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task:', error);
      return false;
    }

    return true;
  }

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  }

  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  }
}

export const dataService = new DataService();