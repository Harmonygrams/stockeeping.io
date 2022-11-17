import { useEffect, useState } from 'react'
import Creatable from 'react-select/creatable'
import { AiOutlineClose} from 'react-icons/ai'
import "react-date-range/dist/styles.css";
import Slide from '@mui/material/Slide';
import "react-date-range/dist/theme/default.css";
import { Alert } from '@mui/material';
import {addCategory, addProducts, addSupplier, fetchCategories, fetchSuppliers } from '../../utils/index';
const AddProducts = ({closeAddProductWindow}) => {
    const [alert, setAlert] = useState(false)
    const [productDropdownOptions, setProductDropdownOptions] = useState({
        categories : [{value : "", label : ""}], 
        suppliers : [{value : "", label : ""}],
    })
    const [newProductInformation, setNewProductInformation] = useState({
        productType : 'inventory',
        productName : "", 
        productDescription : "", 
        productCategoryId : "",
        productSku : "", 
        productOnHandQty : "",
        productBrandId : "",
        productRestockPoint: "", 
        productAddedDate : "",
        productSalesPrice : "",
        productCostPrice : "",
        productSupplierId : "",
        productExpenseAccount : 'Cost Of Products', 
        productIncomeAccount : 'Sales Of Products'
    })
    const updateNewProductInformation = (e) => {
        setNewProductInformation(prevProductInformation => {
            return {...prevProductInformation, [e.target.name] : e.target.value}
        })
    }
    const updateProductDropdownnOptionsCategories = (option) => {
        addCategory(option)
        fetchCategories(setProductDropdownOptions)
    }
    const updateProductDropdownnOptionsSuppliers = (option) => {
        addSupplier(option) 
        fetchSuppliers(setProductDropdownOptions)
    }
    //updating the categories and suppliers from the database
    useEffect(() => {
        //Fetching the categories 
        fetchCategories(setProductDropdownOptions)
        //Fetching the suppliers 
        fetchSuppliers(setProductDropdownOptions)
    }, [])
    
    //Used to disable the alert component
    useEffect(() => {
        const interval = setInterval(() => {
            setAlert(false)
        }, 2000)
        return () => clearInterval(interval)
    }, [alert])
    return(
        <div className='h-screen w-full absolute top-0 left-0 flex justify-end addproducts-container scroll-smooth'>
            <div className='h-full w-full relative sm:w-2/3 md:w-3/5 xl:w-2/5 2xl:w-2/7 bg-white overflow-y-scroll bg-white'>
                {alert && <div className='fixed w-full flex justify-center md:justify-start'>
                    <Slide 
                        direction = {"down"}
                        in = {'checked'}
                    > 
                        <Alert variant={"filled"} severity={'success'}>Product Added Successfully</Alert>
                    </Slide>
                </div>}
                <div className='h-full'>
                    <div className='px-4 py-4 flex justify-between text-lg font-semibold items-center text-gray-600'> 
                        <h3 className='text-lg font-semibold'>Add Product</h3>
                        <AiOutlineClose onClick={closeAddProductWindow} className="cursor-pointer"/>
                    </div>
                    <form
                        className='px-4 mb-20 border-2' 
                        onSubmit={(e) => {
                            e.preventDefault()
                            addProducts(newProductInformation, setAlert, setNewProductInformation)
                        }
                        }
                    >
                        <fieldset className='border-2 p-4 rounded-lg'> 
                            <legend className='text-lg text-gray-600'>Product Information: </legend>
                            <div className='flex flex-col py-2'>
                                <label htmlFor="productName" className='text-gray-800 font-normal text-sm'>Name <span className='text-red-500'>*</span></label>
                                <input 
                                    name={"productName"}
                                    type = "text"
                                    value = {newProductInformation.productName}
                                    required
                                    onChange = {updateNewProductInformation}
                                    id="productName"
                                    className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic'
                                />
                            </div> 
                            <div className='flex flex-col py-2'> 
                                <label className='text-gray-800 font-normal text-sm'> Item Description </label>
                                <textarea 
                                    rows={4}
                                    className='border-2 focus:border-indigo-500 outline-none focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic'
                                    name = {"productDescription"}
                                    value = {newProductInformation.productDescription}
                                    onChange = {updateNewProductInformation}
                                ></textarea>  
                            </div>
                            <div className='border-b-2 pb-4'>
                                <div className='flex flex-col pt-2 relative h-full'> 
                                    <label className='text-gray-800 font-normal text-sm'>Category <span className='text-red-500'>*</span></label>
                                    <Creatable 
                                        options = {productDropdownOptions.categories}
                                        onCreateOption = {updateProductDropdownnOptionsCategories}
                                        onChange = {(option) => setNewProductInformation(prevData => ({...prevData, productCategoryId : option.value}))}
                                        className='focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic'
                                    />
                                </div> 
                                <div className='flex flex-col py-2'> 
                                    <label className='text-gray-800 font-normal text-sm font-semibold'>SKU</label>
                                    <input 
                                        className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic'
                                        name = {"productSku"}
                                        value = {newProductInformation.productSku}
                                        onChange = {updateNewProductInformation}
                                    />
                                </div> 
                            </div>
                            <div className='border-b-2 pb-4 pt-4'>
                                <div className='flex items-center justify-between py-2'> 
                                    <label className='text-gray-800 font-normal text-sm'>Quantity <span className="text-red-500">*</span></label>
                                    <input 
                                        className='product__input border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic text-right'
                                        type="number"
                                        min = {0}
                                        name = {"productOnHandQty"} 
                                        value = {newProductInformation.productOnHandQty}
                                        onChange = {updateNewProductInformation}
                                        required 
                                    />
                                </div>
                                <div className='flex gap-2 py-2 justify-between items-center'> 
                                    <label className='text-gray-800 font-normal text-sm'>Date Of Purchase </label>
                                    <input 
                                        type="date"
                                        className='p-2 border-2 rounded-lg transition text-sm text-gray-500 font-normal overflow-hidden'
                                        name = {"productAddedDate"}
                                        value = {newProductInformation.productAddedDate}
                                        onChange = {updateNewProductInformation}
                                    /> 
                                </div>
                                <div className='flex gap-2 py-2 justify-between items-center'> 
                                    <label className='text-gray-800 font-normal text-sm'>Restock point</label>
                                    <input 
                                        className='product__input border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic text-right'
                                        type="number"
                                        min = {0}
                                        name = {"productRestockPoint"}
                                        value = {newProductInformation.productRestockPoint}
                                        onChange = {updateNewProductInformation}
                                        required 
                                    />
                                </div> 
                            </div>
                            <div className="pb-4 pt-4">
                                <div className='flex gap-2 py-2 flex-col md:flex-row md:justify-between md:items-center'> 
                                    <div className='flex flex-col'> 
                                        <label className='text-gray-800 font-normal text-sm'>Sales Price</label>
                                        <input 
                                            className='product__input border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic text-right'
                                            type="number"
                                            min = {0}
                                            name = {"productSalesPrice"}
                                            value = {newProductInformation.productSalesPrice}
                                            onChange = {updateNewProductInformation}
                    
                                        />
                                    </div>
                                    <div className='flex flex-col'> 
                                        <label className='text-gray-800 font-normal text-sm'>Income Account </label>
                                        <input 
                                            className='product__input border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic text-right'
                                            type="text"
                                            name = {"productIncomeAccount"}
                                            value = {newProductInformation.productIncomeAccount}
                                            onChange = {updateNewProductInformation}
                                            disabled
                                        />
                                    </div>
                                </div> 
                                <div className='flex gap-2 py-2 flex-col md:justify-between md:flex-row'> 
                                    <div className='flex flex-col '> 
                                        <label className='text-gray-800 font-normal text-sm'>Cost Price</label>
                                        <input 
                                            className='product__input border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic text-right'
                                            type="number"
                                            min = {0}
                                            name = {"productCostPrice"}
                                            value = {newProductInformation.productCostPrice} 
                                            onChange = {updateNewProductInformation}
                                        />
                                    </div>
                                    <div className='flex flex-col'> 
                                        <label className='text-gray-800 font-normal text-sm'>Expense Account </label>
                                        <input 
                                            className='product__input border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic text-right'
                                            type="text"
                                            name = {"productExpenseAccount"}
                                            value = {newProductInformation.productExpenseAccount} 
                                            onChange = {updateNewProductInformation}
                                            disabled
                                        />
                                    </div>
                                </div> 
                                <div className='flex flex-col'> 
                                    <label className='text-gray-800 font-normal text-sm'>Supplier </label>
                                    <Creatable 
                                        options={productDropdownOptions.suppliers}
                                        onCreateOption = {updateProductDropdownnOptionsSuppliers}
                                        onChange = {(option) => setNewProductInformation(prevData => ({...prevData, productSupplierId : option.value}))}
                                        className='focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-500 font-normal placeholder:italic'
                                        menuPlacement='top'
                                    />
                                </div> 
                            </div>
                        </fieldset>
                        <div className='py-4 bg-gray-100 bottom-0 right-0 fixed w-full flex justify-center md:justify-end px-4 sm:w-2/3 md:w-3/5 xl:w-2/5 2xl:w-1/5'> 
                            <button className='ml-2 px-10 py-1 border-2 border-indigo-500 text-gray-800 text-sm rounded-full sm:px-12 transition' onClick={closeAddProductWindow}>Cancel</button>
                            <button className='bg-indigo-500 ml-2 px-10 py-1 border-2 border-indigo-500 text-white text-sm rounded-full sm:px-12 hover:bg-indigo-800 transition hover:text-indigo-300' type="submit">Save</button>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
    )
}
export default AddProducts
// h-screen w-full relative sm:w-2/3 md:w-3/5 xl:w-2/5 2xl:w-1/5 border-4 bg-white