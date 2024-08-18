// supabase-config.js

import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://cgqwklizyykmrurgbeoh.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);