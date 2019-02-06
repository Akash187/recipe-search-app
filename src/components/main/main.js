import React from 'react';
import { Input } from 'antd';
import RecipeList from "./recipeList";
import Spinner from "../spinner/spinner";

const Search = Input.Search;

export default class Main extends React.Component{

  state={
    recipes: [],
    api_key : process.env.REACT_APP_FOOD2FORK_API_KEY,
    api_url : 'https://www.food2fork.com/api/search',
    fetchingData: true,
    errorFetching: false,
    pageToFetch: 1
  };

  fetchRecipes = async (query, page) => {
    let res = await fetch(`${this.state.api_url}?key=${this.state.api_key}&q=${query}&page=${page}`);
    return await res.json();
  };

  queryRecipes = (query='', page=1) => {
    this.setState({
      fetchingData: true
    });
    this.fetchRecipes(query, page).then((data) => {
      this.setState({
        fetchingData: false,
        recipes: data.recipes
      })
    }).catch(e => {
      this.setState({
        errorFetching: true,
        fetchingData: false
      })
    });
  };

  componentDidMount(){
    this.queryRecipes();
  }

  render(){
    return (
      <div style={{marginBottom: '2rem'}}>
        <div id="title" className="newFont">Search For Recipe With <span>Food2Fork</span></div>
        <div id="searchTitle">Type Recipes Separated By Comma</div>
        <div id="searchBar">
          <Search
            placeholder="chicken,onions,carrots"
            onSearch={value => {
              if(value.length > 0) this.queryRecipes(value)
            }}
            enterButton size="large"
          />
        </div>
        <div id="listTitle" className="newFont">recipe list</div>
        {(this.state.fetchingData) ?
          <Spinner cssClass="recipeListSpinner"/>
          :
          (this.state.errorFetching) ?
            <h1 style={{textAlign: 'center', color: 'red'}}>Error! Fetching Recipe.</h1>
            :
          <RecipeList recipes={this.state.recipes}/>
        }
      </div>
    )
  }
};