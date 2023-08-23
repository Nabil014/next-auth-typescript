'use client'
import { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res?.error) return setError(res.error as string)

    if (res?.ok) return router.push('/dashboard/profile')

    console.log(res)
  }
  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-neutral-900 px-8 py-10 w-3/12 rounded-lg'
      >
        {error && (
          <div>
            <p className='bg-red-500 text-white p-2'>{error}</p>
          </div>
        )}

        <h1 className='text-4 xl font-bold mb-7'>SingIn</h1>

        <input
          type='email'
          placeholder='juanperez@gmail.com'
          name='email'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />
        <input
          type='password'
          placeholder='****'
          name='password'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />
        <button className='bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600 transition-colors mb-2'>
          Login
        </button>
      </form>
    </div>
  )
}
