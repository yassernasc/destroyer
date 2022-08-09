import { useSelector } from 'react-redux'

export const useAdminDisplay = () => useSelector(state => state.admin.display)
