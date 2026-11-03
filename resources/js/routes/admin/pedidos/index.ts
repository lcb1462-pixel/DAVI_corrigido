import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PainelController::atualizar
 * @see app/Http/Controllers/Admin/PainelController.php:54
 * @route '/admin/pedidos/{pedido}'
 */
export const atualizar = (args: { pedido: number | { id: number } } | [pedido: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: atualizar.url(args, options),
    method: 'put',
})

atualizar.definition = {
    methods: ["put"],
    url: '/admin/pedidos/{pedido}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PainelController::atualizar
 * @see app/Http/Controllers/Admin/PainelController.php:54
 * @route '/admin/pedidos/{pedido}'
 */
atualizar.url = (args: { pedido: number | { id: number } } | [pedido: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pedido: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { pedido: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    pedido: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        pedido: typeof args.pedido === 'object'
                ? args.pedido.id
                : args.pedido,
                }

    return atualizar.definition.url
            .replace('{pedido}', parsedArgs.pedido.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PainelController::atualizar
 * @see app/Http/Controllers/Admin/PainelController.php:54
 * @route '/admin/pedidos/{pedido}'
 */
atualizar.put = (args: { pedido: number | { id: number } } | [pedido: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: atualizar.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\PainelController::atualizar
 * @see app/Http/Controllers/Admin/PainelController.php:54
 * @route '/admin/pedidos/{pedido}'
 */
    const atualizarForm = (args: { pedido: number | { id: number } } | [pedido: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: atualizar.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PainelController::atualizar
 * @see app/Http/Controllers/Admin/PainelController.php:54
 * @route '/admin/pedidos/{pedido}'
 */
        atualizarForm.put = (args: { pedido: number | { id: number } } | [pedido: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: atualizar.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    atualizar.form = atualizarForm
const pedidos = {
    atualizar: Object.assign(atualizar, atualizar),
}

export default pedidos