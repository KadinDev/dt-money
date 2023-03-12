/*
    AQUI ESTOU CRIANDO MEU PROPRIO HOOK PARA SOMAR MINHAS TRANSAÇÕES, E CHAMO ESSE HOOK NO MEU
    SUMMARY, É UMA ÓTIMA IDEIA ESSA IDEIA DE CRIAR ESSE HOOK CASO O CALCULO SEJA MUITO MAIS COMPLEXO
    AO PONTO DE TER VARIAS LINHAS DE CODIGOS, DEIXANDO ASSIM MEU COMPONENTE DE SUMMARY MENOR E MAIS LIMPO
*/
import { useMemo } from "react" // o useMemo é o mesmo estilo do memo, porém ele é para memorizar
// variaveis


import { TransactionsContext } from "../contexts/TransactionsContext"

import { useContextSelector } from 'use-context-selector'

export function useSummary(){
    //const { transactions } = useContext(TransactionsContext)

    const transactions  = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    // o reduce é um metodo que permite percorrer um Array e reduzir o array
    // a alguma nova estrutura de dados. vou reduzir o Array de transactions para a seguinte forma:
    // { income: 0, outcome: 0, total: 0 }
    // ESSA VARIAVEL SUMMARY SO VAI SER RECRIADA QUANDO O TRANSACTIONS MUDAR
    const summary = useMemo(() => {
        return transactions.reduce(
            // acumalator é o objeto do 2° parametro abaixo
            (acumalator, transaction) => {
                if(transaction.type === 'income'){
                    acumalator.income += transaction.price
                    //quando for uma entrada eu aumento o valor do total com o valor da entrada da transação
                    acumalator.total += transaction.price 
                } else {
                    acumalator.outcome += transaction.price
                    //quando for uma saida eu diminuo o valor do total com o valor da entrada da transação
                    acumalator.total -= transaction.price
                }
    
                return acumalator
            },
            { 
                income: 0, 
                outcome: 0, 
                total: 0 
            }
        )
    }, [transactions] )

    return summary
}