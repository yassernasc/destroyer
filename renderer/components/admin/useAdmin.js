import { useSelector } from 'react-redux'

const selectAdminDisplay = state => state.admin.display
export const useAdminDisplay = () => useSelector(selectAdminDisplay)