import { useFilter } from './useFilter'

export const useIsFilterActive = () => {
  const filter = useFilter()
  return filter !== ''
}
