
let Express = require("express");
let _ = require("lodash");
let bodyParser = require("body-parser");
let sqlite3 = require("sqlite3");

const databaseFile = "./users.db";

let db = new sqlite3.Database(databaseFile);

db.serialize(() => {
  db.run(`
    create table if not exists
    users
    (
      first_name text,
      last_name text,
      address1 text,
      address2 text,
      city text,
      state text,
      zip text,
      country text,
      date timestamp DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

let app = new Express();
let port = process.env.PORT || 3000;

app.use("/static", Express.static("static"));
app.get("/main.css", (request, response) => response.sendFile(__dirname + "/main.css"));

app.get("/users", (request, response) => {
  db.all(`
select
  first_name,
  last_name,
  address1,
  address2,
  city,
  state,
  zip,
  country,
  date
from users
order by date desc
    `, (error, rows) => {
    response.json(rows);
  });

});

app.get("/*", (request, response) => response.sendFile(__dirname + "/index.html"));

app.use(bodyParser.json());

app.post("/register", (request, response) => {
  let statement = db.prepare(`
    insert into users
    (
      first_name,
      last_name,
      address1,
      address2,
      city,
      state,
      zip,
      country
    )
    values (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  request.body = Object.assign({
    address1: "",
    address2: "",
    city: "",
    country: "",
    first_name: "",
    last_name: "",
    state: "",
    zip: ""
  }, request.body);

  let {
    address1,
    address2,
    city,
    country,
    first_name,
    last_name,
    state,
    zip
  } = request.body;

  let validZip = true;
  let validCountry = true;
  let errors = [];

  if (zip && zip.length > 9 || Number.parseInt(zip) < 0) {
    validZip = false;
    errors.push("zip");
  }

  if (country && country.toLowerCase() !== "us" && country.toLowerCase() !== "united states") {
    validCountry = false;
    errors.push("country");
  }

  _.forIn(request.body, (value, key) => {
    if (!value && key !== "address2") {
      errors.push(key);
    }
  });

  if (first_name && last_name && address1 && city && state && validCountry &&
  validZip) {
    statement.run(first_name, last_name, address1, address2, city, state, zip, country);
    statement.finalize();
    response.sendStatus(200);
  } else {
    errors = _.uniq(errors);
    response.status(400).send({
      errors
    });
  }
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});

