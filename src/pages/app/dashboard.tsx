import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import colors from 'tailwindcss/colors'

interface Billing {
  id: number
  clientNumber: string
  fileName: string
  electricEnergyKwh: string
  sceeEnergyKwh: string
  totalAmount: string
  monthYear: string
}

export function Dashboard() {
  const [billing, setBillings] = useState([])
  const [clientNumber, setClientNumber] = useState('')
  const [energyData, setEneregyData] = useState([])

  const handleSearch = async () => {
    console.log('Pesquisando contas')
    const response = await api.get(`/billing/${clientNumber}`)
    console.log('Pesquisando contas 2', response)
    const tempData = response.data.map((bill: Billing) => {
      return {
        date: bill.monthYear,
        total: bill.totalAmount,
      }
    })
    console.log('tempData', tempData)
    setBillings(response.data)
    setEneregyData(tempData)
  }
  return (
    <div>
      <h1>Download de contas</h1>

      <Input
        value={clientNumber}
        onChange={(e) => setClientNumber(e.target.value)}
        type="search"
        placeholder="Digite o número de cliente"
      />

      <Button onClick={() => handleSearch()}>Pesquisar</Button>

      <h2>Contas</h2>
      <ul>
        {billing?.map((bill: Billing) => (
          <li key={bill.id}>
            <span className="px-5">{bill.clientNumber}</span>
            <span className="px-5">
              {Number(bill.electricEnergyKwh) + Number(bill.sceeEnergyKwh)}
            </span>
          </li>
        ))}
      </ul>
      <Card className="col-span-6">
        <CardHeader className="flex-row items-center justify-between pb-8">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">
              Receita no período
            </CardTitle>
            <CardDescription>Receita diária no período</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={energyData} style={{ fontsize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={88}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Tooltip />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="total"
                stroke={colors.violet['500']}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
