/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BillingCycle, CURRENCIES } from './types';

/**
 * Normalizes a date to start of local day (00:00:00)
 */
export function startOfLocalDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * Calculates the next billing date starting from `firstBillingDate`
 * that is greater than or equal to today (or the current local time).
 */
export function getNextBillingDate(firstBillingDateStr: string, cycle: BillingCycle, customCycleDays?: number): Date {
  const firstDate = new Date(firstBillingDateStr + 'T00:00:00');
  const today = startOfLocalDay(new Date());

  // If first billing date is in the future, that is the next billing date!
  if (firstDate >= today) {
    return firstDate;
  }

  let nextDate = new Date(firstDate);

  // Safely iterate to prevent infinite loop
  let iterations = 0;
  const maxIterations = 5000;

  while (nextDate < today && iterations < maxIterations) {
    iterations++;
    if (cycle === 'weekly') {
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (cycle === 'monthly') {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else if (cycle === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else if (cycle === 'custom' && customCycleDays) {
      nextDate.setDate(nextDate.getDate() + customCycleDays);
    } else {
      // Fallback
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    }
  }

  return nextDate;
}

/**
 * Calculates countdown remaining days, hours, minutes, and total MS
 */
export function getRemainingTime(nextBillingDate: Date): { 
  days: number; 
  hours: number; 
  minutes: number; 
  seconds: number;
  totalMs: number; 
  isToday: boolean;
} {
  const now = new Date();
  const diffMs = nextBillingDate.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    // It's today!
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isToday: true };
  }

  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diffMs,
    isToday: days === 0 && hours === 0 && minutes === 0,
  };
}

/**
 * Converts a currency amount to CNY equivalent
 */
export function convertToCNY(price: number, currency: string): number {
  const config = CURRENCIES[currency] || CURRENCIES.CNY;
  return price * config.rateToCNY;
}

/**
 * Gets the equivalent monthly price of a subscription in its original currency
 */
export function getMonthlyEquivalent(price: number, cycle: BillingCycle, customCycleDays?: number): number {
  switch (cycle) {
    case 'weekly':
      return (price / 7) * 30.4375; // average days in a month
    case 'yearly':
      return price / 12;
    case 'custom':
      if (customCycleDays && customCycleDays > 0) {
        return (price / customCycleDays) * 30.4375;
      }
      return price;
    case 'monthly':
    default:
      return price;
  }
}

/**
 * Formats currency beautifully
 */
export function formatPrice(price: number, currencyCode: string): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.CNY;
  return `${config.symbol}${price.toFixed(2)}`;
}

/**
 * Formats a date to local YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Calculates progress percentage of current cycle
 */
export function getCycleProgress(firstBillingDateStr: string, nextBillingDate: Date, cycle: BillingCycle, customCycleDays?: number): number {
  const firstDate = new Date(firstBillingDateStr + 'T00:00:00');
  const nextDate = new Date(nextBillingDate);
  const now = new Date();

  // Determine previous billing date
  let prevDate = new Date(nextDate);
  if (cycle === 'weekly') {
    prevDate.setDate(prevDate.getDate() - 7);
  } else if (cycle === 'monthly') {
    prevDate.setMonth(prevDate.getMonth() - 1);
  } else if (cycle === 'yearly') {
    prevDate.setFullYear(prevDate.getFullYear() - 1);
  } else if (cycle === 'custom' && customCycleDays) {
    prevDate.setDate(prevDate.getDate() - customCycleDays);
  } else {
    prevDate.setMonth(prevDate.getMonth() - 1);
  }

  // If now is before the calculated first billing date
  if (now < firstDate) return 0;

  const totalCycleTime = nextDate.getTime() - prevDate.getTime();
  const elapsedCycleTime = now.getTime() - prevDate.getTime();

  if (totalCycleTime <= 0) return 0;
  
  const percentage = (elapsedCycleTime / totalCycleTime) * 100;
  return Math.min(Math.max(percentage, 0), 100);
}
