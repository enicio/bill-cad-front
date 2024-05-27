import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { toast } from 'sonner'

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
})

export function RegistryBills() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const fileRef = form.register('file')

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      api
        .postForm('register-bill', data)
        .catch((error) => {
          console.log('Erro in json', error.response)
          if (error.response.status === 409) {
            console.log('Conta já cadastrada')
            toast('Conta já cadastrada.')
          }
        })
        .then((response) => {
          console.log(response)
          if (response?.status === 201) {
            console.log('Conta cadastrada com sucesso')
            toast('Conta cadastrada com sucesso.')
          }
        })
    } catch (error) {
      console.error('On error', error)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
          <FormField
            control={form.control}
            name="file"
            render={() => {
              return (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="shadcn" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button type="submit">Cadastrar conta</Button>
        </form>
      </Form>
    </div>
  )
}
