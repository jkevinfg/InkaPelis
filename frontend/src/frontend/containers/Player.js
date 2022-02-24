import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const { id } = props.match.params;
  console.log(id);
  const hasPlaying = Object.keys(props.playing).length > 0;

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <div className="Player">
      <video controls autoPlay src={props.playing.source} />
      <div className="Player-back">
        <button
          className="button"
          onClick={() => props.history.goBack()}
        >
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <Link to="/">
      <button className="button">Regresa al Home</button>
    </Link>
  );
};

Player.propTypes = {
  getVideoSource: PropTypes.func,
};

const mapStateToProps = state => ({
  playing: state.playing,
});

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);