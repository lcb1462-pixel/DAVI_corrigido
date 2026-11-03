import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/solicitar-ajuda',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PedidoAjudaController::index
 * @see app/Http/Controllers/PedidoAjudaController.php:12
 * @route '/solicitar-ajuda'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PedidoAjudaController::store
 * @see app/Http/Controllers/PedidoAjudaController.php:41
 * @route '/solicitar-ajuda'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/solicitar-ajuda',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PedidoAjudaController::store
 * @see app/Http/Controllers/PedidoAjudaController.php:41
 * @route '/solicitar-ajuda'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PedidoAjudaController::store
 * @see app/Http/Controllers/PedidoAjudaController.php:41
 * @route '/solicitar-ajuda'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PedidoAjudaController::store
 * @see app/Http/Controllers/PedidoAjudaController.php:41
 * @route '/solicitar-ajuda'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PedidoAjudaController::store
 * @see app/Http/Controllers/PedidoAjudaController.php:41
 * @route '/solicitar-ajuda'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PedidoAjudaController::marcarRespostasLidas
 * @see app/Http/Controllers/PedidoAjudaController.php:60
 * @route '/solicitar-ajuda/marcar-respostas-lidas'
 */
export const marcarRespostasLidas = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: marcarRespostasLidas.url(options),
    method: 'post',
})

marcarRespostasLidas.definition = {
    methods: ["post"],
    url: '/solicitar-ajuda/marcar-respostas-lidas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PedidoAjudaController::marcarRespostasLidas
 * @see app/Http/Controllers/PedidoAjudaController.php:60
 * @route '/solicitar-ajuda/marcar-respostas-lidas'
 */
marcarRespostasLidas.url = (options?: RouteQueryOptions) => {
    return marcarRespostasLidas.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PedidoAjudaController::marcarRespostasLidas
 * @see app/Http/Controllers/PedidoAjudaController.php:60
 * @route '/solicitar-ajuda/marcar-respostas-lidas'
 */
marcarRespostasLidas.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: marcarRespostasLidas.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PedidoAjudaController::marcarRespostasLidas
 * @see app/Http/Controllers/PedidoAjudaController.php:60
 * @route '/solicitar-ajuda/marcar-respostas-lidas'
 */
    const marcarRespostasLidasForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: marcarRespostasLidas.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PedidoAjudaController::marcarRespostasLidas
 * @see app/Http/Controllers/PedidoAjudaController.php:60
 * @route '/solicitar-ajuda/marcar-respostas-lidas'
 */
        marcarRespostasLidasForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: marcarRespostasLidas.url(options),
            method: 'post',
        })
    
    marcarRespostasLidas.form = marcarRespostasLidasForm
const PedidoAjudaController = { index, store, marcarRespostasLidas }

export default PedidoAjudaController