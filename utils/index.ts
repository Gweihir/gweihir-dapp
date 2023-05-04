// Local storage
// Key = gweihir.queries
// Value = {[txId: string]: KusamaQuery}

import { KusamaQuery } from "@/types";

/**
 * @throws
 */
export function create(query: KusamaQuery): void {
  // Save query to local storage
}

/**
 * @throws
 */
export function update(txId: string, query: Partial<KusamaQuery>): void {
  // Look up query by txId and update it in local storage

  // Get tx by id
  const prev = getByTxId(txId);

  if (!prev) {
    throw new Error("Query found");
  }

  const updated = { ...prev, ...query };

  // Update in local storage
}

export function getByTxId(txId: string): KusamaQuery | null {
  // Get query from local storage by txId
  // TODO:
  return null;
}

export function getAll(): KusamaQuery[] {
  // TODO:
  return [];
}
