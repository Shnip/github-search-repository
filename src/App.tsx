import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotFound from "./components/404/NotFound";
import Github from "./components/Github";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container-fluid wrap">
          <Switch>
            <Route path="/" exact component={Github} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
