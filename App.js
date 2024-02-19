import React, { useState } from 'react';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen'; // Now using index.js

// App component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [detailsParams, setDetailsParams] = useState(null);

  const navigateTo = (screen, params) => {
    setCurrentScreen(screen);
    setDetailsParams(params);
  };

  return (
    <>
      {currentScreen === 'Home' && (
        <HomeScreen navigation={{ navigate: navigateTo }} />
      )}

      {currentScreen === 'Details' && (
        <DetailsScreen route={{ params: { ...detailsParams, navigateTo } }} />
      )}
    </>
  );
};



export default App;
