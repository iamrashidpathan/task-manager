import { useSelector, useDispatch } from "react-redux"
import React, { useState } from "react"
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { editTask } from "./store/taskmanagerSlice";
import { useNavigate } from 'react-router-dom';

const Edit = ()=>{
    const {id} = useParams();
    
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const taskList = useSelector(store=> store.taskmanager)
    const selectedTask = taskList.find(task =>task.id === Number(id))

    const [editedTask, setEditedTask] = useState({title:selectedTask?.title, 
                                            description:selectedTask?.description,
                                             dueDate:selectedTask?.dueDate,id:id})
    // debugger


    const handleUpdate=()=>{
        if(editedTask.title.trim().length>0){
            dispatch(editTask(editedTask))
        }
        navigate(-1)
    }
    if(!selectedTask){
        debugger
        // navigate("create")
        window.location.href ="/"
    }
    return (
        <div className="container">
            <h1>Edit Task - {selectedTask?.title}</h1>
            {/* <label id="edit-title">Title</label> */}
            <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <TextField value={editedTask.title} id="edit-title" variant="standard"
            onChange={(event)=>setEditedTask(prev=>({...prev, title:event.target.value}))}
            />
            
            <textarea
            className="form-control-edit"
            rows="10"
            // columns="100"
            id="discription"
            placeholder="Edit Description"
            value={editedTask.description}
            onChange={(e)=>setEditedTask((prev)=>({...prev, description:e.target.value}))}
            >
            </textarea>
            </Box>
            <input value={editedTask?.dueDate} type="date" id="due-date" name="due-date"
            onChange={(e)=>setEditedTask((prev)=>({...prev, dueDate:e.target.value}))}
            />

            <div className='submit-button'>
                <Button variant="contained" onClick={()=>handleUpdate()}>Update Task</Button>
            </div>
        </div>)
}

export default Edit;