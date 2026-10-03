import {
  ITransactionRunner,
  TransactionContext,
} from "@/shared/domain/ports/transaction-runner.port"
import mongoose, { type ClientSession } from "mongoose"

/**
 * Adaptador de `ITransactionRunner` sobre `connection.transaction()`
 * (commit/abort automáticos y reintento ante errores transitorios).
 *
 * Requiere un replica set: MongoDB Atlas (incluido M0) lo es. Un `mongod`
 * standalone local NO soporta transacciones; en tests de integración usar
 * `MongoMemoryReplSet`.
 */
export class MongooseTransactionRunner implements ITransactionRunner {
  run<T>(work: (tx: TransactionContext) => Promise<T>): Promise<T> {
    return mongoose.connection.transaction((session) =>
      work(session as unknown as TransactionContext)
    )
  }
}

/** Traduce el contexto opaco a la sesión de Mongoose (solo en repositorios). */
export function toSession(tx?: TransactionContext): ClientSession | null {
  return (tx as unknown as ClientSession | undefined) ?? null
}
