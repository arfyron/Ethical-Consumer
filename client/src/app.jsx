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
    this.setState({
      currentExec : ''
    })
    axios
      .get(`/execs/${this.state.formData.toUpperCase()}`)
      .then(({ data }) => {
        if (!data.length) {
          alert('That is not a valid ticker')
          this.setState({
            formData : ''
          })
        } else {
          this.setState({
            companyExecs: data,
            currentCompany: this.state.formData
          });
        }
        
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
