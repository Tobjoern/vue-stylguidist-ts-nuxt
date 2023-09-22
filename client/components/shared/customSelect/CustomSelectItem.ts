export interface CustomSelectItem {
  title: string
  value: string
  data?: any // can be used, if additional data is needed
  isHeader?: boolean // indicates, that item isn't selectable,
  // but should be displayed as a header
}
