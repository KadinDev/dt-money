import { useContext } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import {
    Overlay,
    Content,
    CloseButton,
    TransactionType,
    TransactionTypeButton
} from './styles'

import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

    //const { createTransaction } = useContext(TransactionsContext)
    const createTransaction  = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction
    })

    const {
        // control é para pegar informação no form que vem de outro lugar que não faz parte do elemento nativo do html
        // no caso quero pegar a informção do RadioButton (o valor do botao que cliquei la )
        control,
        register,
        handleSubmit,
        formState: { isSubmitted }, //para ver se o form está ou nao enviando alguma informação
        reset

    } = useForm<NewTransactionFormInputs>({
        
        resolver: zodResolver(newTransactionFormSchema),

        defaultValues: { // defautValues, eu posso colocar algum campo pra começar com algum valor
            type: 'income',
        }
    
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        const {description, price, category, type} = data

        await createTransaction({
            description, price, category, type
        })

        reset() // reseta formulário
    }

    return (
        
        <Dialog.Portal>
            {/* Dialog.Portal para o conteúdo aqui dentro, vá parar em outro lugar da aplicação,
            vai tornar o que tem dentro algo a parte da aplicação, não vai pertencer ao Header ou outro.*/}

            <Overlay/> {/* O Fundo fora do modal */}

            <Content> {/* O conteudo do modal */}
                <Dialog.Title> Nova Transação </Dialog.Title>
                
                <CloseButton> {/* O botão de fechar */}
                    <X size={24} />
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)} >
                    <input 
                        type="text" 
                        placeholder='Descrição' 
                        required 
                        {...register('description')}
                    />
                    <input 
                        type="number" 
                        placeholder='Preço' 
                        required 
                        {...register('price', { valueAsNumber: true })} // por ser número faz assim
                    />
                    <input 
                        type="text" 
                        placeholder='Categoria' 
                        required 
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name='type'
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value} >

                                    <TransactionTypeButton
                                        variant='income'
                                        value='income'
                                    >
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton
                                        variant='outcome'
                                        value='outcome'
                                    >
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button 
                        type='submit'
                        disabled={isSubmitted}
                    >
                        Cadastrar
                    </button>
                </form>

                
            </Content>

        </Dialog.Portal>
    )
}