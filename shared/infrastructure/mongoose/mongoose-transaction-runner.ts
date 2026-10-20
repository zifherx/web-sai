import {
  type ITransactionRunner,
  type TransactionContext,
} from "@/shared/domain/ports/transaction-runner.port"
import mongoose, { type ClientSession } from "mongoose"

export class MongooseTransactionRunner implements ITransactionRunner {
  run<T>(work: (tx: TransactionContext) => Promise<T>): Promise<T> {
    return mongoose.connection.transaction((session) =>
      work(session as unknown as TransactionContext)
    )
  }
}

export function toSession(tx?: TransactionContext): ClientSession | null {
  return (tx as unknown as ClientSession | undefined) ?? null
}
