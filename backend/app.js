const axios = require('axios');
//require dotenv 
require('dotenv').config();
const apiKey = process.env.API_KEY;
;
//express, cors, bodyparser for backend server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001 || process.env.PORT;

// const config = {
//   headers: {
//     Authorization: `Bearer ${apiKey}`,
//   },
//   params: {
//     term: "restaurants",
//     location: "Turlock,CA",
//     radius: 1000,
//     sort_by: "rating",
//     limit: 50
//   }
// };

app.use(cors());
app.use(bodyParser.json());
app.get('/', async (req, res)=> {
  try{
  const data = await axios.get("https://api.yelp.com/v3/businesses/search",{
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: {
      location: req.body.location,
      radius: 1000,
      categories: "Breweries",
      sort_by: "best_match",
      limit: 50
    }
  }
  )
  .then((response) => {
    return response.data; //These are the results sent back from the API!
  })
  
  res.send(data);
  }catch(err){
    console.log(err.response);
  }
});

app.get('/id', async (req, res)=> {
  try{
    const data = await axios.get("https://api.yelp.com/v3/businesses/search", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        term: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        radius: 1000,
        sort_by: "best_match",
        limit: 50
      }
    })
    .then(response =>{
      return response.data
    })

    res.send(data);
    console.log('Data sent successfully')
  }catch(err){
    console.log(err.response);
  }
})
app.listen(port, ()=> console.log(`Backend server listening at http://localhost:${port}`));
