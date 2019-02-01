const axios = require('axios');
const APIKEYS = require('../../config.js')
module.exports = {
  getExecs : (req, res) => {
    //query api for execs based on company ticker
    let {ticker} = req.params;
    axios.get(`https://api.intrinio.com/executives?company=${ticker}&type=us&api_key=${APIKEYS.intrinoAPI}`)
    .then(({data}) => {
      res.send(data.data) //Axios returns an object with a data property and the API itself contains a data array in that axios data property.
    })
  },

  getDonations : (req, res) => {
    //get political donations based on exec name.
  }
}