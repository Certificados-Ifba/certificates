import { NextPage } from 'next'

import { useIsAuthenticated } from '../providers/auth'
import withConditionalRedirect from './withConditionalRedirect'

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth<P>(
  WrappedComponent: NextPage<P>,
  location = '/'
): NextPage<P> {
  return withConditionalRedirect({
    WrappedComponent,
    location,
    clientCondition: function withoutAuthClientCondition() {
      return useIsAuthenticated()
    },
    serverCondition: function withoutAuthServerCondition(ctx) {
      return !!ctx.req?.cookies.session
    }
  })
}
