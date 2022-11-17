import axios from 'axios'
const addSupplier = (option) => {
    const raw = JSON.stringify({
        name : option, 
        phone : "", 
        email : "", 
        country : "", 
        city : "", 
        postcode : "",
        address : "", 
        user_id : "D4pag"
    })
    axios({
        method : "POST",
        url : "https://mousex.cf/api/addSupplier/",
        data : raw
    }).
    then(response => console.log(response)). 
    catch(err => console.log(err))
}
export default addSupplier