import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from "../main/main";
import Detail from "../detail/detail";

export default class Routes extends React.Component{

  state={
    recipes: [],
    api_key : process.env.REACT_APP_FOOD2FORK_API_KEY,
    api_url : 'https://www.food2fork.com/api/search',
    fetchingDataFirstTime: true,
    fetchingMoreData: false,
    errorFetching: false,
    pageToFetch: 1,
    searchTerm: '',
    hasMore: true
  };

  fetchRecipes = async (query=this.state.searchTerm) => {

    console.log(`Url fetching : ${this.state.api_url}?key=${this.state.api_key}&q=${this.state.searchTerm}&page=${this.state.pageToFetch}`);
    let res = await fetch(`${this.state.api_url}?key=${this.state.api_key}&q=${query}&page=${this.state.pageToFetch}`);

    return await res.json();
  };

  queryRecipes = (query='') => {
    this.setState({
      fetchingDataFirstTime: true,
      pageToFetch: 1,
      searchTerm: query
    });

    this.fetchRecipes(query).then((data) => {
      this.setState({
        fetchingDataFirstTime: false,
        recipes: data.recipes
      })
    }).catch(e => {
      this.setState({
        errorFetching: true,
        fetchingDataFirstTime: false
      })
    });
  };

  fetchMoreData = () => {

    if (this.state.recipes.length >= 80) {
      this.setState({ hasMore: false });
      return;
    }

    this.setState((prevState) => (
      {
        pageToFetch: prevState.pageToFetch + 1,
        fetchingMoreData: true
      }));

    this.fetchRecipes().then((data) => {
      if(data.recipes.length < 1)
        this.setState({hasMore: false});
      else{
        this.setState((prevState) => (
          {
            recipes: prevState.recipes.concat(data.recipes),
            fetchingMoreData: false
          }));
      }
    }).catch(e => {
      this.setState({
        errorFetching: true,
        fetchingMoreData: false
      })
    });
  };

  componentDidMount(){
    this.queryRecipes();
  }

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <Main
              recipes={this.state.recipes}
              fetchingDataFirstTime={this.state.fetchingDataFirstTime}
              fetchingMoreData={this.state.fetchingMoreData}
              errorFetching={this.state.errorFetching}
              searchTerm={this.state.searchTerm}
              hasMore={this.state.hasMore}
              queryRecipes={this.queryRecipes}
              fetchMoreData={this.fetchMoreData}
            />
          )}/>
          <Route exact path="/recipe/:id" component={Detail}/>
        </Switch>
      </BrowserRouter>
    )
  }
};