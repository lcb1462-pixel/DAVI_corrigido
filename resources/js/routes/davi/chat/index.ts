import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/davi-chat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DaviChatController::index
 * @see app/Http/Controllers/DaviChatController.php:15
 * @route '/davi-chat'
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
* @see \App\Http\Controllers\DaviChatController::criar
 * @see app/Http/Controllers/DaviChatController.php:56
 * @route '/davi-chat'
 */
export const criar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: criar.url(options),
    method: 'post',
})

criar.definition = {
    methods: ["post"],
    url: '/davi-chat',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DaviChatController::criar
 * @see app/Http/Controllers/DaviChatController.php:56
 * @route '/davi-chat'
 */
criar.url = (options?: RouteQueryOptions) => {
    return criar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaviChatController::criar
 * @see app/Http/Controllers/DaviChatController.php:56
 * @route '/davi-chat'
 */
criar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: criar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DaviChatController::criar
 * @see app/Http/Controllers/DaviChatController.php:56
 * @route '/davi-chat'
 */
    const criarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: criar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DaviChatController::criar
 * @see app/Http/Controllers/DaviChatController.php:56
 * @route '/davi-chat'
 */
        criarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: criar.url(options),
            method: 'post',
        })
    
    criar.form = criarForm
/**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
export const show = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/davi-chat/{conversa}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
show.url = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversa: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { conversa: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    conversa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversa: typeof args.conversa === 'object'
                ? args.conversa.id
                : args.conversa,
                }

    return show.definition.url
            .replace('{conversa}', parsedArgs.conversa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
show.get = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
show.head = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
    const showForm = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
        showForm.get = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DaviChatController::show
 * @see app/Http/Controllers/DaviChatController.php:30
 * @route '/davi-chat/{conversa}'
 */
        showForm.head = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DaviChatController::excluir
 * @see app/Http/Controllers/DaviChatController.php:125
 * @route '/davi-chat/{conversa}'
 */
export const excluir = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: excluir.url(args, options),
    method: 'delete',
})

excluir.definition = {
    methods: ["delete"],
    url: '/davi-chat/{conversa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DaviChatController::excluir
 * @see app/Http/Controllers/DaviChatController.php:125
 * @route '/davi-chat/{conversa}'
 */
excluir.url = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversa: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { conversa: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    conversa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversa: typeof args.conversa === 'object'
                ? args.conversa.id
                : args.conversa,
                }

    return excluir.definition.url
            .replace('{conversa}', parsedArgs.conversa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaviChatController::excluir
 * @see app/Http/Controllers/DaviChatController.php:125
 * @route '/davi-chat/{conversa}'
 */
excluir.delete = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: excluir.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DaviChatController::excluir
 * @see app/Http/Controllers/DaviChatController.php:125
 * @route '/davi-chat/{conversa}'
 */
    const excluirForm = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: excluir.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DaviChatController::excluir
 * @see app/Http/Controllers/DaviChatController.php:125
 * @route '/davi-chat/{conversa}'
 */
        excluirForm.delete = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: excluir.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    excluir.form = excluirForm
/**
* @see \App\Http\Controllers\DaviChatController::enviar
 * @see app/Http/Controllers/DaviChatController.php:69
 * @route '/davi-chat/{conversa}/mensagens'
 */
export const enviar = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviar.url(args, options),
    method: 'post',
})

enviar.definition = {
    methods: ["post"],
    url: '/davi-chat/{conversa}/mensagens',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DaviChatController::enviar
 * @see app/Http/Controllers/DaviChatController.php:69
 * @route '/davi-chat/{conversa}/mensagens'
 */
enviar.url = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { conversa: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { conversa: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    conversa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        conversa: typeof args.conversa === 'object'
                ? args.conversa.id
                : args.conversa,
                }

    return enviar.definition.url
            .replace('{conversa}', parsedArgs.conversa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DaviChatController::enviar
 * @see app/Http/Controllers/DaviChatController.php:69
 * @route '/davi-chat/{conversa}/mensagens'
 */
enviar.post = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enviar.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DaviChatController::enviar
 * @see app/Http/Controllers/DaviChatController.php:69
 * @route '/davi-chat/{conversa}/mensagens'
 */
    const enviarForm = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: enviar.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DaviChatController::enviar
 * @see app/Http/Controllers/DaviChatController.php:69
 * @route '/davi-chat/{conversa}/mensagens'
 */
        enviarForm.post = (args: { conversa: number | { id: number } } | [conversa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: enviar.url(args, options),
            method: 'post',
        })
    
    enviar.form = enviarForm
const chat = {
    index: Object.assign(index, index),
criar: Object.assign(criar, criar),
show: Object.assign(show, show),
excluir: Object.assign(excluir, excluir),
enviar: Object.assign(enviar, enviar),
}

export default chat