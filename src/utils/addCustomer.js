import axios from 'axios'
const addCustomer = (formData, setSendingRequestLoader, setAlert) => {
    const date = new Date(formData.birthDay)
    const raw = JSON.stringify({
        name : formData.firstName, 
        last_name : formData.lastName, 
        phone : formData.phone,
        email : formData.email, 
        company_name : formData.companyName, 
        city : "", 
        postcode : "", 
        address : formData.address, 
        debt : Number(formData.openingBalance),
        birth : date.toISOString(), 
        user_id : "D4pag"
    })
    axios({
        url : "https://mousex.cf/api/addCustomer/", 
        method : "POST", 
        data : raw,
    }).then(response =>{
        if(response.data.status === 'success'){
            setAlert(true)
        }
        setSendingRequestLoader(false)
    }). 
    catch(err => {
        setSendingRequestLoader(false)
        console.log(err)
    })
}
export default addCustomer