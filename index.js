
import "whatwg-fetch";
import App from "./containers/app";
import React from "react";
import { render } from "react-dom";

const rootEl = document.getElementById("root");

render(<App />, rootEl);

