# Developer Manual:
This application leverages the Google Maps API, Supabase, and nodeJS.

===============
Installation

Clone the necessary files from this repository to your main directory in your web server.
To install this application first install nodeJS then use NPM to install body-parser, express, and nodemon. The supabase url and key will be provided to you. 
===============
Running the Server

All you need to do is run "npm start" on your server and the application will begin running.
Access the application on localhost:3001

===============
Testing

No tests currently are present in the software

===============
The Backend APIs

'/' - GET - Fetches all stations from College Park
'/l' - POST - This API endpoint will add a station that the user puts into the fields. 

===============
Future development

Currently, no bugs are known with the application
In the future, a user login system should be implemented
A way to remove a sharebike/e-scooter station entry from the existing database should be implemented


SUPABASE_URL=https://bnrppscgxzwwfrctdjkz.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucnBwc2NneHp3d2ZyY3Rkamt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzYxMTQsImV4cCI6MjAzMTY1MjExNH0.hxwEw-lT6a68SggGME-_uUPwu8IajiJJJf95Cf0Uxs8