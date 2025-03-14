export interface Bank {
  SwiftCode: string;
  NameEN: string;
  NameTH: string;
}

export interface GetAllBankResponse {
  banks: Bank[];
}

