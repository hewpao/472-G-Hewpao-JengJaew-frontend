export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED'
  }
  
  export enum TransactionType {
    PAYMENT = 'PAYMENT',
    REFUND = 'REFUND',
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL'
  }
  
  
 
export interface GetTransactionResponse {
    id: string;
    user_id: string;
    amount: number;
    currency: string;
    third_party_gateway: string;
    third_party_payment_id: string | null;
    product_request_id: number | null;
    status: PaymentStatus;
    created_at: string;
    updated_at: string; 
  }
  
  /**
   * Utility type for minimal transaction information
   * Useful for transaction list views
   */
  export interface TransactionSummary {
    id: string;
    user_id: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    created_at: string;
  }
  
  /**
   * Interface for transaction API responses with pagination
   */
  export interface PaginatedTransactionsResponse {
    transactions: GetTransactionResponse[];
    total: number;
    page: number;
    limit: number;
  }
  
  /**
   * Interface for transaction filtering options
   */
  export interface TransactionFilterOptions {
    userId?: string;
    status?: PaymentStatus;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    currency?: string;
    type?: TransactionType;
  }