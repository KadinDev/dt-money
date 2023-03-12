import { useContext } from "react"

import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"

import {
    TransactionsContainer,
    TransactionsTable,
    PriceHightlight
} from './styles'

import { SearchForm } from '../../components/SearchForm'
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { dateFormatter, priceFormatter } from '../../utils/Formatter'

import { useContextSelector } from 'use-context-selector'


export function Transactions(){
    
    //const { transactions } = useContext(TransactionsContext)

    const transactions  = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                
                <SearchForm />
                
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id} >
                                    <td width='50%'> {transaction.description} </td>

                                    <td> 
                                        <PriceHightlight variant={transaction.type} >
                                            { transaction.type === 'outcome' && '- ' }
                                            {priceFormatter.format(transaction.price)} 
                                        </PriceHightlight> 
                                    </td>

                                    <td> {transaction.category} </td>
                                    <td> {dateFormatter.format(new Date(transaction.createdAt))} </td>
                                </tr>
                            )
                        })}
                        
                        {/* 
                        <tr>
                            <td width='50%'>Despesas</td>

                            <td> 
                                <PriceHightlight variant="outcome">
                                    - R$ 1.500,00 
                                </PriceHightlight> 
                            </td>

                            <td>Alimentação</td>
                            <td>13/04/2022</td>
                        </tr>
                        */}
                        
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>

        </div>
    )
}