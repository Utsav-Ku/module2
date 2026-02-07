const ADD_AMOUNT = "bank/ADD_AMOUNT"
const WITHDRAWL_AMOUNT = "bank/WITHDRAWL_AMOUNT"

export const addAmount = (amount) => ({
    type: ADD_AMOUNT,
    payload: { amount }
})

export const withdrawlAmount = (amount) => ({
    type: WITHDRAWL_AMOUNT,
    payload: { amount }
})

const initialstate = { balance : 0 }

export const bankReducer = (state = initialstate, action) => {
    switch(action.type){
        case ADD_AMOUNT:
            return{
                ...state,
                balance: state.balance + action.payload.amount
            }

        case WITHDRAWL_AMOUNT:
            if(state.balance < action.payload.amount){
                alert("insufficient Account balance");
                return state;
            }
            return{
                ...state,
                balance: state.balance - action.payload.amount
            }

        default:
            return state;
    }
};

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   todos: []
// };

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       console.log("Action Received:", action); // still works
//       state.todos.push({
//         id: Date.now(),
//         text: action.payload
//       });
//     },
//     removeTodo: (state, action) => {
//       console.log("Action Received:", action);
//       state.todos = state.todos.filter(
//         todo => todo.id !== action.payload
//       );
//     }
//   }
// });

// // ✅ Auto-generated action creators
// export const { addTodo, removeTodo } = todosSlice.actions;

// // ✅ Reducer
// export default todosSlice.reducer;
