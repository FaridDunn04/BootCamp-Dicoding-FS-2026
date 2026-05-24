import React from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import { validateProps } from './utils/utils';
import Joi from 'joi';

function News(props) {
  const {title,description,image,isFeatured,tags,bookmark,style}=validateProps(newsPropsSchema,props,'News');

  return (
    <article style={style}>
      <img src={image} alt={title} /> 
      {isFeatured && (
        <p>
          <strong>Hot News!</strong>
        </p>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
      <br />
      <p>{tags.map((tag) => `#${tag} `)}</p>
      <button onClick={bookmark}>Bookmark</button>
    </article>
  );
}

const newsPropsSchema=Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  isFeatured: Joi.boolean().required(),
  tags: Joi.array().items(Joi.string()).required(),
  bookmark: Joi.function().required(),
  style: Joi.object().unknown(true),
});

// TODO: definisikan propTypes untuk komponen News
// News.propTypes={
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   isFeatured: PropTypes.bool.isRequired,
//   tags: PropTypes.arrayOf(PropTypes.string).isRequired,
//   bookmark:PropTypes.func.isRequired,
//   style:PropTypes.object
// };

const root = createRoot(document.getElementById('root'));
root.render(
  <News
    title="Annual Planting"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet sagittis metus, eget dapibus risus laoreet sed. Praesent ante magna ..."
    image="https://picsum.photos/id/239/800/600"
    isFeatured={true}
    tags={['plant', 'nature' ]}
    bookmark={() => alert('Bookmarked!')}
    style={{
      // ini opsional
      width: 300,
      border: '1px solid black',
      margin: '0 auto',
      padding: 16,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left'
    }}
  />
);
