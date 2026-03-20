const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ytteogphzphdfkjxglxn.supabase.co';
const supabaseAnonKey = 'sb_publishable_Mc8AWoh4tD8YpaYTwa21Tw_4ijHrfFt';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
    console.log('--- About Table ---');
    const { data: about, error: aboutError } = await supabase.from('about').select('*').limit(1);
    if (aboutError) console.error(aboutError);
    else console.log('Columns:', Object.keys(about[0] || {}));

    console.log('\n--- Contact Info Table ---');
    const { data: contact, error: contactError } = await supabase.from('contact_info').select('*').limit(1);
    if (contactError) console.error(contactError);
    else console.log('Columns:', Object.keys(contact[0] || {}));
}

checkSchema();
