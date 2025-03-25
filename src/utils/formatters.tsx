// utils/formatters.ts

/**
 * Format a number as currency
 * @param amount Number to format
 * @param locale Locale to use for formatting (defaults to en-US for English)
 * @param currency Currency code (defaults to USD for US Dollar)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  locale = "en-US",
  currency = "USD"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string in a human-readable format
 * @param dateString ISO date string
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => {
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function truncateString(str: string, length: number = 20): string {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
}

export function getTransactionTypeIcon(type: string) {
  return type.toLowerCase() === 'payment' ? 'arrow-up-right' : 'arrow-down-left';
}

export function getTransactionTypeColor(type: string) {
  return type.toLowerCase() === 'payment' ? 'text-red-500' : 'text-green-500';
}