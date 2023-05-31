// Local storage

import { KusamaQuery } from "@/types"

interface QueryCache {
  [key: string]: KusamaQuery
}

export class QueryCacheService {
  private static _instance: QueryCacheService
  private cache: QueryCache
  private cacheKey = "@gweihir.app@/queries"

  private constructor() {
    // Bring cache back to life!
    const stringData = window.localStorage.getItem(this.cacheKey)

    if (!stringData) {
      this.cache = {}
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
    this.cache[query.chainlinkRequestId] = query
    this.snapshotToLocalStorage()

    return query
  }

  /**
   * Look up query by chainlinkRequestId and update in cache and local storage
   * @throws
   */
  public update(
    chainlinkId: string,
    query: Partial<Omit<KusamaQuery, "chainlinkRequestId">>
  ): void {
    const prev = this.getChainlinkById(chainlinkId)

    if (!prev) {
      throw new Error("Query not found")
    }

    const updated = { ...prev, ...query }

    this.cache[chainlinkId] = updated

    this.snapshotToLocalStorage()
  }

  /**
   * Get query from local storage by chainlinkId
   */
  public getChainlinkById(chainlinkId: string): KusamaQuery | undefined {
    return this.cache[chainlinkId]
  }

  public getAll(): KusamaQuery[] {
    return Object.values(this.cache)
  }

  private snapshotToLocalStorage() {
    const stringData = JSON.stringify(this.cache)

    window.localStorage.setItem(this.cacheKey, stringData)
  }
}
