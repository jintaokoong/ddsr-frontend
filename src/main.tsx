import { render } from "preact";
import { App } from "./app";
import "./config/axios";
import "./index.css";

render(<App />, document.getElementById("app")!);
