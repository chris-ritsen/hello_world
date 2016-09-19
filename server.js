
let Express = require("express");
let bodyParser = require("body-parser");
let sqlite3 = require("sqlite3");

const databaseFile = "./users.db";

let db = new sqlite3.Database(databaseFile);

db.serialize(() => {
  // db.run("drop table users");
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
  // console.log(request.body);
  response.sendStatus(200);
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});

