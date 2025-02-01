import { db } from '@/db'

async function getData() {
  const customers = await db.query.customersTable.findMany()
  return customers
}

export default async function Page() {
  const customers = await getData()
  return (
    <>
      {customers.map((customer) => (
        <div key={customer.id}>
          <h2>{customer.firstName}</h2>
          <p>{customer.email}</p>
        </div>
      ))}
    </>
  )
}
