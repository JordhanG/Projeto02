import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransActionsContainer, TransActionsTable } from "./styles";


export function Transactions() {
    const { transactions } = useContext(TransactionsContext);
    console.log(typeof transactions[2].createdAt);

    if (!transactions[1]?.createdAt) return null;

    return (
        <div>
            <Header />
            <Summary />


        <TransActionsContainer>
        <SearchForm />

            <TransActionsTable>
                <table>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </TransActionsTable>
            </TransActionsContainer>
        </div>
    )
}