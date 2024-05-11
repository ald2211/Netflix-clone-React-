import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCard from '../../components/TitleCards/TitleCard'
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
const Home = () => {

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/top_rated`,
    params: {language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTUzNDdmNTUzODQ5MTBmMWRkZDFkN2ZkY2E1ZDNkZSIsInN1YiI6IjY2MzY0N2Y5NjYxMWI0MDEyNDY3ZGY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TVd_UGbqNr3SC3TNUaem8ggPMpkeXOAXcyJxju_qf9c'
    }
  };
  const [apiData,setApiData]=useState([])
  let movie=apiData[Math.floor(Math.random()*apiData.length)]
  useEffect(()=>{
    axios
    .request(options)
    .then(function (response) {
      setApiData(response.data.results)
    })
    .catch(function (error) {
      console.error(error);
    });
  },[])
  return (
    <div className='home'>
      < Navbar />
      <div className="hero">
        <img src={`https://image.tmdb.org/t/p/original/`+movie?.backdrop_path}  alt="" className='banner-img' />
        <div className="hero-caption">
            <h2>{movie?.title}</h2>
            <p>{movie?.overview}</p>
        <div className="hero-btns">
            <button className='btn'>
                <img src={play_icon} alt="" />
                play
            </button>
            <button className='btn dark-btn'>
                <img src={info_icon} alt=""  />
                More info
            </button>
        </div>
        <TitleCard  />
        </div>
      </div>
      <div className="more-cards">
        
        <TitleCard title={'Blockbuster Movies'}  category={'now_playing'} />
        <TitleCard title={'Upcoming'}  category={'upcoming'}/>
        <TitleCard  title={'Only on Netflix'} category={'popular'} />
        <TitleCard title={'Top Pics for You'}  category={'top_rated'} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
