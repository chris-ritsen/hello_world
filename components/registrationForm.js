
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
      if (response.status === 400) {
        // Validation error on server
        return;
      }

      if (response.status === 200) {
        browserHistory.push('/confirmation')
      }
    });
  }
  render() {
    let zipChange = (event) => {
      if (event.target && event.target.value && event.target.value.length > 9) {
        event.target.value = event.target.value.slice(0, 9);
      }
    };

    return (
<form onSubmit={this.onSubmit}>
  <label>
    <span>Address<abbr class="req" title="required">*</abbr></span>

    <input
    name="address1"
    onChange={this.onChange}
    required="required"
    type="text"
    value={this.state.address1}
    />

    <input
    name="address2"
    onChange={this.onChange}
    type="text"
    value={this.state.address2}
    />
  </label>

  <label>
    <span>City<abbr class="req" title="required">*</abbr></span>

    <input
    name="city"
    onChange={this.onChange}
    required="required"
    type="text"
    value={this.state.city}
    />
  </label>

  <label>
    <span>Country (US only)<abbr class="req" title="required">*</abbr></span>

    <input
    name="country"
    onChange={this.onChange}
    required="required"
    type="text"
    value={this.state.country}
    />
  </label>

  <label>
    <span>First Name<abbr class="req" title="required">*</abbr></span>

    <input
    name="first_name"
    onChange={this.onChange}
    required="required"
    type="text"
    value={this.state.first_name}
    />
  </label>

  <label>
    <span>Last Name<abbr class="req" title="required">*</abbr></span>

    <input
    name="last_name"
    onChange={this.onChange}
    required="required"
    type="text"
    value={this.state.last_name}
    />
  </label>

  <label>
    <span>State<abbr class="req" title="required">*</abbr></span>

    <input
    name="state"
    onChange={this.onChange}
    required="required"
    type="text"
    value={this.state.state}
    />
  </label>

  <label>
    <span>Zip (5 or 9 digit)<abbr class="req" title="required">*</abbr></span>
    <input
    min="0"
    max="999999999"
    name="zip"
    onChange={this.onChange}
    onKeyUp={zipChange}
    pattern="[0-9]*"
    required="required"
    type="number"
    value={this.state.zip}
    />
  </label>

  <button>Submit</button>
</form>
    );
  }
}

export default RegistrationForm;

