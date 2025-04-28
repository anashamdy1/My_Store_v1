
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvjkbgbzkngqdjfqcxbn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2amtiZ2J6a25ncWRqZnFjeGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1Mzk1NzQsImV4cCI6MjA2MTExNTU3NH0.nyMCGsz60RqmXHEdOSdtFzE8MnreOdyslAxF3_dsyIo';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
