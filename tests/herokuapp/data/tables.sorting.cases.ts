import { HeaderTable } from '../../../pages/herokuapp/TablesPage'
import { SortDirection } from '../../helpers/sorting'

export const sortingCases: Array<{
  header: HeaderTable
  description: string
  direction: SortDirection
}> = [
    { header: 'lastName', description: 'sort last name ascending', direction: 'asc' },
    { header: 'lastName', description: 'sort last name descending', direction: 'desc' },
    { header: 'firstName', description: 'sort first name ascending', direction: 'asc' },
    { header: 'firstName', description: 'sort first name descending', direction: 'desc' },
    { header: 'email', description: 'sort email ascending', direction: 'asc' },
    { header: 'email', description: 'sort email descending', direction: 'desc' },
    { header: 'due', description: 'sort due amount ascending', direction: 'asc' },
    { header: 'due', description: 'sort due amount descending', direction: 'desc' },
  ]

