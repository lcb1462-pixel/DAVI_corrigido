
import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Pedido = {
    id: number;
    tipo: string;
    descricao: string;
    status: string;
    resposta: string | null;
    created_at: string | null;
    usuario: string;
};

type Paginacao = {
    data: Pedido[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};

type Props = {
    pedidos: Paginacao;
    filtros: {
        status: string;
        tipo: string;
    };
    estatisticas: {
        total: number;
        pendentes: number;
        em_analise: number;
        resolvidos: number;
    };
};

const statusDisponiveis = ['Pendente', 'Em análise', 'Resolvido'];

const tiposDisponiveis = [
    'Saúde emocional',
    'Bullying',
    'Assédio',
    'Discriminação',
    'Outro',
];

export default function Painel({
    pedidos,
    filtros,
    estatisticas,
}: Props) {
    const [statusFiltro, setStatusFiltro] = useState(filtros.status);
    const [tipoFiltro, setTipoFiltro] = useState(filtros.tipo);
    const [edicoes, setEdicoes] = useState<
        Record<number, { status: string; resposta: string }>
    >({});

    function filtrar(event: FormEvent) {
        event.preventDefault();

        router.get(
            '/admin/painel',
            {
                status: statusFiltro,
                tipo: tipoFiltro,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function atualizarPedido(id: number) {
        const pedido = pedidos.data.find((item) => item.id === id);

        if (!pedido) return;

        const edicao = edicoes[id] ?? {
            status: pedido.status,
            resposta: pedido.resposta ?? '',
        };

        router.put(
            `/admin/pedidos/${id}`,
            {
                status: edicao.status,
                resposta: edicao.resposta,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setEdicoes((anterior) => {
                        const nova = { ...anterior };
                        delete nova[id];
                        return nova;
                    });
                },
            },
        );
    }

    function alterarEdicao(
        pedido: Pedido,
        campo: 'status' | 'resposta',
        valor: string,
    ) {
        setEdicoes((anterior) => {
            const atual = anterior[pedido.id] ?? {
                status: pedido.status,
                resposta: pedido.resposta ?? '',
            };

            return {
                ...anterior,
                [pedido.id]: {
                    ...atual,
                    [campo]: valor,
                },
            };
        });
    }

    return (
        <>
            <Head title="Painel administrativo - D.A.V.I." />

            <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 sm:px-6">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                            D.A.V.I. • Administração
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            Painel administrativo
                        </h1>

                        <p className="mt-2 text-slate-600">
                            Acompanhe os pedidos de ajuda e registre as
                            respostas dos responsáveis.
                        </p>

                        <a
                            href="/dashboard"
                            className="mt-4 inline-block text-sm font-medium text-indigo-700 hover:underline"
                        >
                            ← Voltar ao painel principal
                        </a>
                    </header>

                    <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                titulo: 'Total de pedidos',
                                valor: estatisticas.total,
                                cor: 'border-indigo-500',
                            },
                            {
                                titulo: 'Pendentes',
                                valor: estatisticas.pendentes,
                                cor: 'border-amber-500',
                            },
                            {
                                titulo: 'Em análise',
                                valor: estatisticas.em_analise,
                                cor: 'border-blue-500',
                            },
                            {
                                titulo: 'Resolvidos',
                                valor: estatisticas.resolvidos,
                                cor: 'border-emerald-500',
                            },
                        ].map((item) => (
                            <article
                                key={item.titulo}
                                className={`rounded-xl border-l-4 ${item.cor} bg-white p-5 shadow-sm`}
                            >
                                <p className="text-sm text-slate-500">
                                    {item.titulo}
                                </p>
                                <p className="mt-2 text-3xl font-bold">
                                    {item.valor}
                                </p>
                            </article>
                        ))}
                    </section>

                    <section className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                        <h2 className="text-lg font-bold">
                            Filtrar pedidos
                        </h2>

                        <form
                            onSubmit={filtrar}
                            className="mt-4 grid gap-4 sm:grid-cols-3"
                        >
                            <div>
                                <label
                                    htmlFor="filtro-status"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Status
                                </label>

                                <select
                                    id="filtro-status"
                                    value={statusFiltro}
                                    onChange={(event) =>
                                        setStatusFiltro(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                >
                                    <option value="">Todos os status</option>
                                    {statusDisponiveis.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="filtro-tipo"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Tipo de ajuda
                                </label>

                                <select
                                    id="filtro-tipo"
                                    value={tipoFiltro}
                                    onChange={(event) =>
                                        setTipoFiltro(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                >
                                    <option value="">Todos os tipos</option>
                                    {tiposDisponiveis.map((tipo) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                                >
                                    Filtrar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setStatusFiltro('');
                                        setTipoFiltro('');
                                        router.get('/admin/painel');
                                    }}
                                    className="rounded-lg border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
                                >
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="space-y-5">
                        <h2 className="text-xl font-bold">
                            Pedidos recebidos
                        </h2>

                        {pedidos.data.length === 0 ? (
                            <div className="rounded-xl bg-white p-8 text-center text-slate-600 shadow-sm">
                                Nenhum pedido encontrado com esses filtros.
                            </div>
                        ) : (
                            pedidos.data.map((pedido) => {
                                const edicao = edicoes[pedido.id] ?? {
                                    status: pedido.status,
                                    resposta: pedido.resposta ?? '',
                                };

                                return (
                                    <article
                                        key={pedido.id}
                                        className="rounded-xl bg-white p-5 shadow-sm"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold">
                                                    Pedido #{pedido.id} —{' '}
                                                    {pedido.tipo}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Solicitante: {pedido.usuario}
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    Data:{' '}
                                                    {pedido.created_at
                                                        ? new Date(
                                                              pedido.created_at,
                                                          ).toLocaleString(
                                                              'pt-BR',
                                                          )
                                                        : 'Não informada'}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
                                                {pedido.status}
                                            </span>
                                        </div>

                                        <div className="mt-4 rounded-lg bg-slate-50 p-4">
                                            <p className="mb-2 text-sm font-semibold">
                                                Descrição do pedido
                                            </p>

                                            <p className="whitespace-pre-wrap text-sm">
                                                {pedido.descricao}
                                            </p>
                                        </div>

                                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor={`status-${pedido.id}`}
                                                    className="mb-1 block text-sm font-medium"
                                                >
                                                    Atualizar status
                                                </label>

                                                <select
                                                    id={`status-${pedido.id}`}
                                                    value={edicao.status}
                                                    onChange={(event) =>
                                                        alterarEdicao(
                                                            pedido,
                                                            'status',
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                                >
                                                    {statusDisponiveis.map(
                                                        (status) => (
                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`resposta-${pedido.id}`}
                                                    className="mb-1 block text-sm font-medium"
                                                >
                                                    Resposta do responsável
                                                </label>

                                                <textarea
                                                    id={`resposta-${pedido.id}`}
                                                    value={edicao.resposta}
                                                    onChange={(event) =>
                                                        alterarEdicao(
                                                            pedido,
                                                            'resposta',
                                                            event.target.value,
                                                        )
                                                    }
                                                    rows={3}
                                                    maxLength={5000}
                                                    placeholder="Escreva uma orientação ou resposta..."
                                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                atualizarPedido(pedido.id)
                                            }
                                            className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                                        >
                                            Salvar alterações
                                        </button>
                                    </article>
                                );
                            })
                        )}
                    </section>

                    {pedidos.last_page > 1 && (
                        <nav
                            aria-label="Paginação dos pedidos"
                            className="mt-8 flex flex-wrap gap-2"
                        >
                            {pedidos.links.map((link, index) => (
                                <button
                                    key={`${index}-${link.label}`}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (link.url) router.get(link.url);
                                    }}
                                    className={`rounded-lg border px-3 py-2 text-sm ${
                                        link.active
                                            ? 'border-indigo-600 bg-indigo-600 text-white'
                                            : 'border-slate-300 bg-white'
                                    } disabled:cursor-not-allowed disabled:opacity-40`}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </main>
        </>
    );
}
