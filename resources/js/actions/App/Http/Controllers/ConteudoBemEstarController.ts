import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/conteudos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ConteudoBemEstarController::index
 * @see app/Http/Controllers/ConteudoBemEstarController.php:14
 * @route '/conteudos'
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
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
export const show = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/conteudos/{conteudo}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
show.url = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conteudo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { conteudo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    conteudo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conteudo: typeof args.conteudo === 'object'
                ? args.conteudo.id
                : args.conteudo,
                }

    return show.definition.url
            .replace('{conteudo}', parsedArgs.conteudo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
show.get = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
show.head = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
    const showForm = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
        showForm.get = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ConteudoBemEstarController::show
 * @see app/Http/Controllers/ConteudoBemEstarController.php:100
 * @route '/conteudos/{conteudo}'
 */
        showForm.head = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ConteudoBemEstarController::concluir
 * @see app/Http/Controllers/ConteudoBemEstarController.php:123
 * @route '/conteudos/{conteudo}/concluir'
 */
export const concluir = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: concluir.url(args, options),
    method: 'post',
})

concluir.definition = {
    methods: ["post"],
    url: '/conteudos/{conteudo}/concluir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ConteudoBemEstarController::concluir
 * @see app/Http/Controllers/ConteudoBemEstarController.php:123
 * @route '/conteudos/{conteudo}/concluir'
 */
concluir.url = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conteudo: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { conteudo: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    conteudo: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conteudo: typeof args.conteudo === 'object'
                ? args.conteudo.id
                : args.conteudo,
                }

    return concluir.definition.url
            .replace('{conteudo}', parsedArgs.conteudo.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ConteudoBemEstarController::concluir
 * @see app/Http/Controllers/ConteudoBemEstarController.php:123
 * @route '/conteudos/{conteudo}/concluir'
 */
concluir.post = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: concluir.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ConteudoBemEstarController::concluir
 * @see app/Http/Controllers/ConteudoBemEstarController.php:123
 * @route '/conteudos/{conteudo}/concluir'
 */
    const concluirForm = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: concluir.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ConteudoBemEstarController::concluir
 * @see app/Http/Controllers/ConteudoBemEstarController.php:123
 * @route '/conteudos/{conteudo}/concluir'
 */
        concluirForm.post = (args: { conteudo: number | { id: number } } | [conteudo: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: concluir.url(args, options),
            method: 'post',
        })
    
    concluir.form = concluirForm
const ConteudoBemEstarController = { index, show, concluir }

export default ConteudoBemEstarController