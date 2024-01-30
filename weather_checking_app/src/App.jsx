import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({
    main: {},
    weather: [{}],
  });

  const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const api = import.meta.env.VITE_REACT_APP_API_KEY;
  const profile = import.meta.env.VITE_REACT_APP_PROFILE_URL;

  const handleClick = () => {
    window.location.href = profile;
  };

  const searchPressed = async () => {
    try {
      setLoading(true);
      let response = await Axios.get(
        `${url}weather?q=${search}&units=metric&appid=${api}`
      );
      setWeather(response.data);
    } catch (error) {
      console.log('Error:', error);

      toast.error('🦄 Please enter a correct place or country name', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='home-container min-h-screen flex flex-col items-center justify-between'>
      <div className='text-center flex-grow mt-12 mx-4'>
        <h1 className='text-3xl font-bold mb-3'>Weather Check</h1>
        <div className='card p-6 rounded-md shadow-md max-w-sm mx-auto' style={{ width: '400px', height: '400px', overflow: 'auto' }}>
          <input
            type='text'
            placeholder='Enter your place name'
            onChange={(e) => setSearch(e.target.value)}
            className='w-full mb-4 p-2 rounded-md'
          />

          <Button onClick={searchPressed} variant='contained'>
            {loading ? (
              <ThreeDots
                visible={true}
                height='20'
                width='50'
                color='#ffffff'
                radius='9'
                ariaLabel='three-dots-loading'
                wrapperStyle={{}}
                wrapperClass=''
              />
            ) : (
              'Search'
            )}
          </Button>

          {!weather.name ? (
            <div className='mt-6'>
              <p className='text-lg text-gray-400'>
                Welcome to Weather Check - your go-to destination for real-time weather information!
              </p>
            </div>
          ) : (
            <div className='min-box mt-4 p-6  rounded-md shadow-md'>
              <h2 className='text-3xl font-extrabold text-gray-900'>Location: {weather.name}</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-lg text-gray-300'>Temperature:</p>
                  <p className='text-2xl font-semibold text-blue-400'>{`${Math.round(weather.main.feels_like)}`}&deg; C</p>
                </div>
                <div>
                  <p className='text-lg text-gray-300'>Humidity:</p>
                  <p className='text-xl text-green-400'>{weather.main.humidity}%</p>
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-xl font-bold text-indigo-800'>{weather.weather[0].main}</h3>
                <p className='text-sm text-gray-200'>{weather.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='my-2 mx-3 text-sm text-gray-500 self-end cursor-pointer d-flex justify-content-end align-items-center' onClick={handleClick}>
        <span className="d-none d-sm-inline">Developed by Akbr Ali</span>
        <span className="d-sm-none">Akbr Ali</span>
      </footer>

      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme='dark'
      />
    </div>
  );
}

export default App;
