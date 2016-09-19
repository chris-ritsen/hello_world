
import React, { Component } from "react";

class UserReport extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "users": null
    };
  }
  componentWillMount() {
    fetch("/users", {
      "headers": new Headers({
        "Accept": "application/json"
      }),
      "method": "GET"
    }).then((response) => {
      response.json().then((users) => {
        this.setState({
          users
        });
      });
    });
  }
  render() {
    let mapUsers = (user) => {
      return (
<tr key={user.date}>
  <td>{user.first_name}</td>
  <td>{user.last_name}</td>
  <td>{user.address1}</td>
  <td>{user.address2}</td>
  <td>{user.city}</td>
  <td>{user.state}</td>
  <td>{user.zip}</td>
  <td>{user.country}</td>
  <td>{user.date}</td>
</tr>
      );
    };

    if (this.state.users === null) {
      return (<div>Loading…</div>);
    }

    if (!this.state.users.length) {
      return (<div>{`There are no registered users.`}</div>);
    }

    return (
<table>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Address1</th>
      <th>Address2</th>
      <th>City</th>
      <th>State</th>
      <th>Zip</th>
      <th>Country</th>
      <th>Date</th>
    </tr>
  </thead>

  <tbody>{this.state.users.map(mapUsers)}</tbody>
</table>
    );
  }
}

export default UserReport;

