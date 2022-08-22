import { useSelector } from 'react-redux'

export const useIsScanningLibrary = () =>
  useSelector(state => state.library.scanning)
