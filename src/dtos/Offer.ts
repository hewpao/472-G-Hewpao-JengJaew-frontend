export interface CreateOfferRequestDTO {
  product_request_id: number;
  offer_date: Date;
}

export interface ResponseOffer {
  ID: number;
  ProductRequestID: number;
  product_request: undefined;
  UserID: string;
  OfferDate: string;
}
