// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

//types
type myPaymentsType = {
  startDate: string
  endDate: string
  price: string
  subscription: string
  payments: string
}
type Data = myPaymentsType[]

export default function payments(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json(myPaymentsDB)
  }
}

let myPaymentsDB = [
  {
    startDate: '2022-01-01',
    endDate: '2022-07-01',
    price: '50.00',
    subscription: '6 months',
    payments: 'paypal',
  },
  {
    startDate: '2022-02-01',
    endDate: '2023-01-01',
    price: '120.00',
    subscription: '12 months',
    payments: 'stripe',
  },
  {
    startDate: '2022-03-15',
    endDate: '2022-06-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'paypal',
  },
  {
    startDate: '2022-04-01',
    endDate: '2022-10-01',
    price: '80.00',
    subscription: '6 months',
    payments: 'stripe',
  },
  {
    startDate: '2022-05-01',
    endDate: '2023-04-01',
    price: '200.00',
    subscription: '12 months',
    payments: 'paypal',
  },
  {
    startDate: '2022-06-15',
    endDate: '2022-09-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'stripe',
  },
  {
    startDate: '2022-07-01',
    endDate: '2023-01-01',
    price: '100.00',
    subscription: '6 months',
    payments: 'paypal',
  },
  {
    startDate: '2022-08-01',
    endDate: '2023-07-01',
    price: '240.00',
    subscription: '12 months',
    payments: 'stripe',
  },
  {
    startDate: '2022-09-15',
    endDate: '2022-12-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'paypal',
  },
  {
    startDate: '2022-10-01',
    endDate: '2023-04-01',
    price: '120.00',
    subscription: '6 months',
    payments: 'stripe',
  },
  {
    startDate: '2022-11-01',
    endDate: '2023-10-01',
    price: '300.00',
    subscription: '12 months',
    payments: 'paypal',
  },
  {
    startDate: '2022-12-15',
    endDate: '2023-03-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'stripe',
  },
  {
    startDate: '2023-01-01',
    endDate: '2023-07-01',
    price: '150.00',
    subscription: '6 months',
    payments: 'paypal',
  },
  {
    startDate: '2023-02-01',
    endDate: '2024-01-01',
    price: '360.00',
    subscription: '12 months',
    payments: 'stripe',
  },
  {
    startDate: '2023-03-15',
    endDate: '2023-06-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'paypal',
  },
  {
    startDate: '2023-04-01',
    endDate: '2023-10-01',
    price: '200.00',
    subscription: '6 months',
    payments: 'stripe',
  },
  {
    startDate: '2023-05-01',
    endDate: '2024-04-01',
    price: '480.00',
    subscription: '12 months',
    payments: 'paypal',
  },
  {
    startDate: '2023-06-15',
    endDate: '2023-09-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'stripe',
  },
  {
    startDate: '2023-07-01',
    endDate: '2024-01-01',
    price: '220.00',
    subscription: '6 months',
    payments: 'paypal',
  },
  {
    startDate: '2023-08-01',
    endDate: '2024-07-01',
    price: '520.00',
    subscription: '12 months',
    payments: 'stripe',
  },
  {
    startDate: '2023-09-15',
    endDate: '2023-12-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'paypal',
  },
  {
    startDate: '2023-10-01',
    endDate: '2024-04-01',
    price: '240.00',
    subscription: '6 months',
    payments: 'stripe',
  },
  {
    startDate: '2023-11-01',
    endDate: '2024-10-01',
    price: '600.00',
    subscription: '12 months',
    payments: 'paypal',
  },
  {
    startDate: '2023-12-15',
    endDate: '2024-03-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'stripe',
  },
  {
    startDate: '2024-01-01',
    endDate: '2024-07-01',
    price: '300.00',
    subscription: '6 months',
    payments: 'paypal',
  },
  {
    startDate: '2024-02-01',
    endDate: '2025-01-01',
    price: '720.00',
    subscription: '12 months',
    payments: 'stripe',
  },
  {
    startDate: '2024-03-15',
    endDate: '2024-06-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'paypal',
  },
  {
    startDate: '2024-04-01',
    endDate: '2024-10-01',
    price: '280.00',
    subscription: '6 months',
    payments: 'stripe',
  },
  {
    startDate: '2024-05-01',
    endDate: '2025-04-01',
    price: '960.00',
    subscription: '12 months',
    payments: 'paypal',
  },
  {
    startDate: '2024-06-15',
    endDate: '2024-09-15',
    price: '30.00',
    subscription: '3 months',
    payments: 'stripe',
  },
  {
    startDate: '2024-07-01',
    endDate: '2025-01-01',
    price: '400.00',
    subscription: '6 months',
    payments: 'paypal',
  },
]
