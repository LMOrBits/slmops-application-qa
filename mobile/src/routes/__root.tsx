import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { useAuth } from '@/providers/auth'

interface RouterContext {
  auth: ReturnType<typeof useAuth>
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
})