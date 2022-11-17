import axios from 'axios'
const fetchCategories = async (setProductDropdownOptions) => {
    const raw = JSON.stringify({user_id : 'D4pag'})
    axios({
        method : 'POST', 
        data : raw, 
        url : 'https://mousex.cf/api/getCategories/'
    }).
    then(response => response).
    then(result => result.data).
    then(data => data.category).
    then(category => {
        const newCategories = category.map(category => ({ label : category.name, value : category.id}))
        setProductDropdownOptions(prevData => {
            return {...prevData, categories : newCategories}
        })
    }).
    catch(err => console.log(err))
}
export default fetchCategories