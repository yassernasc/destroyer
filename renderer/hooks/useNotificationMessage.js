import { useSelector } from 'react-redux'

export const useNotificationMessage = () =>
  useSelector(state => state.notification.message)
