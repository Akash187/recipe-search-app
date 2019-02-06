import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;
const sourceBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'green',
  color: 'white'
};


const Recipe = ({recipe}) => {
  return (
    <Card key={recipe.recipe_id}
          cover={<img
            alt="example" style={{height: '300px', objectFit: 'cover'}}
            src={recipe.image_url}
            onError={(e)=>{ if (e.target.src !== "/images/recipe_error.png"){
              e.target.src="/images/recipe_error.png";}
            }}
          />}
          actions={[
            <Button type="primary" size="large" onClick={() => console.log("Button Clicked")}>Details</Button>,
            <Button
              style = {sourceBtnStyle}
              type="ghost"
              size="large"
              href={recipe.source_url}
              target="_blank"
            >Recipe Url</Button>
          ]}
    >
      <Meta
        title={recipe.title}
        description={recipe.publisher}
      />
    </Card>
  )
};

export default Recipe;