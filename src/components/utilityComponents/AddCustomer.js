import { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import {TextField} from '@mui/material/'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import {AiOutlineClose} from 'react-icons/ai'
import {addCustomer} from '../../utils/'
import { ScaleLoader } from 'react-spinners'
import { Alert } from '@mui/material';
const AddCustomer = ({closeWindow}) => {
    const [sendingRequestLoader, setSendingRequestLoader ] = useState(false)
    const [alert, setAlert] = useState(false)
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "", 
        companyName : "", 
        phone : "",
        email : "",
        address : "", 
        openingBalance : "0.00", 
        birthDay : new Date(),
    })
    const updateFormData = (e) => {
        const name = [e.target.name]
        setFormData(prev => ({...prev, [name] : e.target.value}))
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setAlert(false)
        }, 2000)
        return () => clearInterval(interval)
    }, [alert]) 
    return(
        <div className="absolute w-screen h-screen top-0 bg-white left-0 transparent-bg md:flex md:flex-col md:justify-center"> 
            <form 
                className="bg-white h-full md:w-2/5 md:mx-auto relative md:h-[90%] md:p-4 md:rounded-lg"
                onSubmit={(e) => {
                    e.preventDefault() 
                    setSendingRequestLoader(true)
                    addCustomer(formData, setSendingRequestLoader, setAlert)
                }}
                
            >
                {alert && <Alert 
                    className='absolute w-full left-0 top-0'
                    severity='success'
                >Customer Created Successfully</Alert>}
                <div className='min-h-min'>
                    <div className='px-4 py-4 flex justify-between text-lg font-medium items-center text-gray-900'> 
                        <h3 className='text-lg font-semibold'>Add Customer</h3>
                        <AiOutlineClose onClick={closeWindow} className="cursor-pointer"/>
                    </div>
                    <div className='px-4 py-2'> 
                        <div className='md:flex justify-between gap-4'> 
                            <div className='flex flex-col gap-1 mb-2 md:w-1/2'>
                                <label className='text-sm font-medium text-gray-600'>First Name <span className='text-red-500'>*</span></label>
                                <input 
                                    name = {"firstName"}
                                    type = {"text"}
                                    placeholder = {"First name"}
                                    className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-800 font-normal placeholder:italic'
                                    value = {formData.firstName}
                                    onChange = {updateFormData}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1 mb-4 md:w-1/2'>
                                <label className='text-sm font-medium text-gray-600'>Last Name</label>
                                <input 
                                    name = {"lastName"}
                                    type = {"text"}
                                    placeholder = {"Last name"}
                                    className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-800 font-normal placeholder:italic'
                                    value = {formData.lastName}
                                    onChange = {updateFormData}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mb-8'>
                            <label className='text-sm font-medium text-gray-600'>Company Name</label>
                            <input 
                                name = {"companyName"}
                                type = {"text"}
                                placeholder = {"CompanyName"}
                                className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-800 font-normal placeholder:italic'
                                value = {formData.companyName}
                                onChange = {updateFormData}
                            />
                        </div>
                        <div className='md:flex md:justify-between md:gap-4'> 
                            <div className='flex flex-col gap-1 mb-4 md:w-1/2'>
                                <label className='text-sm font-medium text-gray-600'>Phone Number</label>
                                <input 
                                    name = {"phone"}
                                    type = {"tel"}
                                    placeholder = {"+23481878493"}
                                    className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-800 font-normal placeholder:italic'
                                    value = {formData.phoneNumber}
                                    onClick = {updateFormData}
                                />
                            </div>
                            <div className='flex flex-col gap-1 mb-8 md:w-1/2'>
                                <label className='text-sm font-medium text-gray-600'>Email Address</label>
                                <input 
                                    name = {"email"}
                                    type = {"email"}
                                    placeholder = {"example@gmail.com"}
                                    className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-800 font-normal placeholder:italic'
                                    value = {formData.emailAddress}
                                    onClick = {updateFormData}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mb-4'>
                            <label className='text-sm font-medium text-gray-600'>Company Address</label>
                            <textarea
                                name = {"address"}
                                className='border-2 focus:border-indigo-500 outline-none  focus:shadow-lg rounded-lg transition px-2 py-2 text-sm text-gray-800 font-normal placeholder:italic'
                                rows={3}
                                value = {formData.address}
                                onChange = {updateFormData}
                            > </textarea>
                        </div>
                        <div className='flex flex-col gap-8'> 
                            <fieldset className='border-2 outline-none  focus:shadow-lg rounded-lg transition text-sm text-gray-800 font-normal placeholder:italic px-2 py-1'> 
                                <legend> Opening Balance</legend>        
                                <div> 
                                    <input 
                                        name = {"openingBalance"}
                                        placeholder='0.00'
                                        className='text-right w-full px-2 py-1 outline-none text-sm'
                                        value = {formData.openingBalance}
                                        onChange = {updateFormData}
                                    />
                                </div>
                            </fieldset>
                            <LocalizationProvider dateAdapter={AdapterDateFns}> 
                                <DatePicker
                                    name = ""
                                    label={"Birthday"}
                                    value={formData.birthDay}
                                    onChange={value => setFormData(prev => ({...prev, birthDay : value}))}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div className='border-t-2 sticky bottom-0 w-full left-0 flex gap-4 px-8 py-6 text-sm justify-center md:justify-end bg-white z-10'>
                    <button 
                        className='border-2 rounded-lg px-4 py-1 text-gray-600 hover:bg-gray-100'
                        onClick={closeWindow}
                    >
                    Cancel</button>
                    <button 
                        className={sendingRequestLoader ? 
                            'bg-indigo-500 rounded-lg px-4 py-1 text-white hover:bg-indigo-800 cursor-wait' :
                            'bg-indigo-500 rounded-lg px-4 py-1 text-white hover:bg-indigo-800'}
                        >{sendingRequestLoader ? 
                    <div className='flex gap-2 items-center'>
                        Save & Continue
                        <ScaleLoader color="#fff" width={2} height={10}/> 
                    </div> 
                        : 
                    "Save & Continue" }
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AddCustomer