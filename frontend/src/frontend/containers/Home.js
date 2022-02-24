import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';
import '../assets/styles/App.scss';


const Home = (props) => {
  const {
    myList, animation, searchResult,drama,scienceFiction
  } = props;

  // const initialState = useInitialState(API);
  return (
    <>
      <Header />
      <Search isHome />
      {
        Object.keys(searchResult).length > 0
        && (
          <Categories title="Resultados de la busqueda...">
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
        <Categories title="Mi Lista">
          <Carousel>
            {myList.map(item => (
              <CarouselItem key={item._id} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}

      <Categories title="Ciencia Ficción">
        <Carousel>
          {scienceFiction.map(item => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>

      <Categories title="Drama">
        <Carousel>
          {drama.map(item => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>

      <Categories title="Animación">
        <Carousel>
          {animation.map(item => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
     
    </>
  );
};

const mapStateToProps = state => ({
  myList: state.myList,
  searchResult: state.searchResult,
  drama: state.drama,
  animation: state.animation,
  scienceFiction: state.scienceFiction
});

export default connect(mapStateToProps, null)(Home);
