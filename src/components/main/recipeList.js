import React from 'react';
import Recipe from "./recipe";

const RecipeList = ({recipes}) => {
  return (
    <div className="container">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe_id} recipe={recipe}/>
      ))}
    </div>
  );
};

export default RecipeList;