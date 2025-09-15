// Konfigurasi Supabase - Ganti dengan URL dan Key Anda
const SUPABASE_URL = 'https://scernchnrrfmdxtqrxrd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjZXJuY2hucnJmbWR4dHFyeHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTYxNDYsImV4cCI6MjA3MjM3MjE0Nn0.UWUcsuPl5JJ7Batu6PBt4gMyTiosTqTQJ6Ile0eFV_U';

// Inisialisasi Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database Functions
async function getAPBDData(filters = {}) {
    try {
        let query = supabase.from('apbd_data').select('*');
        
        if (filters.kategori) {
            query = query.eq('kategori', filters.kategori);
        }
        if (filters.tahun) {
            query = query.eq('tahun', filters.tahun);
        }
        
        const { data, error } = await query.order('tahun', { ascending: true });
        
        if (error) throw error;
        return data || [];
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function insertAPBDData(data) {
    try {
        const { data: result, error } = await supabase
            .from('apbd_data')
            .insert([{
                tahun: data.tahun,
                kategori: data.kategori,
                subkategori: data.subkategori,
                jumlah: data.jumlah
            }]);
            
        if (error) throw error;
        return result;
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}

async function deleteAPBDData(id) {
    try {
        const { data, error } = await supabase
            .from('apbd_data')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}
