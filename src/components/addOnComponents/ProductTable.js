import { useEffect, useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import TableData from './TableData'
import fetchProducts from '../../utils/fetchProducts'
const ProductTable = () => {
    const [tableData, setTableData] = useState([])
    const [isLoadingResources, setIsLoadingResources] = useState(false)
    useEffect(() => {
        fetchProducts(setTableData)
    }, [isLoadingResources])
    return(
        <div className='px-4 py-8'> 
            <div className=''>
                <form className='flex gap-2 items-center'> 
                    <button type="submit"> 
                        <FiSearch 
                            className='text-2xl text-gray-500'
                        />
                    </button>
                    <input 
                        name = "productSearch"
                        placeholder='Search products by name'
                        className="px-2 py-1 outline-none w-2/3 placeholder:text-sm bg-white sm:w-60 text-sm text-gray-500 border-2 "
                    />
                    
                </form>
            </div>
            <div className='py-4 w-100% overflow-x-scroll scroll-smooth'> 
                <table className='w-full'>
                    <thead  className='text-left text-sm text-gray-70 bg-white'> 
                        <td className='font-medium py-2 px-2 border-x-2 border-b-4 hover:bg-gray-100 hover:cursor-pointer'> Name </td>
                        <td className='font-medium py-2 px-2 border-x-2 border-b-4 hover:bg-gray-100 hover:cursor-pointer'> Type </td>
                        <td className='font-medium py-2 px-2 border-x-2 border-b-4 hover:bg-gray-100 hover:cursor-pointer'> Description </td>
                        <td className='font-medium py-2 px-2 border-x-2 border-b-4 hover:bg-gray-100 hover:cursor-pointer'> Price </td>
                        <td className='font-medium py-2 px-2 border-x-2 border-b-4 hover:bg-gray-100 hover:cursor-pointer'> Cost </td>
                        <td className='font-medium py-2 px-2 border-x-2 border-b-4 hover:bg-gray-100 hover:cursor-pointer'> Quantity </td>
                    </thead>
                    <tbody> 
                        {tableData.map(product => <TableData {...product}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ProductTable