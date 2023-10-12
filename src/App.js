import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Landing from './components/Landing';
import Edit from './components/Edit';
import { Provider } from "react-redux"
import appStore from './components/store/appStore';


function App() {
  return (
    
    <div className='App'>
      
      <Landing/>
      
    </div>
    
  );
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/edit/:id",
    element: <Edit/>
  }
])



export default appRouter;
