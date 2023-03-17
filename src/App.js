import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import './App.css';
import { CardList } from './components/CardList';
import {getCards} from "./store/cardsSlice";
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCards())
  },[])
  return (
    <div className="App">
      <CardList/>
    </div>
  );
}

export default App;
