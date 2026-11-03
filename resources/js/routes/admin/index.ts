import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import pedidos from './pedidos'
/**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
export const painel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: painel.url(options),
    method: 'get',
})

painel.definition = {
    methods: ["get","head"],
    url: '/admin/painel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
painel.url = (options?: RouteQueryOptions) => {
    return painel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
painel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: painel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
painel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: painel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
    const painelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: painel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
        painelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: painel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PainelController::painel
 * @see app/Http/Controllers/Admin/PainelController.php:13
 * @route '/admin/painel'
 */
        painelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: painel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    painel.form = painelForm
const admin = {
    painel: Object.assign(painel, painel),
pedidos: Object.assign(pedidos, pedidos),
}

export default admin