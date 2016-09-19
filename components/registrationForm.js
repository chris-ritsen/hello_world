
import React from "react";

const RegistrationForm = () => {
  return (
<form method="POST" action="/register">
  <label>Address
    <input required="required" type="text" name="address1" />
    <input type="text" name="address2" />
  </label>

  <label>City <input required="required" type="text" name="city" /></label>
  <label>Country (US only)<input required="required" type="text" name="country" /></label>
  <label>First Name <input required="required" type="text" name="first_name" /></label>
  <label>Last Name <input required="required" type="text" name="last_name" /></label>
  <label>State <input required="required" type="text" name="state" /></label>
  <label>Zip (5 or 9 digit) <input required="required" type="text" name="zip" /></label>

  <input type="submit" />
</form>
  );
};

export default RegistrationForm;

