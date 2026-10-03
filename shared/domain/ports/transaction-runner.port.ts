declare const transactionBrand: unique symbol

/**
 * Contexto de transacción opaco. Los casos de uso solo lo reciben y lo
 * pasan a los repositorios; el adaptador Mongoose lo traduce a `ClientSession`.
 */
export type TransactionContext = { readonly [transactionBrand]: true }

export interface ITransactionRunner {
  /**
   * Ejecuta `work` dentro de una transacción. Si `work` lanza, se hace
   * rollback y el error se propaga. `work` puede reintentarse ante errores
   * transitorios: no debe tener efectos fuera de la base de datos.
   */
  run<T>(work: (tx: TransactionContext) => Promise<T>): Promise<T>
}
