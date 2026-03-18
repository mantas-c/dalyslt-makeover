export interface Filters {
  vehicleType: string
  make: string
  model: string
  generation: string
  category: string
  priceMin: number
  priceMax: number
  conditions: string[]
  countries: string[]
  q: string
}

export interface Listing {
  id: number
  code: string
  name: string
  icon: string
  condition: 'A' | 'B' | 'C'
  status: string
  price: string
  priceNum: number
  originalPrice?: string
  tags: string[]
  country: string
  flag: string
  city: string
  delivery: string
  year?: number
  body?: string
  engine?: string
  power?: string
  fuel?: string
  gearbox?: string
  drive?: string
  category: string
}
