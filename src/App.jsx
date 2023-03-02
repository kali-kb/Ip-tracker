import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import product from "immer"
import LeafletMap from "./components/Map.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ipdata, setIpData] = useState({})
  const [searchText, setSearchText] = useState("")
  const position = [51.505, -0.09]
        
  useEffect(() => {
    fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_MhtFz7HiDn9Jm7UmV7RNCj5SCdry4&ipAddress=8.8.8.8')
      .then(response => response.json())
      .then(data => {
        console.log(response.code)
        console.log(data);
        setIpData(data)
      })
      .catch(error => console.error("error:",error));

  }, [])


  const typeEvent = (event) => {
    let text = event.target.value
    setSearchText(text)
  }

  const searchData = (event) => {
    event.preventDefault()
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_MhtFz7HiDn9Jm7UmV7RNCj5SCdry4&ipAddress=${searchText}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setIpData(data);
      })
      .catch(error => console.error("error:", error));

  }


  return (
    <div class="grid">
      <div id="data">
        <div id="data-input">
          <h1>Ip Address Tracker</h1>
          <form onSubmit={searchData}>
            <input onChange={typeEvent} placeholder='Search for any Ip address or domain' id="search-bar" type="text"></input>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1);transform: ;msFilter:;"}}><path d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path></svg>
            </button>
          </form>
        </div>
        <div id="geo-data">
        {(Object.keys(ipdata).length > 0) &&
          <>
            <div>
              <span>IP address</span>
              <p>{ipdata.ip}</p>
            </div>
            <div>
              <span>Location</span>
              <p>{ipdata.location.country}/{ipdata.location.region}</p>
            </div>
            <div>
              <span>Timezone</span>
              <p>{ipdata.location.timezone}</p>
            </div>
            <div>
              <span>Isp</span>
              <p>{ipdata.isp}</p>
            </div>
          </>
        }
        </div>
      </div>

      <div id="map-container" >
        {(Object.keys(ipdata).length > 0) &&
          <LeafletMap latitude={ipdata.location.lat} longitude={ipdata.location.lng}/>
        }
      </div>
    </div>
  )
}

export default App
