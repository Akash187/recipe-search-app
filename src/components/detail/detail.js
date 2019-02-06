import React from 'react';
import {recipe} from "../../tempDetail";
import { Button, List } from 'antd';

export default class Detail extends React.Component{

  state={
    recipe: {}
  };

  backBtnStyle = {
    backgroundColor: 'orange',
    fontWeight: 500,
    marginBottom: '3rem',
    color: 'white'
  };

  sourceBtnStyle = {
    backgroundColor: 'green',
    color: 'white',
    marginLeft: '1rem'
  };

  ingredientStyle = {
    fontFamily: 'Courgette, cursive',
    fontWeight: '500',
    fontSize: '1.6rem'
  };

  fetchRecipe = (name) => {
    console.log(name);
    this.setState({
      recipe
    })
  };

  componentDidMount(){
    this.fetchRecipe();
  }

  render(){
    return (
      <div className="detailPage">
        <div className="imageContainer">
          <Button
            style={this.backBtnStyle}
            type="ghost"
            size="large"
            onClick={() => this.props.history.goBack()}
          >Back To Recipe List</Button>
          <img
            alt="example" className="detailImg"
            src={this.state.recipe.image_url}
            onError={(e)=>{ if (e.target.src !== "/images/recipe_error.png"){
              e.target.src="/images/recipe_error.png";}
            }}
          />
        </div>
        <div className="recipeDetail">
          <div className="detailRecipeTitle">{this.state.recipe.title}</div>
          <div className="detailRecipePublisher">{this.state.recipe.publisher}</div>
          <div className="btnContainer">
            <Button
              type="primary"
              size="large"
              href={this.state.recipe.publisher_url}
              target="_blank"
            >Publisher Webpage</Button>
            <Button
              style = {this.sourceBtnStyle}
              type="ghost"
              size="large"
              href={this.state.recipe.source_url}
              target="_blank"
            >Recipe Url</Button>
          </div>
          <h1>Ingredients</h1>
          <List
            bordered
            dataSource={this.state.recipe.ingredients}
            renderItem={item => (
              <List.Item style={this.ingredientStyle}>{item}</List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}