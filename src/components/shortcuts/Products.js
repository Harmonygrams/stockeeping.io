import { useEffect, useState, useRef} from 'react'
import {actions as sidebarActions } from '../../store/sidebarSlice/sidebarSlice'
import {FiBox} from 'react-icons/fi'
import ProductTable from '../addOnComponents/ProductTable'
import {IoPricetagOutline} from 'react-icons/io5'
import { SlSocialDropbox} from 'react-icons/sl'
import { useDispatch } from 'react-redux'
import AddProducts from '../utilityComponents/AddProduct'
import {getStockDetails } from '../../utils/'
import { ScaleLoader } from 'react-spinners'
const Products = () => {
    const [isNewProductWindowOpen, setIsNewProductWindowOpen] = useState(false) 
    const [isLoadingResources, setIsLoadingResources] = useState({
        stockDetails : true
    })
    const [stockDetails, setStockDetails] = useState({lowStock : 0, outOfStock : 0, allStock : 0})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(sidebarActions.setCurrentPage({currentPage : 'products'}))
    })
    useEffect(() => {
        const closeAddProductWindow = (e) => {
            if(e.key === "Escape"){
                setIsNewProductWindowOpen(false)
            }
        }
        document.addEventListener('keydown', closeAddProductWindow)
        return () => document.removeEventListener('keydown', closeAddProductWindow)
    })
    useEffect(() => {
        //update the stock dashbarod
        getStockDetails(setStockDetails, setIsLoadingResources)
    }, [])
    return(
        <div className='py-4 w-full'>
            <div className='px-4'> 
                <div className='flex justify-between'>
                    <h2 className="text-xl font-semibold text-gray-800"> Products </h2>
                    <div className='flex'> 
                        <button 
                            className='border-2 border-gray-500 px-4 py-1 text-sm rounded-full sm:px-6 flex items-center'>
                            MORE 
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                        <button 
                            onClick={() => setIsNewProductWindowOpen(true)}
                            className='bg-indigo-500 ml-2 px-10 py-1 border-2 border-indigo-500 text-white text-sm rounded-full sm:px-12 hover:bg-indigo-800 transition hover:text-indigo-300'>
                            NEW
                        </button>
                    </div>
                </div> 
            </div>
            <div className='px-4'> 
                <div className='bg-white my-4 px-4'> 
                    <div className='py-4'> 
                        <h3 className='text-lg text-gray-700 font-medium pl-4'>Inventory Summary</h3>
                    </div>
                    <div className='flex flex-wrap px-2 pb-4'> 
                        <div className='w-[90%] sm:w-1/2 p-2 md:w-1/3'>
                            <div className='py-4 px-4 w-full border-2 flex flex-col rounded-lg bg-gray-100 cursor-pointer hover:shadow-lg transition'> 
                                <FiBox className='text-5xl text-red-500 mb-2'/> 
                                <p className='text-sm text-gray-600 mb-2'> LOW STOCK </p>
                                <h3 className='text-4xl font-semibold text-red-500'> {isLoadingResources.stockDetails ? <ScaleLoader color="#ef4746" width={3} height={20} /> : stockDetails.lowStock}</h3>
                            </div>
                        </div> 
                        <div className='w-[90%] sm:w-1/2 p-2 md:w-1/3'>
                            <div className='py-4 px-4 w-full border-2 flex flex-col rounded-lg bg-gray-100 cursor-pointer hover:shadow-lg transition'> 
                                <SlSocialDropbox className='text-5xl text-orange-500 mb-2'/> 
                                <p className='text-sm text-gray-600 mb-2'> OUT OF STOCK </p>
                                <h3 className='text-4xl font-semibold text-orange-500'> {isLoadingResources.stockDetails ? <ScaleLoader color="#f87f31" width={3} height={20} /> : stockDetails.outOfStock}</h3>
                            </div>
                        </div> 
                        <div className='w-[90%] sm:w-1/2 p-2 md:w-1/3'>
                            <div className='py-4 px-4 w-full border-2 flex flex-col rounded-lg bg-gray-100 cursor-pointer hover:shadow-lg transition'> 
                                <IoPricetagOutline className='text-5xl text-green-500 mb-2'/> 
                                <p className='text-sm text-gray-600 mb-2'> TOTAL STOCKS </p>
                                <h3 className='text-4xl font-semibold text-green-500'> {isLoadingResources.stockDetails ? <ScaleLoader color="#21c55d" width={3} height={20} /> : stockDetails.totalStock}</h3>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

            {/* ----------------------------- PRODUCT TABLE ------------------------------------ */}
            <ProductTable />
            {/* ----------------------------- ADD PRODUCTS  ------------------------------------ */}
            {isNewProductWindowOpen && <AddProducts closeAddProductWindow = {()=> {setIsNewProductWindowOpen(false)}}/>}
        </div> 
    )
}
export default Products