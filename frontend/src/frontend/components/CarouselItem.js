import React from 'react';
import '../assets/styles/components/CarouselItem.scss';

//icons
import playIcon from '../assets/static/play-icon.png';
import plusIcon from '../assets/static/plus-icon.png';
import removeIcon from '../assets/static/remove-icon.png';

//Data validation
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteMovie, favoriteMovie } from '../actions';
import { Link } from 'react-router-dom';

const CarouselItem = (props) => {

	const { _id, title, year,cover, duration, contentRating , myList, isList , user } = props;
	
	
	const handleSetFavorite = () => {
		const movie = {
			_id, title, year,cover, duration, contentRating
		  };
		props.favoriteMovie(user.id,movie)
		
	};


	const handleDeleteFavorite = (itemId) => {
		props.deleteMovie(itemId);
	};


	return (
		<div className='carousel-item'>
			<img className='carousel-item__img' src={cover} alt={title} />
			<div className='carousel-item__details'>
				<div>
					<Link to={`/player/${_id}`}>
						<img
							className='carousel-item__details--img'
							src={playIcon}
							alt='Play Icon'
						/>
					</Link>



					{isList ? (
						<img
						className='carousel-item__details--img'
						src={removeIcon}
						alt='Remove Icon'
						onClick={() => handleDeleteFavorite(_id)}
					/>
       			   ) : (
					<img
					className='carousel-item__details--img'
					src={plusIcon}
					alt='Plus Icon'
					onClick={() => handleSetFavorite()}
						/>
      			    )}

				</div>
				<p className='carousel-item__details--title'>{title}</p>
				<p className='carousel-item__details--subtitle'>
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

const mapStateToProps = (state) => {
	return {
	  myList: state.myList,
	  user: state.user,
	};
  };
  
// Redux
const mapDispatchToProps = {
	favoriteMovie,
	deleteMovie,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CarouselItem)
  );
  