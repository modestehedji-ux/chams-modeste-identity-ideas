const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const NEW_SUBTITLE_FR = "PHILOSOPHIE · DROITS HUMAINS · CRÉATION NUMÉRIQUE";
const NEW_DESCRIPTION_FR = "J'accompagne institutions, chercheurs et porteurs de projets dans la compréhension des enjeux identitaires africains à l'ère numérique — et dans leur transition vers l'intelligence artificielle.";

async function syncHero() {
    console.log('Fetching current hero data...');
    const { data: hero, error: fetchError } = await supabase.from('hero').select('*').single();
    
    if (fetchError) {
        console.error('Error fetching hero:', fetchError);
        return;
    }

    console.log('Current data found ID:', hero.id);
    console.log('Updating with new texts...');

    const { data: updated, error: updateError } = await supabase
        .from('hero')
        .update({
            subtitle_fr: NEW_SUBTITLE_FR,
            description_fr: NEW_DESCRIPTION_FR,
            updated_at: new Date().toISOString()
        })
        .eq('id', hero.id)
        .select()
        .single();

    if (updateError) {
        console.error('Error updating hero:', updateError);
    } else {
        console.log('✅ Successfully updated Supabase hero data!');
        console.log('New Subtitle:', updated.subtitle_fr);
    }
}

syncHero();
