import { configureStore } from '@reduxjs/toolkit'
import {sidebarReducers} from './sidebarSlice/sidebarSlice'
const store = configureStore({
    reducer : {
        sidebar : sidebarReducers
    }
})
export default store 