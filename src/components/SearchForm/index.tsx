
// o memo é uma função do React que é usado para memorizar um componente
// usamos o memo em algum componente onde o html é bem grande (ex: lista de 200 items ou mais, etc)
import { memo } from 'react'

import {
    SearchFormContainer
} from './styles'

import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from "../../contexts/TransactionsContext"
import { useContext } from 'react'
import { useContextSelector } from 'use-context-selector'


const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
    //const { fetchTransactions } = useContext(TransactionsContext)
    
    const fetchTransactions  = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { 
        register, 
        handleSubmit,
        formState: { isSubmitted } //para ver se o form está ou nao enviando alguma informação

    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder='Busque por transações' 

                {...register('query')} // o nome query que coloquei no searchFormSchema
            />
            
            <button 
                type='submit'
                disabled={isSubmitted} //quando estiver enviado algo desabilita o botao
            >
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}
