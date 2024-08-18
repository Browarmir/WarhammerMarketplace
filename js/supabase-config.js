import { createClient } from '@supabase/supabase-js';

// Your Supabase project URL and public ANON_KEY
const supabaseUrl = 'https://cgqwklizyykmrurgbeoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncXdrbGl6eXlrbXJ1cmdiZW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMDIwMTUsImV4cCI6MjAzOTU3ODAxNX0.L0vvjYinKNGkPNgh-PqHYMuHzTjuDC-_URFFajt7aOU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;