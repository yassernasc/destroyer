import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectLoadingMessage = state => state.loading.message
export const useLoadingMessage = () => useSelector(selectLoadingMessage)
