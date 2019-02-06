import React from 'react';
import { Input } from 'antd';
import RecipeList from "./recipeList";

const Search = Input.Search;

const Main = (props) => {
  return (
    <div>
      <div id="title" className="newFont">Search For Recipe With <span>Food2Fork</span></div>
      <div id="searchTitle">Type Recipes Separated By Comma</div>
      <div id="searchBar">
      <Search
        placeholder="chicken,onions,carrots"
        onSearch={value => props.fetchRecipe(value)}
        enterButton size="large"
      />
      </div>
      <div id="listTitle" className="newFont">recipe list</div>
      <RecipeList recipes={props.recipes}/>
    </div>
  )
};

export default Main;