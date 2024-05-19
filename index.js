const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables are required.');
  process.exit(1);
}

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('public/home.html', { root: __dirname });
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/college-park-stations', async (req, res) => {
  console.log('GET /api/college-park-stations');
  try {
    const { data, error, count } = await supabase
      .from('stations')
      .select('*', { count: 'exact' })
      .eq('SYSTEM_NAME', 'College Park');

    if (error) {
      throw error;
    }

    console.log('Fetched College Park stations:', data);
    console.log('Total count:', count);

    res.json({ count, data });
  } catch (error) {
    console.error('Error fetching College Park stations:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/api/stations', async (req, res) => {
  console.log('POST /api/stations');
  try {
    const fields = [
      'the_geom', 'ID', 'FAC_ID', 'BIKE_ID', 'SYSTEM_ID', 'SYSTEM_NAME', 'YEAR', 'ASOFDATE', 'FAC_NAME', 
      'ADDRESS', 'CITY', 'STATE', 'ZIPCODE', 'CBSA_CODE', 'LONGITUDE', 'LATITUDE', 'STATION_TYPE', 
      'launchDate', 'endDate'
    ];

    const station = {};
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        station[field] = req.body[field];
      }
    });

    console.log('Station data to be inserted:', station);

    const { data, error } = await supabase
      .from('stations')
      .insert([station]);

    if (error) {
      throw error;
    }

    console.log('Inserted station:', data);

    res.status(201).json({ message: 'Station added successfully', data });
  } catch (error) {
    console.error('Error adding station:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
