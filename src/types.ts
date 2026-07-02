/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BillingCycle = 'weekly' | 'monthly' | 'yearly' | 'custom';

export type Category = 
  | 'Entertainment' 
  | 'Productivity' 
  | 'Utilities' 
  | 'Health' 
  | 'Cloud' 
  | 'Finance' 
  | 'Other';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  rateToCNY: number; // For aggregate statistics conversion
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  CNY: { code: 'CNY', symbol: '¥', name: '人民币', rateToCNY: 1.0 },
  USD: { code: 'USD', symbol: '$', name: '美元', rateToCNY: 7.25 },
  EUR: { code: 'EUR', symbol: '€', name: '欧元', rateToCNY: 7.80 },
  HKD: { code: 'HKD', symbol: 'HK$', name: '港币', rateToCNY: 0.93 },
  JPY: { code: 'JPY', symbol: '円', name: '日元', rateToCNY: 0.045 },
  GBP: { code: 'GBP', symbol: '£', name: '英镑', rateToCNY: 9.15 },
};

export type PaymentMethod =
  | 'Alipay'
  | 'WeChat Pay'
  | 'Credit Card'
  | 'Apple Pay'
  | 'PayPal'
  | 'Google Pay'
  | 'Other';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string; // e.g. 'CNY', 'USD'
  cycle: BillingCycle;
  customCycleDays?: number; // if cycle is 'custom'
  firstBillingDate: string; // YYYY-MM-DD
  category: Category;
  paymentMethod: PaymentMethod;
  autoRenew: boolean;
  reminderDaysBefore: number; // e.g. 1, 3, 5
  notes?: string;
  color: string; // Tailwind bg color or custom HEX
  emoji: string; // Icon emoji, e.g. 🍿, 🎵
  isActive: boolean;
}

export interface SubscriptionPreset {
  name: string;
  defaultPrice: number;
  currency: string;
  cycle: BillingCycle;
  category: Category;
  paymentMethod: PaymentMethod;
  color: string;
  emoji: string;
}

export interface SpendingStats {
  monthlyTotalCNY: number;
  yearlyTotalCNY: number;
  activeCount: number;
  upcomingCount: number; // Renewing in next 7 days
}
