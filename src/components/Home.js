import React from 'react';
import PropTypes from 'prop-types';
import './Home.css';


function Home(props){
    function setHome() {
        props.setHome()
    }
    return (
        <div className='Splash'>
        <h1 className='Splash'>Sts Clone</h1>
        <hr></hr><h2 className='Splash' onClick={() => setHome()}>Start New Game</h2>
        </div>
    );
}

Home.propTypes = {
    setHome: PropTypes.func
}

export default Home;
