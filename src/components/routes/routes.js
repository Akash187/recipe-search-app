import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {recipes} from '../../tempList';
import Main from "../main/main";
import Detail from "../detail/detail";

export default class Routes extends React.Component{

  state = {
    recipes : []
  };

  fetchRecipe = () => {
    this.setState({
      recipes
    })
  };

  componentDidMount(){
    this.fetchRecipe();
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <Main recipes={this.state.recipes}/>
          )}/>
          <Route exact path="/recipe/:id" component={Detail}/>
        </Switch>
      </BrowserRouter>
    )
  }
};