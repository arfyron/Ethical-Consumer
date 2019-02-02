const axios = require('axios');
const APIKEYS = require('../../config.js')
const {
  redisClient
} = require('../dbconfig.js')
module.exports = {
  getExecs: (req, res) => {
    //query api for execs based on company ticker
    let {
      ticker
    } = req.params;
    redisClient.get(ticker, (err, result) => {
      if (result !== null) {
        res.send(JSON.parse(result))
      } else {
        axios.get(`https://api.intrinio.com/executives?company=${ticker}&type=us&api_key=${APIKEYS.intrinoAPI}`)
          .then(({
            data
          }) => {
            let names = data.data.map((person) => {
              return person.full_name
            })
            res.send(names)
            redisClient.set(ticker, JSON.stringify(names), 'EX', 60 * 60 * 6, (err, response) => {
              if (err) console.log(err)
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })


  },

  getDonations: (req, res) => {
    //get political donations based on exec name.
    let {
      name
    } = req.params;
    const donationQuery = `https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2018&recipient_committee_type=C&recipient_committee_type=D&recipient_committee_type=E&recipient_committee_type=H&recipient_committee_type=I&recipient_committee_type=N&recipient_committee_type=O&recipient_committee_type=P&recipient_committee_type=Q&recipient_committee_type=S&recipient_committee_type=U&recipient_committee_type=V&recipient_committee_type=W&recipient_committee_type=X&recipient_committee_type=Y&recipient_committee_type=Z&sort_hide_null=true&contributor_type=individual&is_individual=true&contributor_zip=&per_page=100&api_key=${APIKEYS.dataGovAPI}&sort=contribution_receipt_date&contributor_name=${name}`
    axios.get(donationQuery)
      .then(({
        data
      }) => {
        res.send(data.results)
      })
      .catch(err => {
        console.log(err)
      })

  }
}