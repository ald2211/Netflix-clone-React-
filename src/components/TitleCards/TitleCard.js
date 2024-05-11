import React, { useEffect, useRef, useState } from 'react'
import './card.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const TitleCard = ({title,category}) => {

    const cardsRef=useRef();
    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${category?category:'top_rated'}`,
      params: {language: 'en-US', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTUzNDdmNTUzODQ5MTBmMWRkZDFkN2ZkY2E1ZDNkZSIsInN1YiI6IjY2MzY0N2Y5NjYxMWI0MDEyNDY3ZGY5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TVd_UGbqNr3SC3TNUaem8ggPMpkeXOAXcyJxju_qf9c'
      }
    };
    const [apiData,setApiData]=useState([])
    const handleWheel=(e)=>{
        e.preventDefault()
        cardsRef.current.scrollLeft += e.deltaY;
    }
    useEffect(()=>{

      axios
      .request(options)
      .then(function (response) {
        setApiData(response.data.results)
      })
      .catch(function (error) {
        console.error(error);
      });
      cardsRef.current.addEventListener('wheel',handleWheel)

        
    },[])
 
    
  return (
    <div className='title-cards'>
      <h2>{ title ?title: title='Popular on Netflix' }</h2>
      <div className="card-list" ref={cardsRef}>
        {
          apiData.map((item,index)=>{

            return(
              <Link to={`/player/${item.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+item.backdrop_path} alt="" />
            <p>{item.original_title}</p>
        </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default TitleCard
