import { 
    HeaderContainer, 
    HeaderContent ,
    NewTransactionButton
} from "./styles";

// import logoImg from '../../imagem'

import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from "../NewTransactionModal"

export function Header(){
    return (
        <HeaderContainer>
            <HeaderContent>
                {/* <img src={logoImg} /> */}
                <h2> DT Money </h2>

                <Dialog.Root> {/* O MODAL */}
                    
                    {/* as Child, para o Dialog.Trigger não criar outro botão, e respeitar somente o
                    NewTransactionButton como único botão */}
                    <Dialog.Trigger asChild >
                        <NewTransactionButton> Nova Transação </NewTransactionButton>
                    </Dialog.Trigger>
                    

                    <NewTransactionModal/>

                </Dialog.Root>
                
            </HeaderContent>
        </HeaderContainer>
    )
}