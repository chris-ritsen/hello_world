
import React from "react";

fetch("/users", {
  "headers": new Headers({
    "Accept": "application/json"
  }),
  "method": "GET"
}).then((response) => {
  response.json().then((users) => {
    console.log(users);
  });
});

const UserReport = () => {
  return (
<div>
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

    <tbody>
      <tr>
        <td>Sue</td>
        <td>User</td>
        <td>123 My Drive</td>
        <td>Apt. 219</td>
        <td>Userville</td>
        <td>OH</td>
        <td>12345</td>
        <td>US</td>
        <td>2014-07-01 00:00:00</td>
      </tr>

      <tr>
        <td>Foo</td>
        <td>Bar</td>
        <td>123 Fnord lane</td>
        <td>&nbsp;</td>
        <td>Testerton</td>
        <td>WI</td>
        <td>54321</td>
        <td>US</td>
        <td>2014-06-28 00:00:00</td>
      </tr>
    </tbody>
  </table>
</div>
  );
};

export default UserReport;

