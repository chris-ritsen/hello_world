
let Express = require("express");
let bodyParser = require("body-parser");

let app = new Express();
let port = process.env.PORT || 3000;

app.use("/static", Express.static("static"));
app.get("/main.css", (request, response) => response.sendFile(__dirname + "/main.css"));
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

