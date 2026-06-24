export interface IWishlistListMeta {
  _id: string;
  name: string;
  count: number;
  coverImage: string;
}

export interface ICollectionRoom {
  _id: string;
  name: string;
  images: string | null;
  price: number | { $numberDecimal: string } | null;
  country: string;
  host_name: string;
}
