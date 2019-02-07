import React from 'react';
import { Button, List} from 'antd';
import Spinner from "../spinner/spinner";

export default class Detail extends React.Component{

  state={
    recipes: [],
    api_key : process.env.REACT_APP_FOOD2FORK_API_KEY,
    api_url : 'https://www.food2fork.com/api/get',
    id : this.props.match.params.id,
    fetchingData: true,
    errorFetching: false
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

  fetchRecipe = async () => {
    let res = await fetch(`${this.state.api_url}?key=${this.state.api_key}&rId=${this.state.id}`);
    let data = await res.json();
    this.setState({
      recipe: data.recipe
    })
  };

  componentDidMount(){
    // window.scrollTo(0, 0);
    this.fetchRecipe().then((success) => {
      this.setState({
        fetchingData: false
      })
    }).catch(e => {
      this.setState({
        errorFetching: true,
        fetchingData: false
      })
    });
  }

  render(){
    return (
      (this.state.fetchingData) ?
        <Spinner cssClass="detailSpinner"/>
       : (this.state.errorFetching) ?
        <h1 style={{textAlign: 'center', color: 'red'}}>Error! Fetching Recipe.</h1>
        :
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
          <List style={{width : '100%'}}
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