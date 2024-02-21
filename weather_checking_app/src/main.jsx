import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import { ThreeDots } from 'react-loader-spinner';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
const App = lazy(() => import('./App.jsx'))
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100vw'}}><ThreeDots
        visible={true}
        height='20'
        width='50'
        color='#160fd9'
        radius='9'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
      /></div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
