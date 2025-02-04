import { createLazyFileRoute } from '@tanstack/react-router'
import Landing from '../app/Landing'
export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    
      <div className="flex items-center justify-center min-h-screen">
          <Landing />
      </div>
  )
}