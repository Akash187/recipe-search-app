import React from 'react';
import { Input } from 'antd';
import Spinner from "../spinner/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeList from "./recipeList";

const Search = Input.Search;

const Main = (props) => {
  return (
    <div style={{marginBottom: '2rem'}}>
      <div id="title" className="newFont">Search For Recipe With <span>Food2Fork</span></div>
      <div id="searchTitle">Type Recipes Separated By Comma</div>
      <div id="searchBar">
        <Search
          defaultValue={props.searchTerm}
          placeholder="chicken,onions,carrots"
          onSearch={value => {
            if(value.length > 0) props.queryRecipes(value)
          }}
          enterButton size="large"
        />
      </div>
      <div id="listTitle" className="newFont">recipe list</div>
      {(props.fetchingDataFirstTime) ?
        <Spinner cssClass="recipeListSpinner"/>
        :
        (props.errorFetching || props.recipes === undefined) ?
          <h1 style={{textAlign: 'center', color: 'red'}}>Error! Fetching Recipe.</h1>
          :
          <InfiniteScroll
            dataLength={props.recipes.length}
            next={props.fetchMoreData}
            hasMore={props.hasMore}
            loader={<Spinner cssClass="recipeListSpinner"/>}
            endMessage={
              <p style={{ textAlign: "center" , marginTop: '1.6rem'}}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <RecipeList recipes={props.recipes}/>
          </InfiniteScroll>
      }
    </div>
  )
};

export default Main;