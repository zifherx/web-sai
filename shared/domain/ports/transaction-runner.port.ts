declare const transactionBrand: unique symbol

export type TransactionContext = { readonly [transactionBrand]: true }

export interface ITransactionRunner {
  run<T>(work: (tx: TransactionContext) => Promise<T>): Promise<T>
}
