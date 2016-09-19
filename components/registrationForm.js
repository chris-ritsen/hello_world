
import React, { Component } from "react";
import { browserHistory } from 'react-router'

class RegistrationForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      "address1": "",
      "address2": "",
      "city": "",
      "country": "",
      "first_name": "",
      "last_name": "",
      "state": "",
      "zip": ""
    };

    this.onChange = this.change.bind(this);
    this.onSubmit = this.submit.bind(this);

  }
  change(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  submit(event) {
    event.preventDefault();

    fetch("/register", {
      "body":  JSON.stringify(this.state),
      "headers": new Headers({
        "Content-Type": "application/json"
      }),
      "method": "POST"
    }).then((response) => {
      browserHistory.push('/confirmation')
    });
  }
  render() {
    return (
<form onSubmit={this.onSubmit}>
  <label>Address
    <input onChange={this.onChange} value={this.state.address1} required="required" type="text" name="address1" />
    <input onChange={this.onChange} value={this.state.address2} type="text" name="address2" />
  </label>

  <label>City <input onChange={this.onChange} value={this.state.city} required="required" type="text" name="city" /></label>
  <label>Country (US only)<input onChange={this.onChange} value={this.state.country} required="required" type="text" name="country" /></label>
  <label>First Name <input onChange={this.onChange} value={this.state.first_name} required="required" type="text" name="first_name" /></label>
  <label>Last Name <input onChange={this.onChange} value={this.state.last_name} required="required" type="text" name="last_name" /></label>
  <label>State <input onChange={this.onChange} value={this.state.state} required="required" type="text" name="state" /></label>
  <label>Zip (5 or 9 digit) <input onChange={this.onChange} value={this.state.zip} required="required" type="text" name="zip" /></label>

  <button>Submit</button>
</form>
    );
  }
}

export default RegistrationForm;

