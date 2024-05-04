import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
   const [data,setData]=useState("")
   const [weather,setWeather]=useState({})
   const clouds=[{weather:"few clouds",image:"./few2.jpg"},
                  {weather:"broken clouds",image:"./broken2.jpg"},
                  {weather:"scatterd clouds",image:"./scatterd.jpg"},
                  {weather:"overcast clouds",image:"./overcast2.webp"},
                  {weather:"clear sky",image:"./clear.webp"},
                  {weather:"light rain",image:"./lightrain.jpg"}
                ]

  const getWeather=async()=>{
    if(data!=""){
      const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=7deed933eb225fbb944a385c18a810ff`)
  
      setWeather(res.data)
  }
  else{
    alert("Enter location")
  }
  }
  useEffect(()=>{
    async function getKochi(){
      const kochiRes=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=7deed933eb225fbb944a385c18a810ff`)
      setWeather(kochiRes.data);
    }
    getKochi()
  },[])
 console.log(weather);
  
  return (
    <>
      <div className="container ">
        <div className="row mb-3" >
          <div className="col-md-10 col-lg-12 col-sm-6 position-absolute top-50 start-50 translate-middle" >
            <section className="vh-100" style={{backgroundImage:weather ? `url(${clouds.find(item => item.weather===(weather.weather&&weather.weather[0].description))?.image})`:`url(?public/default-bg-.jpg)`,backgroundSize:'cover',backgroundPosition:'center',filter: 'brightness(100%)',width:"100%",height:"100%"}}>
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100 ">
                  <div className="col-md-10 col-lg-8 col-sm-6">
                    
                  <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-primary" placeholder="Search the location" onChange={(e)=>setData(e.target.value)} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <button type="button" className="btn btn-secondary" onClick={getWeather} >Search</button>
                  </div> 

                    <div className="card bg-dark text-white " style={{borderradius: "40px",border:"none "}}>
                      {/* <div className="bg-image" style={{borderradius: "35px"}}>
                       {
                        clouds.map((e,index)=>(
                        e.weather==(weather.weather&&weather.weather[0].description)?<img src={e.image} alt="" className="mask" style={{width:"100%",height:"100%",objectFit:"fill",borderradius:"35px"}}/>:<></>))}
                      </div> */}
                      
                      <div className="card-img-overlay text-dark p-5">
                        <h4 className="mb-0">{weather.name}</h4>
                        <p className="display-2 my-3">{Math.floor(((weather.main&&weather.main.temp)-273.15)*100)/100}°C</p>
                        <p className="mb-2">Feels Like: <strong>{Math.floor(((weather.main&&weather.main.feels_like)-273.15)*100)/100}°C</strong></p>
                        <h5>{weather.weather&&weather.weather[0].description}</h5>
                      </div>
                    
                      
                    </div>
                  </div>
                </div>
              </div>
          </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
