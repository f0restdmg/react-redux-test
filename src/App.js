import React from "react";
import {Provider} from 'react-redux'
import {Switch, Route, HashRouter} from 'react-router-dom'
import Articles from './pages/Articles'
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Articles} />
        </Switch>
      </HashRouter>
    </Provider>
  )
};

export default App;
