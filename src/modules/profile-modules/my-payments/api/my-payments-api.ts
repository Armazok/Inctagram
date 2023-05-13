export const getMyPayments = () => {
  return fetch('/api/payments')
  // return authInstance.get('subscriptions/my-payments')
}
//
// type myPaymentsType = {
//   userId: number
//   customerId: string
//   dateOfPayment: string
//   endDateOfSubscription: string
//   price: number
//   subscriptionType: string
//   paymentType: string
// }
