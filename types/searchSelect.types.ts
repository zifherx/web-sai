export type SEARCH_SELECT_PROPS = {
  id?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  options: IOptionSelect[]
  disabled?: boolean
}

export interface IOptionSelect {
  value: string
  label: string
}
