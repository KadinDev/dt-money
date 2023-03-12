
import { 
    SummaryContainer, 
    SummaryCard,
} from "./styles"

import { ArrowCircleUp, CurrencyDollar, ArrowCircleDown } from 'phosphor-react'

import { priceFormatter } from '../../utils/Formatter'
import { useSummary } from "../../hooks/useSummary"

export function Summary(){
    const summary = useSummary()

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={22} color='#00b37e' />
                </header>

                <strong> {priceFormatter.format(summary.income)} </strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={22} color='#f75a68' />
                </header>

                <strong> {priceFormatter.format(summary.outcome)} </strong>
            </SummaryCard>

            <SummaryCard
                variant="green"
            >
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={22} color='#fff' />
                </header>

                <strong> {priceFormatter.format(summary.total)} </strong>
            </SummaryCard>
        </SummaryContainer>
    )
}