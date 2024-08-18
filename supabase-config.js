const { createClient } = supabase;

const SUPABASE_URL = 'https://cgqwklizyykmrurgbeoh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncXdrbGl6eXlrbXJ1cmdiZW9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMDIwMTUsImV4cCI6MjAzOTU3ODAxNX0.L0vvjYinKNGkPNgh-PqHYMuHzTjuDC-_URFFajt7aOU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);