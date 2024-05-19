const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('public/home.html', { root: __dirname });
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/college-park-stations', async (req, res) => {
  try {
    const { data, error, count } = await supabase
      .from('stations')
      .select('*', { count: 'exact' })
      .eq('SYSTEM_NAME', 'College Park');

    if (error) {
      throw error;
    }

    console.log('Data:', data);
    console.log('Count:', count);

    res.json({ count,});
  } catch (error) {
    console.error('Error fetching College Park stations:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
