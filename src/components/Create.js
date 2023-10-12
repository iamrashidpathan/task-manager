import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './store/taskmanagerSlice';

const Create = (props)=>{

    const [task, setTask]=useState({title:"", description:"", dueDate:"",id:"", completed:false})
    const [id,setId] = useState(1)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        if(task.title.trim().length>0)
            dispatch(addTask(task))
    },[task.id])

    const handleSubmit =()=>{
        
        if(task.title.trim().length>0){
            setTask((prev)=>({...prev, id:id}))
            setId(prev=>prev+1)
        }else{
            alert("Please add title to create task")
        }
        
    }
    return(
    <div className='container'>
        <h1>Task Manager</h1>
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <TextField id="task-title" label="Title" variant="outlined" 
            onChange={(e)=>setTask((prev)=>({...prev, title:e.target.value}))} />
            <textarea
            className="form-control"
            rows="10"
            // columns="100"
            placeholder="Add Description"
            onChange={(e)=>setTask((prev)=>({...prev, description:e.target.value}))}
            >
            </textarea>
      </Box>

        <label id="due-date">Due Date:</label>
        <input type="date" id="due-date" name="due-date"
        onChange={(e)=>setTask((prev)=>({...prev, dueDate:e.target.value}))}
        />

        <div className='submit-button'>
            <Button onClick={()=>handleSubmit()} variant="contained">Create Task</Button>
        </div>
    </div>)
}

export default Create;