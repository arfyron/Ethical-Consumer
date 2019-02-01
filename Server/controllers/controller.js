const axios = require('axios');
const APIKEYS = require('../../config.js')
module.exports = {
  getExecs : (req, res) => {
    //query api for execs based on company name or SEC ID number
    let {ticker} = req.params;
    axios.get(`https://api.intrinio.com/executives?company=${ticker}&type=us&api_key=${APIKEYS.intrinoAPI}`)
    .then(({data}) => {
      res.send(data)
    })
  },

  getDonations : (req, res) => {
    //get political donations based on exec name.
  }
}