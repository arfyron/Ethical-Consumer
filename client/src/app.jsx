import React from "react";
import ReactDom from "react-dom";
import axios from "axios";

import DonationTable from './components/donationTable.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCompany: "",
      formData: "",
      donationData: [],
      companyExecs: [],
      currentExec: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTickerSearch = this.handleTickerSearch.bind(this);
    this.handleDonationSearch = this.handleDonationSearch.bind(this)
  }

  handleTickerSearch(e) {
    e.preventDefault();
    axios
      .get(`/execs/${this.state.formData}`)
      .then(({ data }) => {
        this.setState({
          companyExecs: data
        });
        this.setState({
          currentCompany: this.state.formData
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({
      formData: e.target.value
    });
  }

  handleDonationSearch(e) {
    e.preventDefault();
    let name = e.target.innerHTML
    let axiosName = name.split(' ').slice(1).join('%20')
    axios.get(`/donations/${axiosName}`)
    .then(({data}) => {
      console.log(data);
      this.setState({
        donationData : data,
        currentExec : name
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>Ethical Consumer.</h1>
        <h2>Type in publically traded company's ticker.</h2>
        <h3>
          <a
            target="_blank"
            href="https://www.bloomberg.com/markets/symbolsearch/"
          >
            Use this site to search for a ticker.
          </a>
        </h3>
        <br />
        <br />

        <form onSubmit={this.handleTickerSearch}>
          <div>
            <input
              type="text"
              value={this.state.formData}
              onChange={this.handleChange}
            />
          </div>
          <button>Search for Executives</button>
        </form>
        <br />
        <br />
        {this.state.companyExecs.map((exec, i) => {
          return <button id='test' onClick={this.handleDonationSearch} key={i}>{exec}</button>;
        })}
        <br />
        <br />
        <DonationTable exec={this.state.currentExec} data={this.state.donationData}/>
      </React.Fragment>
    );
  }
}

ReactDom.render(<App />, document.getElementById("App"));
/*
[
  {
    candidate_prefix: null,
    report_year: 2018,
    contributor_prefix: null,
    committee_id: "C00401224",
    receipt_type_full: "EARMARK",
    candidate_name: null,
    conduit_committee_zip: null,
    committee_name: null,
    contributor_city: "BROOKLYN",
    file_number: 1300352,
    line_number_label:
      "Contributions From Individuals/Persons Other Than Political Committees",
    two_year_transaction_period: 2018,
    candidate_office: null,
    conduit_committee_street1: null,
    unused_contbr_id: null,
    transaction_id: "SA11AI_136481899",
    contributor_suffix: null,
    conduit_committee_city: null,
    candidate_office_state_full: null,
    entity_type_desc: "INDIVIDUAL",
    candidate_suffix: null,
    contributor_middle_name: null,
    memo_code_full: null,
    contributor_state: "NY",
    conduit_committee_state: null,
    recipient_committee_type: "W",
    candidate_middle_name: null,
    amendment_indicator_desc: "ADD",
    filing_form: "F3X",
    contributor_last_name: "EFRON",
    memoed_subtotal: false,
    back_reference_schedule_name: null,
    national_committee_nonfederal_account: null,
    committee: {
      organization_type: null,
      name: "ACTBLUE",
      designation: "U",
      street_2: null,
      candidate_ids: [],
      filing_frequency: "M",
      zip: "02144",
      designation_full: "Unauthorized",
      committee_type_full: "PAC with Non-Contribution Account - Qualified",
      cycle: 2018,
      party: null,
      state_full: "Massachusetts",
      committee_id: "C00401224",
      party_full: null,
      street_1: "P.O. BOX 441146",
      treasurer_name: "HILL, ERIN",
      cycles: [2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020],
      committee_type: "W",
      city: "SOMERVILLE",
      organization_type_full: null,
      state: "MA"
    },
    increased_limit: null,
    link_id: 4120920181620675198,
    candidate_office_district: null,
    candidate_first_name: null,
    conduit_committee_id: null,
    contributor: null,
    contributor_name: "EFRON, ARI",
    memo_code: null,
    report_type: "30G",
    candidate_id: null,
    memo_text: "EARMARKED FOR SCHOLTEN4IOWA CAMPAIGN COMMITTEE (C00650622)",
    line_number: "11AI",
    contributor_zip: "11217",
    contribution_receipt_amount: 10,
    conduit_committee_street2: null,
    election_type_full: null,
    original_sub_id: null,
    image_number: "201812079139276223",
    contributor_street_2: null,
    contributor_occupation: "NOT EMPLOYED",
    receipt_type_desc: null,
    sub_id: "4010720191626139306",
    receipt_type: null,
    pdf_url: "http://docquery.fec.gov/cgi-bin/fecimg/?201812079139276223",
    contributor_street_1: "110 PROSPECT PLACE",
    is_individual: true,
    fec_election_type_desc: null,
    load_date: "2019-01-08T11:53:55.750000+00:00",
    contributor_first_name: "ARI",
    election_type: null,
    conduit_committee_name: null,
    candidate_last_name: null,
    back_reference_transaction_id: null,
    contributor_id: null,
    contribution_receipt_date: "2018-10-27T00:00:00",
    schedule_type_full: "ITEMIZED RECEIPTS",
    entity_type: "IND",
    candidate_office_state: null,
    fec_election_year: null,
    amendment_indicator: "A",
    contributor_aggregate_ytd: 10,
    contributor_employer: "NOT EMPLOYED",
    schedule_type: "SA",
    donor_committee_name: null,
    candidate_office_full: null
  },
  {
    candidate_prefix: null,
    report_year: 2018,
    contributor_prefix: null,
    committee_id: "C00401224",
    receipt_type_full: "CONTRIBUTION TO ACT BLUE",
    candidate_name: null,
    conduit_committee_zip: null,
    committee_name: null,
    contributor_city: "BROOKLYN",
    file_number: 1300352,
    line_number_label:
      "Contributions From Individuals/Persons Other Than Political Committees",
    two_year_transaction_period: 2018,
    candidate_office: null,
    conduit_committee_street1: null,
    unused_contbr_id: null,
    transaction_id: "SA11AI_136481919",
    contributor_suffix: null,
    conduit_committee_city: null,
    candidate_office_state_full: null,
    entity_type_desc: "INDIVIDUAL",
    candidate_suffix: null,
    contributor_middle_name: null,
    memo_code_full: null,
    contributor_state: "NY",
    conduit_committee_state: null,
    recipient_committee_type: "W",
    candidate_middle_name: null,
    amendment_indicator_desc: "ADD",
    filing_form: "F3X",
    contributor_last_name: "EFRON",
    memoed_subtotal: false,
    back_reference_schedule_name: null,
    national_committee_nonfederal_account: null,
    committee: {
      organization_type: null,
      name: "ACTBLUE",
      designation: "U",
      street_2: null,
      candidate_ids: [],
      filing_frequency: "M",
      zip: "02144",
      designation_full: "Unauthorized",
      committee_type_full: "PAC with Non-Contribution Account - Qualified",
      cycle: 2018,
      party: null,
      state_full: "Massachusetts",
      committee_id: "C00401224",
      party_full: null,
      street_1: "P.O. BOX 441146",
      treasurer_name: "HILL, ERIN",
      cycles: [2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020],
      committee_type: "W",
      city: "SOMERVILLE",
      organization_type_full: null,
      state: "MA"
    },
    increased_limit: null,
    link_id: 4120920181620675198,
    candidate_office_district: null,
    candidate_first_name: null,
    conduit_committee_id: null,
    contributor: null,
    contributor_name: "EFRON, ARI",
    memo_code: null,
    report_type: "30G",
    candidate_id: null,
    memo_text: "CONTRIBUTION TO ACTBLUE",
    line_number: "11AI",
    contributor_zip: "11217",
    contribution_receipt_amount: 1,
    conduit_committee_street2: null,
    election_type_full: null,
    original_sub_id: null,
    image_number: "201812079139276223",
    contributor_street_2: null,
    contributor_occupation: "NOT EMPLOYED",
    receipt_type_desc: null,
    sub_id: "4010720191626139308",
    receipt_type: null,
    pdf_url: "http://docquery.fec.gov/cgi-bin/fecimg/?201812079139276223",
    contributor_street_1: "110 PROSPECT PLACE",
    is_individual: true,
    fec_election_type_desc: null,
    load_date: "2019-01-08T11:53:55.750000+00:00",
    contributor_first_name: "ARI",
    election_type: null,
    conduit_committee_name: null,
    candidate_last_name: null,
    back_reference_transaction_id: null,
    contributor_id: null,
    contribution_receipt_date: "2018-10-27T00:00:00",
    schedule_type_full: "ITEMIZED RECEIPTS",
    entity_type: "IND",
    candidate_office_state: null,
    fec_election_year: null,
    amendment_indicator: "A",
    contributor_aggregate_ytd: 1,
    contributor_employer: "NOT EMPLOYED",
    schedule_type: "SA",
    donor_committee_name: null,
    candidate_office_full: null
  }
];
*/