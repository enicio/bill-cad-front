import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { useState } from 'react'

interface Billing {
  id: number
  fileName: string
}

export function DownloadBills() {
  const [billing, setBillings] = useState([])
  const [clientNumber, setClientNumber] = useState('')

  const handleSearch = async () => {
    console.log('Pesquisando contas')
    const response = await api.get(`/billing/${clientNumber}`)
    console.log('Pesquisando contas 2', response)
    setBillings(response.data)
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
            <span className="px-5">{bill.fileName}</span>
            <a
              href={`http://localhost:3333/assets/${bill.fileName}`}
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
