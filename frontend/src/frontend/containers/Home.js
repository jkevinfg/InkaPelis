import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';
import '../assets/styles/App.scss';

const Home = (props) => {
  const { myList, movies, documentaries, searchResult  } = props
  
  // const initialState = useInitialState(API);
  return (
    <>
      <Header />
      <Search isHome />

      {
        Object.keys(searchResult).length > 0 &&
        (
          <Categories title='Resultados de la busqueda...'>
            <Carousel>
              {searchResult.map(item => (
                <CarouselItem
                  key={item._id}
                  {...item}
                />
              ))}
            </Carousel>
          </Categories>
        )
      }

      {myList.length > 0 && (
        <Categories title='Mi Lista'>
          <Carousel>
            {myList.map(item => (
              <CarouselItem key={item._id} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}



      <Categories title='Documentales'>
        <Carousel>
          {documentaries.map(item => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>

      <Categories title='Peliculas'>
        <Carousel>
          {movies.map(item => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    movies: state.movies,
    documentaries: state.documentaries,
    searchResult: state.searchResult,
  };
};

export default connect(mapStateToProps, null)(Home);


