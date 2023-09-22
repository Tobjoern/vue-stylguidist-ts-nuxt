export interface SearchInputCategory {
  text: string
  value: string
}

export interface SeachInputSearchEvent {
  query: string
  category: string | null
}
