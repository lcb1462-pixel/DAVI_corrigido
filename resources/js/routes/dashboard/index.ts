import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:60
 * @route '/dashboard'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
const dashboard = {
    redirect: Object.assign(redirect, redirect),
}

export default dashboard