import { createSlice } from "@reduxjs/toolkit";

const taskmanagerSlice = createSlice({
    name:"taskmanager",
    initialState:[],

    reducers:{
        addTask:(state, action)=>{
            state.push(action.payload)
        },
        deleteTask:(state, action)=>{
            return state.filter(task => {
                return task.id != action.payload})
        },
        editTask:(state, action)=>{
            const index = state.findIndex(task=>task.id === Number(action.payload.id))
            state[index].title = action.payload.title??state[index].title 
            state[index].description = action.payload.description??state[index].description
            state[index].dueDate = action.payload.dueDate??state[index].dueDate
        },
        markTaskCompleted:(state, action)=>{
            const index = state.findIndex(task=>task.id === Number(action.payload.id))
            state[index].completed = action.payload.checked??state[index].completed
        }
    }
})

export const {addTask, deleteTask, editTask, markTaskCompleted} = taskmanagerSlice.actions

export default taskmanagerSlice.reducer;