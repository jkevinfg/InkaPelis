import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';
import '../assets/styles/App.scss';

const Home = ({ mylist, trends, originals, searchResult }) => {
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
                  key={item.id}
                  {...item}
                />
              ))}
            </Carousel>
          </Categories>
        )
      }

      {mylist.length > 0 && (
        <Categories title='Mi Lista'>
          <Carousel>
            {mylist.map(item => (
              <CarouselItem key={item.id} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}

      <Categories title='Series'>
        <Carousel>
          {trends.map(item => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>

      <Categories title='Peliculas'>
        <Carousel>
          {originals.map(item => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
    searchResult: state.searchResult,
  };
};

export default connect(mapStateToProps, null)(Home);
