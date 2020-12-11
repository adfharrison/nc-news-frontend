// import logo from '../logoNorthCoders.png';
const Home = () => {
  return (
    <div className='homeContainer'>
      <div className='homeContent'>
        <div className='typewritercontainer'>
          <div className='typewriter '>Where anything is News</div>
        </div>
        {/* <img className='image' src={logo} alt='northcoders logo'></img> */}
        <p className='homeP'>
          Welcome to the Northcoders News Website. please use the navigation bar
          to continue into the site
        </p>
      </div>
    </div>
  );
};

export default Home;
