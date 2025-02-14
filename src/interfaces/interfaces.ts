export interface Product {
  nombre: string;
  tipo: string;
  precio: number;
  imagen: string;
  isSelected?: boolean;
  count: number;
}


export interface ContentData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content:any[];
}
export interface IDataProducts {
  products: Product[];
  headers: string[];
}
