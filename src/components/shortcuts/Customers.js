import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {actions as sidebarActions } from '../../store/sidebarSlice/sidebarSlice'
import AddCustomer from '../utilityComponents/AddCustomer'
import CustomerTable  from '../tables/CustomerTable'
const Customers = () => {
    const [closeAddCustomerWindow, setCloseAddCustomerWindow] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(sidebarActions.setCurrentPage({currentPage : 'customers'}))
        document.title = "Customers" 
    }, [])
    return(
        <div className='py-4 w-full'> 
            <div className='px-4'> 
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold text-gray-800"> Customers </h2>
                    <div className='flex'> 
                        <button 
                            className='border-2 border-gray-500 px-4 py-1 text-sm rounded-full sm:px-6 flex items-center'>
                            MORE 
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                        <button 
                            className='bg-indigo-500 ml-2 px-10 py-1 border-2 border-indigo-500 text-white text-sm rounded-full sm:px-12 hover:bg-indigo-800 transition hover:text-indigo-300'
                            onClick={() => setCloseAddCustomerWindow(true)}
                        >
                            NEW
                        </button>
                    </div>
                </div> 
            </div>
            <div className='px-4'> 
                <div className='my-4 px-4 pb-4'> 
                    <div className='py-4'> 
                        <h3 className='text-lg text-gray-700 font-medium pl-4'>Invoice Summary</h3>
                    </div>
                    <div className='w-full flex flex-col gap-4 md:flex-row'>
                        <div className='w-full cursor-pointer border-r-2 flex items-end border-2 rounded-lg overflow-hidden bg-white hover:bg-gray-100 transition'> 
                            <div className='border-l-8 border-yellow-600 h-[100%] w-full py-2 px-4'>
                                <p className='text-gray-600 text-sm'>Open Invoices</p>
                                <h1 className='text-xl font-semibold mt-1 text-indigo-900'> ₦ 133,000 </h1>
                            </div> 
                        </div>
                        <div className='w-full cursor-pointer border-r-2 flex items-end border-2 rounded-lg overflow-hidden bg-white hover:bg-gray-100 transition'> 
                            <div className='border-l-8 border-green-600 h-[100%] w-full py-2 px-4'>
                                <p className='text-gray-600 text-sm'>Received Payments</p>
                                <h1 className='text-xl font-semibold mt-1 text-indigo-900'> ₦ 33,000 </h1>
                            </div> 
                        </div>
                        <div className='w-full cursor-pointer border-r-2 flex items-end border-2 rounded-lg overflow-hidden bg-white hover:bg-gray-100 transition'> 
                            <div className='border-l-8 border-red-600 h-[100%] w-full py-2 px-4'>
                                <p className='text-gray-600 text-sm'>Overdue invoices</p>
                                <h1 className='text-xl font-semibold mt-1 text-indigo-900'> ₦ 15,300 </h1>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <CustomerTable />
            {closeAddCustomerWindow && <AddCustomer closeWindow={() => setCloseAddCustomerWindow(false)}/>}
        </div>
    )
}
export default Customers;