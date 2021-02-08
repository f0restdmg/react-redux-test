import React from "react";
import {Provider} from 'react-redux'
import {Switch, Route, HashRouter} from 'react-router-dom'
import Articles from './pages/Articles'
import Photos from "./pages/Photos";
import Users from "./pages/Users";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Articles} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/photos" component={Photos} />
        </Switch>
      </HashRouter>
    </Provider>
  )
};

export default App;
