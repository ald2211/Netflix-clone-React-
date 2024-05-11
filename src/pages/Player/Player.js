import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const {id}=useParams()
  const navigate=useNavigate()
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}/videos`,
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTUzNDdmNTUzODQ5MTBmMWRkZDFkN2ZkY2E1ZDNkZSIsInN1YiI6IjY2MzY0N2Y5NjYxMWI0MDEyNDY3ZGY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TVd_UGbqNr3SC3TNUaem8ggPMpkeXOAXcyJxju_qf9c'
    }

  };
  const [apiData,setApiData]=useState({
    name:'',
    key:'',
    published_at:'',
    type:''
  })
  useEffect(()=>{

    axios
    .request(options)
    .then(function (response) {
        setApiData(response.data.results[0])
        
    })
    .catch(function (error) {
      console.error(error);
    });
  },[])
  return (
    
    <div className='player'>
       <img src={back_arrow} alt="" onClick={()=>{navigate(-2)}} />
       <iframe frameBorder='0' title='trailer' src={`https://www.youtube.com/embed/${apiData.key}`}  width='90%' height='90%' allowFullScreen></iframe>
       <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
       </div>
    </div>
  )
}

export default Player
