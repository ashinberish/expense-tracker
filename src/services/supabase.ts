import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    'https://vqdwswqxjtbwnvywsaiv.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZHdzd3F4anRid252eXdzYWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NzU3MzEsImV4cCI6MjAyMzE1MTczMX0.apq1ZyQN_XejgEHIXSAhIXKiNic43dUDldA1mXz9gBs'
)
