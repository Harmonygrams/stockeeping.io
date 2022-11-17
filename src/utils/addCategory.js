import axios from 'axios'
const addCategory = (category) => {
    const raw = JSON.stringify({"name" : category, user_id : "D4pag"})
    axios({
        url : "https://mousex.cf/api/addCategory/", 
        method : "POST",
        data : raw
    }).then(response => console.log(response)). 
    catch(err => console.log(err))
}
export default addCategory