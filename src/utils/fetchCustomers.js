import axios from 'axios'
const fetchCustomers = (setTableData) => {
    const raw = JSON.stringify({
        user_id : "D4pag"
    })
    axios({
        url : "https://mousex.cf/api/getCustomers/", 
        method : "POST", 
        data : raw
    }).then(repsonse => repsonse.data.customers).
    then(customers => {
        setTableData(customers)
    }).
    catch(err => console.log(err))
}
export default fetchCustomers