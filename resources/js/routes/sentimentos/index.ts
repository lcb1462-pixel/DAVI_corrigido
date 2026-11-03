import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sentimentos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SentimentoController::index
 * @see app/Http/Controllers/SentimentoController.php:12
 * @route '/sentimentos'
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
* @see \App\Http\Controllers\SentimentoController::store
 * @see app/Http/Controllers/SentimentoController.php:23
 * @route '/sentimentos'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sentimentos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SentimentoController::store
 * @see app/Http/Controllers/SentimentoController.php:23
 * @route '/sentimentos'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SentimentoController::store
 * @see app/Http/Controllers/SentimentoController.php:23
 * @route '/sentimentos'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SentimentoController::store
 * @see app/Http/Controllers/SentimentoController.php:23
 * @route '/sentimentos'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SentimentoController::store
 * @see app/Http/Controllers/SentimentoController.php:23
 * @route '/sentimentos'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const sentimentos = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default sentimentos