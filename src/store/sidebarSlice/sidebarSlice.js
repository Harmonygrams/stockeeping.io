import { createSlice } from '@reduxjs/toolkit'
const sidebarSlice = createSlice({
    name : 'sidebarSlice', 
    initialState : { isCollapsed : true, currentPage : null}, 
    reducers : {
        openSidebar : (state) => {
            state.isCollapsed = true
        },
        closeSidebar : (state) => {
            state.isCollapsed = false
        }, 
        setCurrentPage : (state, actions) => {
            state.currentPage = actions.payload.currentPage
        }
    }
})
const actions = sidebarSlice.actions
const sidebarReducers =  sidebarSlice.reducer 
export {actions, sidebarReducers}