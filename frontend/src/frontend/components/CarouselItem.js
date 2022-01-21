import React from 'react';
import '../assets/styles/components/CarouselItem.scss';

// icons
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

// Data validation

// Redux
import { deleteMovie, favoriteMovie } from '../actions';

const CarouselItem = (props) => {
  const {
    _id, title, year, cover, duration, contentRating, isList, user,
  } = props;

  const handleSetFavorite = () => {
    const movie = {
      _id, title, year, cover, duration, contentRating,
		  };
    props.favoriteMovie(user.id, movie);
  };

  const handleDeleteFavorite = (itemId) => {
    props.deleteMovie(itemId);
  };

  return (
    <div className="carousel-item">
      <img className="carousel-item__img" src={cover} alt={title} />
      <div className="carousel-item__details">
        <div>
          <Link to={`/player/${_id}`}>
            <img
              className="carousel-item__details--img"
              src={playIcon}
              alt="Play Icon"
            />
          </Link>

          {isList ? (
            <img
              className="carousel-item__details--img"
              src={removeIcon}
              alt="Remove Icon"
              onClick={() => handleDeleteFavorite(_id)}
            />
       			   ) : (
         <img
           className="carousel-item__details--img"
           src={plusIcon}
           alt="Plus Icon"
           onClick={() => handleSetFavorite()}
         />
      			    )}

        </div>
        <p className="carousel-item__details--title">{title}</p>
        <p className="carousel-item__details--subtitle">
          {`${year} - ${duration} min`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapStateToProps = state => ({
	  myList: state.myList,
	  user: state.user,
});

// Redux
const mapDispatchToProps = {
  favoriteMovie,
  deleteMovie,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CarouselItem),
);
