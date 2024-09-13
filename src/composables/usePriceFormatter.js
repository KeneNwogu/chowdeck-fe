export function usePriceFormatter() {
  const formatPrice = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount).replace("$", "₦").replace(".00", "")
  }

  return formatPrice
}