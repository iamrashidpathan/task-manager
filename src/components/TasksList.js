import { useSelector, useDispatch } from "react-redux"
import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { deleteTask, markTaskCompleted } from "./store/taskmanagerSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

const TaskList = ()=>{
    const dispatch = useDispatch()
    const taskList = useSelector(store=> store.taskmanager)
    const [taskListSearched, setTaskListSearched] = useState([...taskList])
    const [sorted, setSorted] =useState(false)

    useEffect(()=>{
        setTaskListSearched([...taskList])
    },[taskList])

    const handleDelete=(id, completed)=>{
        if(!completed){
            const areYouSure = window.confirm("Task is not Completed. Are you sure you want to delete it?")
            if (areYouSure){
                dispatch(deleteTask(id))
            }
        }else{
            dispatch(deleteTask(id))
        }
        
    }

    const handleSearch = (title)=>{
        if(title.length ===0){
            setTaskListSearched([...taskList])
            return
        }
        setTaskListSearched(taskList.filter(task => task.title.toLowerCase().includes(title.toLowerCase())))
    }

    const handleSort = ()=>{
        if(!sorted){
            taskListSearched.sort((a,b)=>b.id-a.id)
            setSorted(!sorted)
        }
        else{
            taskListSearched.sort((a,b)=>a.id-b.id)
            setSorted(!sorted)
        }  
    }

    const handleMarkCompleted = (checked, id)=>{
            dispatch(markTaskCompleted({checked,id}))
    }

    return(
        <div className="task-list">
            {
            taskList.length>1 && 
                <div>
                     <TextField
                    id="standard-search"
                    label="Search Task Title"
                    type="search"
                    variant="standard"
                    onChange={(event)=>handleSearch(event.target.value)}
                    />
                </div>
            }
            {taskListSearched.length>1 && 
                <div>
                    <Button onClick={()=>handleSort()} size="small">Sort by Id</Button>
                </div>
            }
            {taskListSearched.map((task,index)=>
            
                <div className="taskcard" key={index}>
                    <Card sx={{ minWidth: 100 }}>
                    <CardContent>
                        <Typography variant="body1">
                        ID - {task.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                         {task.title}
                        </Typography>
                        <Typography variant="h6">
                            {task.description}
                        </Typography>
                        <Typography variant="body1">
                            {task.dueDate} 
                        </Typography>
                        <FormControlLabel control={<Checkbox onClick={(event)=>handleMarkCompleted(event.target.checked, task.id)}
                                        checked={task.completed} color="success"/>} label="Completed" />
                    </CardContent>

                    <CardActions className="card-action">
                        <Button size="small"><Link to ={`/edit/${task.id}`}>Edit</Link></Button>
                        <Button onClick={()=>handleDelete(task.id, task.completed)} size="small">Delete</Button>
                        {/* <Button size="small">Learn More</Button> */}
                    </CardActions>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default TaskList