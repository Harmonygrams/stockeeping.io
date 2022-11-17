import './App.css';
import {Sidebar, Products, Navbar} from './components/index'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useSelector} from 'react-redux'
function App() {
  const showSidebar =  useSelector(state => state.sidebar.isCollapsed)
  return (
    <div className="App md:flex">
      {showSidebar && <Sidebar />}
      <div className='h-screen border-2 md:w-full overflow-x-scroll'>
        <Navbar />
        <Router> 
          <Routes> 
            <Route path="/user/products" element={<Products />}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
