import { createSlice } from '@reduxjs/toolkit'

const { os } = window.env
const adminSlice = createSlice({ initialState: { os }, name: 'env' })

export default adminSlice.reducer
