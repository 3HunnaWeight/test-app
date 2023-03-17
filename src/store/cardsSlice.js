import{createSlice, createAsyncThunk}from "@reduxjs/toolkit"

export const getCards = createAsyncThunk(
    'cards/getCards',
    async function(){
        const response  = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
        const data = await response.json()
        console.log(data)
        return data
    }
)
const cardsSlice = createSlice({
    
    name:"cards",
    initialState:{
        cards:[],
        likedCards:[],
    },
    
    reducers:{
        removeCard(state,action){
            state.cards = state.cards.filter(card => card.id !== action.payload.id);
            state.likedCards = state.likedCards.filter(card => card.id !== action.payload.id);
        },
        removeLikedCard(state,action){
            state.likedCards=state.likedCards.filter((card)=>{
                return card.albumId
            })
        },
        liked(state,action){
            state.cards.map((card)=>{
                card.albumId=action.payload
            })
       },
       likeToggle(state,action){
            state.cards.find((card)=>{
                if(card.id===action.payload.id){
                    card.albumId=!card.albumId
                }
            })
            state.likedCards.find((card)=>{
                if(card.id===action.payload.id){
                    card.albumId=!card.albumId
                }
            })
        },
        setLikedCard(state,action){
            state.cards.map((card)=>{
                if(card.albumId===true){
                    state.likedCards=[...state.likedCards,card]
                }
            })
        },
        cleaner(state,action){
            state.likedCards = [...new Map(state.likedCards.map((item) => [item["id"], item])).values()]
            console.log("clean")
       }
        
    },
    extraReducers:{
        [getCards.fulfilled]:(state,action)=>{
            state.cards = action.payload;
            state.cards.map((card)=>card.albumId=false)
        }
    }
})

export const {removeCard,liked,likeToggle,setLikedCard,cleaner,removeLikedCard} = cardsSlice.actions
export default cardsSlice.reducer