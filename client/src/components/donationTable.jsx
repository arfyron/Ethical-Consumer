import React from 'react'
const DonationTable = (props) => {
  if (props.exec) {
    return (
      <div>
        <h4>
          {`${props.exec}'s Donations`}
        </h4>
        <table id='donationTable'>
          <tbody>
          <tr>
            <th>Full Name</th>
            <th>Year</th>
            <th>Type of Contribution</th>
            <th>Committee Name</th>
            <th>Amount</th>
            <th>City/State</th>
            <th>Company</th>
            <th>Occupation</th>
            <th>Donation Record PDF</th>
          </tr>
          {props.data.map((record,i) => {
            return (
              <tr key={i}>
                <td>{record.contributor_first_name} {record.contributor_last_name}</td>
                <td>{record.report_year}</td>
                <td>{record.line_number_label}</td>
                <td>{record.committee.name}</td>
                <td>${record.contribution_receipt_amount.toFixed(2).padEnd(4, '0')}</td>
                <td>{record.contributor_city}, {record.contributor_state}</td>
                <td>{record.contributor_employer || 'Not Listed'}</td>
                <td>{record.contributor_occupation}</td>
                <td><a href={record.pdf_url} target='_blank'>Click Me</a></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  } else {
    return null
  }
  
}

export default DonationTable