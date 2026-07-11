import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useState } from 'react'

// 1. Import the automatically generated route tree
import { routeTree } from './routeTree.gen'
import Header from './components/header/header'
import Footer from './components/footer/footer'

// 2. Create the router instance
const router = createRouter({ routeTree })

// 3. Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// 4. Render the RouterProvider
export default function App() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Smooch+Sans:wght@100..900&display=swap" rel="stylesheet"></link>
      <Header />
      <RouterProvider router={router}/>
      <Footer />
    </QueryClientProvider>
  )
}
