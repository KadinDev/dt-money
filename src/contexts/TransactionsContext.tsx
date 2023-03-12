// Estou criando um context das minhas transações para compartilhar pelos componentes

import { ReactNode, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsContextProps {
    children: ReactNode
}

interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome'
}

// troquei o createContext que vinha do React pelo do use-context-selector
export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider( {children} : TransactionsContextProps ) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    // async function fetchTransactions(query?: string){
    const fetchTransactions = useCallback( async (query?: string) => {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt', // ordenar
                _order: 'desc',
                q: query
            }
        })
        setTransactions(response.data)
    },[])



    // useCallback vai evitar que a função seja recirada em memoria, se nenhuma informação
    // que a função receba tenha mudado
    // antes estava como: async function createTransaction
    const createTransaction = useCallback(async ( data: CreateTransactionInput ) => {
        const {description, price, category, type} = data

        const response = await api.post('transactions', {
            // o id o json-server cria sozinho
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        setTransactions( state => [ response.data, ...state ])
    }, []) // se o array aqui for vazio, essa função nunca vai ser recriada em memória


    
    // aqui faço a chamada na API, e envio o transactions no Provider
    // criei esse Provider pois quero compartilhar as transactions em componentes diferentes
    // se fosse para apenas um componente, faria a chamada API somente em tal componente
    useEffect(() => {
        fetchTransactions()
    },[])


    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                fetchTransactions,
                createTransaction
            }}
        >
            {children}
        </TransactionsContext.Provider>
    )
}