import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import  {likeToggle, removeCard,removeLikedCard} from "../store/cardsSlice"
export const Card = ({id,title,photo,liked,display}) => {
  const [like,setLike] = useState(false)
  const [likeCheck,setLikeCheck] = useState(false)

  const likeHandler = () => {
    setLikeCheck(prev=>!prev)
    setTimeout(() => {
      setLikeCheck(false)
    }, 500);
  }
  
    const divStyle = {
        margin:"auto",
        width:"150px",
        color: 'blue',
        height:"150px",
        backgroundImage: 'url(' + photo + ')',
      };
    
const dispatch = useDispatch()
  return (
    <div className='card' style={display}>
        <div style={divStyle}></div>
        <span>{title}</span>
        <div className="actionsWrapper">
            <span className={liked?"liked":"dis"&&likeCheck?"like dis":"dis"&&like?"liked":"dis"} onClick={()=>{dispatch(likeToggle({id}));dispatch(removeLikedCard());likeHandler();setLike(prev=>!prev)}}>❤ </span>
            <span className='delete' onClick={()=>dispatch(removeCard({id}))}>&times;</span>
        </div>
    </div>
  )
}
