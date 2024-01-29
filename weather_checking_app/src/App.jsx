import './App.css'
import React, { useState } from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'



function App() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({
    main: {},
    weather: [{}]
  })

  const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
  const api = import.meta.env.VITE_REACT_APP_API_KEY

  const search_pressed = async () => {
    try {
      setLoading(true)
      let response = await Axios.get(`${url}weather?q=${search}&units=metric&appid=${api}`)
      setWeather(response.data)
    } catch (error) {
      console.log('Error:', error);

      toast.error('🦄 Please enter a correct place or country name', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false)
    }

  }
  
  return (
    <>
      <div className='home-container'>

        <div className='main-container'>
          <h1 className='flex justify-center mb-3'>Weather App</h1>
          <div className='card '>
            <input
              type="text"
              placeholder='Enter your place name'
              onChange={(e) => setSearch(e.target.value)}
              className="mr-12"
              
            />

            <button onClick={search_pressed}  className="ml-2 border ">{loading ? <ThreeDots
              visible={true}
              height="20"
              width="50"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> : 'Search'}</button>

            <h2>Place: {weather.name}</h2>
            <h2>Temprature: {`${Math.round(weather.main.feels_like)}`}&deg; C</h2>
            <h3>Humidity: {weather.main.humidity}</h3>
            <h2>{weather.weather[0].main}</h2>
            <h6>{weather.weather[0].description}</h6>
          </div>

        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        theme="dark"
      />
    </>
  )
}

export default App
