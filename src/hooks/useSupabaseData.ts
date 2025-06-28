import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useSupabaseData<T>(
  table: string,
  select: string = '*',
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: result, error } = await supabase
          .from(table)
          .select(select);

        if (error) {
          setError(error.message);
          console.error(`Error fetching ${table}:`, error);
        } else {
          setData(result || []);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(`Error fetching ${table}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, select, session, ...dependencies]);

  const refetch = async () => {
    if (!session) return;
    
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from(table)
        .select(select);

      if (error) {
        setError(error.message);
        console.error(`Error refetching ${table}:`, error);
      } else {
        setData(result || []);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error(`Error refetching ${table}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useSupabaseInsert<T>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insert = async (data: Partial<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) {
        setError(error.message);
        console.error(`Error inserting into ${table}:`, error);
        return null;
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error(`Error inserting into ${table}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { insert, loading, error };
}

export function useSupabaseUpdate<T>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: Partial<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        setError(error.message);
        console.error(`Error updating ${table}:`, error);
        return null;
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error(`Error updating ${table}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}