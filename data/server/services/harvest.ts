/**
 * Harvest API v2 Client
 * https://help.getharvest.com/api-v2/
 */

const HARVEST_API_BASE = 'https://api.harvestapp.com/v2'

interface HarvestClient {
  id: number
  name: string
  is_active: boolean
  address?: string
  currency?: string
  created_at: string
  updated_at: string
}

interface HarvestInvoice {
  id: number
  client: {
    id: number
    name: string
  }
  number: string
  amount: number
  due_amount: number
  state: 'draft' | 'open' | 'paid' | 'closed'
  issue_date: string
  due_date: string | null
  paid_date: string | null
  subject: string | null
  notes: string | null
  currency: string
  created_at: string
  updated_at: string
}

interface HarvestListResponse<T> {
  [key: string]: T[]
  page: number
  total_pages: number
  total_entries: number
  next_page: number | null
  previous_page: number | null
  links: {
    first: string
    next: string | null
    previous: string | null
    last: string
  }
}

class HarvestAPI {
  private accessToken: string
  private accountId: string

  constructor() {
    const accessToken = process.env.HARVEST_ACCESS_TOKEN
    const accountId = process.env.HARVEST_ACCOUNT_ID

    if (!accessToken || !accountId) {
      throw new Error('HARVEST_ACCESS_TOKEN and HARVEST_ACCOUNT_ID must be set in environment')
    }

    this.accessToken = accessToken
    this.accountId = accountId
  }

  private async fetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${HARVEST_API_BASE}${endpoint}`)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Harvest-Account-Id': this.accountId,
        'User-Agent': 'Magnet Data App',
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Harvest API error ${response.status}: ${errorText}`)
    }

    return response.json()
  }

  /**
   * Fetch all clients from Harvest (handles pagination)
   */
  async getAllClients(): Promise<HarvestClient[]> {
    const allClients: HarvestClient[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await this.fetch<HarvestListResponse<HarvestClient> & { clients: HarvestClient[] }>(
        '/clients',
        { page: String(page), per_page: '100' }
      )
      
      allClients.push(...response.clients)
      hasMore = response.next_page !== null
      page++
    }

    return allClients
  }

  /**
   * Fetch all invoices from Harvest (handles pagination)
   */
  async getAllInvoices(): Promise<HarvestInvoice[]> {
    const allInvoices: HarvestInvoice[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await this.fetch<HarvestListResponse<HarvestInvoice> & { invoices: HarvestInvoice[] }>(
        '/invoices',
        { page: String(page), per_page: '100' }
      )
      
      allInvoices.push(...response.invoices)
      hasMore = response.next_page !== null
      page++
    }

    return allInvoices
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<{ success: boolean; user?: string; error?: string }> {
    try {
      const response = await this.fetch<{ id: number; email: string; first_name: string; last_name: string }>('/users/me')
      return {
        success: true,
        user: `${response.first_name} ${response.last_name} (${response.email})`
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export const harvestAPI = new HarvestAPI()
export type { HarvestClient, HarvestInvoice }

