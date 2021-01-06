import React from "react";
import Quote from "./components/quote-generator/Quote";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Quotes from "./components/quote-generator/quotes/Quotes";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto py-4 font-body">
        <Switch>
          <Route exact path="/">
            <Quote />
          </Route>
          <Route path="/:quotes" component={Quotes} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
