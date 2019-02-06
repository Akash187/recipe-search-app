import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main";
import Detail from "../detail/detail";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main}/>
      <Route exact path="/recipe/:id" component={Detail}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;