// Local storage

import { KusamaQuery } from "@/types"

type QueryCache = KusamaQuery[]

export class QueryCacheService {
  private static _instance: QueryCacheService
  private cache: QueryCache
  private cacheKey = "@gweihir.app@/queries"

  private constructor() {
    // Bring cache back to life!
    const stringData = window.localStorage.getItem(this.cacheKey)

    if (!stringData) {
      this.cache = []
    } else {
      const data = JSON.parse(stringData)
      this.cache = data
    }
  }

  public static createInstance() {
    if (!QueryCacheService._instance) {
      QueryCacheService._instance = new QueryCacheService()
    }

    return QueryCacheService._instance
  }

  /**
   * Save query to cache and update local storage
   * @throws
   */
  public save(query: KusamaQuery): KusamaQuery {
    if (this.getQueryByTxId(query.txId)) {
      this.updateByTxId(query.txId, query)
    } else if (
      query.chainlinkRequestId &&
      this.getQueryByChainlinkReqId(query.chainlinkRequestId)
    ) {
      this.updateByChainlinkReqId(query.chainlinkRequestId, query)
    } else {
      // Save to front of cache array
      this.cache.push(query)
    }

    this.snapshotToLocalStorage()

    return query
  }

  /**
   * Look up query by chainlinkRequestId and update in cache and local storage
   * @throws
   */
  public updateByTxId(txId: string, query: Partial<Omit<KusamaQuery, "txId">>): void {
    const prev = this.getQueryByTxId(txId)

    if (!prev) {
      throw new Error("Query not found")
    }

    const updated = { ...prev, ...query }

    this.cache = this.cache.map((q) => (q.txId === txId ? updated : q))

    this.snapshotToLocalStorage()
  }

  public updateByChainlinkReqId(
    chainlinkRequestId: string,
    query: Partial<Omit<KusamaQuery, "chainlinkRequestId">>
  ): void {
    const prev = this.getQueryByChainlinkReqId(chainlinkRequestId)

    if (!prev) {
      throw new Error("Query not found")
    }

    const updated = { ...prev, ...query }

    this.cache = this.cache.map((q) => (q.chainlinkRequestId === chainlinkRequestId ? updated : q))

    this.snapshotToLocalStorage()
  }

  /**
   * Get query from local storage by chainlinkId
   */
  public getQueryByTxId(txId: string): KusamaQuery | undefined {
    return this.cache.find((q) => q.txId === txId)
  }

  /**
   * Get query by chainlinkRequestId
   */
  public getQueryByChainlinkReqId(chainlinkRequestId: string): KusamaQuery | undefined {
    return this.cache.find((q) => q.chainlinkRequestId === chainlinkRequestId)
  }

  public getAll(): KusamaQuery[] {
    return [...this.cache]
  }

  public getAllPendingChainlinkRequestIds(): string[] {
    return this.cache
      .filter(
        (q): q is KusamaQuery & { chainlinkRequestId: string } =>
          q.freePlank === undefined && !!q.chainlinkRequestId
      )
      .map((q) => q.chainlinkRequestId)
  }

  private snapshotToLocalStorage() {
    const stringData = JSON.stringify(this.cache)

    window.localStorage.setItem(this.cacheKey, stringData)
  }
}
