import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './style'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { memo } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type searchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: searchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <div>
      <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
        <input
          type="text"
          placeholder="Busque por transações"
          {...register('query')}
        />

        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      </SearchFormContainer>
    </div>
  )
}
export const SearchForm = memo(SearchFormComponent)
