import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLikedCard,cleaner } from '../store/cardsSlice';
import "../App.css"
import { Card } from './Card';
export const CardList = () => {
    const [showLiked,setShowLiked] = useState(false)
    const cards = useSelector(state=>state.cards.cards)
    const likedCards = useSelector(state=>state.cards.likedCards)
    console.log(likedCards)
    console.log(cards)
    const hide = {
      display:"block"
    }
    if(showLiked===true){
      hide.display="none"
    }
    if(showLiked===false){
      hide.display="block"
    }
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setLikedCard())
      dispatch(cleaner())
    },[showLiked])
  
  return (
    <div className='cardsWrapper'>
    <button onClick={()=>setShowLiked(prev=>!prev)} style={{margin:"50px"}}>
      Show liked cards
    </button>
    {
      cards.map((card)=>{
        if(card.albumId===true&&showLiked===true){
          return <Card
                     display={{display:"block"}}
                     key={card.url}
                     id={card.id}
                     title={card.title}
                     photo={card.thumbnailUrl}
                 />
        }
        return <Card
                display={hide}
                key={card.url}
                id={card.id}
                title={card.title}
                photo={card.thumbnailUrl}
               />
      })  
    }
    </div>
  )
}
