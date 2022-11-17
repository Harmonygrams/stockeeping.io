import {RiMenuUnfoldFill, RiMenuFoldFill } from 'react-icons/ri'
import {BsThreeDotsVertical} from 'react-icons/bs'
import {IoNotificationsOutline} from 'react-icons/io5'
import { useDispatch, useSelector} from 'react-redux'
import {actions as sidebarActions } from '../../store/sidebarSlice/sidebarSlice'
const Navbar = () => {
    const showSidebar = useSelector(state => state.sidebar.isCollapsed)
    const dispatch = useDispatch()
    const openSidebar = () => {
        dispatch(sidebarActions.openSidebar())
    }
    const closeSidebar = () => {
        dispatch(sidebarActions.closeSidebar())
    }
    return(
    <div className='px-4 py-4'>
        <div className='flex justify-between text-2xl text-gray-800'>
            <div> 
                {
                    showSidebar ? <RiMenuFoldFill className='cursor-pointer' onClick={() => {closeSidebar()}}/> 
                    :
                    <RiMenuUnfoldFill className='cursor-pointer' onClick={() => {openSidebar()}}/> 
                }
            </div>
            <div className='flex gap-4'> 
                <IoNotificationsOutline className='cursor-pointer'/>
                <BsThreeDotsVertical className='cursor-pointer'/>
            </div>
        </div> 
    </div> 
    )
}
export default Navbar;