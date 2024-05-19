const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const csvtojson = require('csvtojson');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const csvUrl = 'https://data.bts.gov/resource/7m5x-ubud.csv';

async function uploadData() {
    try {
        const response = await axios.get(csvUrl);
        const data = await csvtojson().fromString(response.data);

        for (const station of data) {
            const { error } = await supabase
                .from('stations')
                .insert([
                    {
                        fac_id: station.FAC_ID,
                        bike_id: station.BIKE_ID,
                        system_id: station.SYSTEM_ID,
                        system_name: station.SYSTEM_NAME,
                        year: parseInt(station.YEAR),
                        asofdate: station.ASOFDATE,
                        fac_name: station.FAC_NAME,
                        address: station.ADDRESS,
                        city: station.CITY,
                        state: station.STATE,
                        zipcode: station.ZIPCODE,
                        cbsa_code: station.CBSA_CODE,
                        longitude: parseFloat(station.LONGITUDE),
                        latitude: parseFloat(station.LATITUDE),
                        station_type: station.STATION_TYPE,
                        launch_date: station.launchDate ? new Date(station.launchDate) : null,
                        end_date: station.endDate ? new Date(station.endDate) : null
                    }
                ]);

            if (error) {
                console.error('Error inserting data:', error.message);
            }
        }

        console.log('Data upload completed');
    } catch (error) {
        console.error('Error downloading or processing data:', error.message);
    }
}

uploadData();
