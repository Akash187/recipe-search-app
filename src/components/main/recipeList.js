import React from 'react';
import Recipe from "./recipe";

const RecipeList = ({recipes}) => {
  return (
    (recipes.length <= 0) ?
      <h2 style={{textAlign: 'center', color: 'red'}}>Sorry, but your search did not return result.</h2>
      :
    <div className="container">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe_id} recipe={recipe}/>
      ))}
    </div>
  );
};

export default RecipeList;