// import logo from './logo.svg';
import './App.css';
import Row from './components/Row';
import Nav from './components/Nav';
import Banner from './components/Banner';
import requests from './components/requests';

function App() {
  return (
    <>
      <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchPopular} isLargeRow={true} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Popular" fetchUrl={requests.fetchPopular} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />

    </>
  );
}

export default App;
