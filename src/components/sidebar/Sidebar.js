import {BiHomeAlt} from 'react-icons/bi'
import {FiUsers, FiShoppingCart} from 'react-icons/fi'
import {RiShoppingBag3Line} from 'react-icons/ri'
import {actions as sidebarActions } from '../../store/sidebarSlice/sidebarSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const Sidebar = () => {    
    const currentPage = useSelector(state => state.sidebar.currentPage)
    const dispatch = useDispatch() 
    const closeSidebar = (e) => {
        if(e.target.classList.contains('sidebar-container')){
            dispatch(sidebarActions.closeSidebar())
        }
    }
    //On medium screen sizes and above, sidebar would be permanent 
    useEffect(() => {
        const closeSidebarOnSmallerWindow = () => {
            if(window.innerWidth <= 768){
                dispatch(sidebarActions.closeSidebar())
            }
        }
        window.addEventListener('resize', closeSidebarOnSmallerWindow)
        return () => window.removeEventListener('resize', closeSidebarOnSmallerWindow)
    }, [])
    return(
        <aside className='w-full h-screen absolute left-0 top-0 sidebar-container md:w-60 md:relative ' onClick={closeSidebar}> 
            <div className='bg-indigo-500 h-full w-80 md:w-full'>
                <div className='py-4 pl-4'> 
                    <a className="italic text-xl text-gray-300 font-medium" href="#">storekeeper &trade;</a>
                </div>
                <div className='border-2 text-center w-3/4 ml-4 border-gray-300 text-white rounded-full mb-6 py-1'> 
                    <a href="/" className=''>+ New</a>
                </div>
                <div className='text-gray-200 text-sm '>
                    <a 
                        style={{backgroundColor : currentPage === 'dashboard' && "#312e81", color : "#fff"}} 
                        href="/user/dashboard" 
                        className='flex items-center gap-2 pl-4 py-2 mb-2 text-white hover:bg-indigo-800 transition'
                    > 
                        <BiHomeAlt />
                        <span> Dashboard </span> 
                    </a>
                    <a 
                        style={{backgroundColor : currentPage === 'products' && "#312e81", color : "#fff"}} 
                        href="/user/products" 
                        className='flex items-center gap-2 pl-4 py-2 hover:bg-indigo-800 transition'
                    > 
                        <RiShoppingBag3Line />
                        <span> Products </span> 
                    </a>                
                    <a 
                        style={{backgroundColor : currentPage === 'customers' && "#312e81", color : "#fff"}} 
                        href="/user/customers"
                        className='flex items-center gap-2 pl-4 py-2 hover:bg-indigo-800 transition'
                    > 
                        <FiUsers />
                        <span> Customers </span> 
                    </a>                
                    <a 
                        style={{backgroundColor : currentPage === 'sales' && "#312e81", color : "#fff"}} 
                        href="/user/sales" 
                        className='flex items-center gap-2 pl-4 py-2 hover:bg-indigo-800 transition'
                    > 
                        <FiShoppingCart/>
                        <span> Sales </span> 
                    </a>
                    <a 
                        style={{backgroundColor : currentPage === 'reports' && "#312e81", color : "#fff"}} 
                        href="/user/reports" 
                        className='flex items-center gap-2 pl-4 py-2 hover:bg-indigo-800 transition'
                    > 
                        <FiUsers />
                        <span> Customers </span> 
                    </a>
                </div>
            </div>
        </aside>
    )
}
export default Sidebar     