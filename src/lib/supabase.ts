import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
const allowMockBackend = import.meta.env.VITE_ALLOW_MOCK_BACKEND === 'true';
const isProd = import.meta.env.PROD;

type MockRow = Record<string, unknown>;
type MockDatabase = Record<string, MockRow[]>;

const createMockClient = () => {
  const mockDatabase: MockDatabase = {
    user_profiles: [],
    meal_tables: [],
  };

  const byTable = (table: string) => {
    if (!mockDatabase[table]) {
      mockDatabase[table] = [];
    }
    return mockDatabase[table];
  };

  const buildQuery = (table: string, rows: MockRow[] = byTable(table)) => ({
    order: async () => ({ data: rows, error: null }),
    eq: (column: string, value: unknown) =>
      buildQuery(
        table,
        rows.filter((row) => row[column] === value),
      ),
    single: async () => ({ data: rows[0] || null, error: null }),
    then: (resolve: (value: { data: MockRow[]; error: null }) => void) => resolve({ data: rows, error: null }),
  });

  const insertRows = (table: string, payload: MockRow | MockRow[]) => {
    const list = byTable(table);
    const normalized = Array.isArray(payload) ? payload : [payload];
    const inserted = normalized.map((item) => ({
      id: item.id || crypto.randomUUID(),
      ...item,
    }));
    list.push(...inserted);

    return {
      select: () => ({
        single: async () => ({ data: inserted[0] || null, error: null }),
      }),
      then: (resolve: (value: { data: MockRow[]; error: null }) => void) => resolve({ data: inserted, error: null }),
    };
  };

  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signInWithOAuth: () => Promise.resolve({ data: { provider: 'google', url: null }, error: null }),
      resetPasswordForEmail: () => Promise.resolve({ data: {}, error: null }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: (table: string) => ({
      select: () => buildQuery(table),
      insert: (payload: MockRow | MockRow[]) => insertRows(table, payload),
      update: () => ({ then: (resolve: (value: { data: null; error: null }) => void) => resolve({ data: null, error: null }) }),
      delete: () => ({ then: (resolve: (value: { data: null; error: null }) => void) => resolve({ data: null, error: null }) }),
    }),
  };
};

if (!hasSupabaseConfig && isProd && !allowMockBackend) {
  throw new Error(
    'Supabase env vars are missing in production. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, or explicitly set VITE_ALLOW_MOCK_BACKEND=true.',
  );
}

if (!hasSupabaseConfig) {
  console.warn(
    'Supabase env vars are missing. Using local mock client.',
  );
}

export const supabase: any = hasSupabaseConfig
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : createMockClient();
