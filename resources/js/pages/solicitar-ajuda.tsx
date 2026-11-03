
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { type FormEvent } from 'react';

type PedidoAjuda = {
    id: number;
    tipo: string;
    descricao: string;
    status: string;
    resposta: string | null;
    resposta_lida_at: string | null;
    created_at: string;
};

type Props = {
    pedidos: PedidoAjuda[];
    notificacoesNovas: number;
};

export default function SolicitarAjuda({
    pedidos,
    notificacoesNovas,
}: Props) {
    const { currentTeam } = usePage<{
        currentTeam: { slug: string } | null;
    }>().props;

    const painelUrl = currentTeam
        ? `/${currentTeam.slug}/dashboard`
        : '/';

    const { data, setData, post, processing, errors, reset } = useForm({
        tipo: 'Saúde emocional',
        descricao: '',
    });

    function enviarPedido(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        post('/solicitar-ajuda', {
            onSuccess: () => reset('descricao'),
        });
    }

    function visualizarRespostas() {
        router.post(
            '/solicitar-ajuda/marcar-respostas-lidas',
            {},
            {
                onSuccess: () => {
                    document
                        .getElementById('meus-pedidos')
                        ?.scrollIntoView({ behavior: 'smooth' });
                },
            },
        );
    }

    function corStatus(status: string) {
        switch (status) {
            case 'Resolvido':
                return 'bg-green-100 text-green-800';
            case 'Em análise':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    }

    function formatarData(data: string) {
        return new Date(data).toLocaleString('pt-BR');
    }

    return (
        <>
            <Head title="Solicitar ajuda - D.A.V.I." />

            <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-800">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-8">
                        <Link
                            href={painelUrl}
                            className="text-sm font-semibold text-blue-700 hover:underline"
                        >
                            ← Voltar ao painel inicial
                        </Link>

                        <h1 className="mt-4 text-3xl font-bold text-gray-900">
                            Solicitar ajuda
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Conte o que está acontecendo. Seu pedido será
                            encaminhado para análise com cuidado, respeito e
                            atenção.
                        </p>
                    </header>

                    {notificacoesNovas > 0 && (
                        <section
                            className="mb-8 rounded-xl border border-green-300 bg-green-50 p-6 shadow-sm"
                            aria-live="polite"
                        >
                            <h2 className="text-xl font-bold text-green-900">
                                🔔 Você tem{' '}
                                {notificacoesNovas === 1
                                    ? '1 nova resposta'
                                    : `${notificacoesNovas} novas respostas`}
                            </h2>

                            <p className="mt-2 text-green-800">
                                O responsável respondeu ao seu pedido de
                                ajuda. Clique no botão abaixo para consultar
                                suas respostas.
                            </p>

                            <button
                                type="button"
                                onClick={visualizarRespostas}
                                className="mt-5 rounded-lg bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                            >
                                Consultar minhas respostas ↓
                            </button>
                        </section>
                    )}

                    <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-bold">
                            Enviar pedido de ajuda
                        </h2>

                        <form onSubmit={enviarPedido} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="tipo"
                                    className="mb-2 block font-semibold"
                                >
                                    Qual é o tipo de pedido?
                                </label>

                                <select
                                    id="tipo"
                                    value={data.tipo}
                                    onChange={(event) =>
                                        setData('tipo', event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white p-3 focus:border-blue-500 focus:outline-none"
                                    required
                                >
                                    <option value="Saúde emocional">
                                        Saúde emocional
                                    </option>
                                    <option value="Bullying">Bullying</option>
                                    <option value="Assédio">Assédio</option>
                                    <option value="Discriminação">
                                        Discriminação
                                    </option>
                                    <option value="Outro">Outro</option>
                                </select>

                                {errors.tipo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.tipo}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="descricao"
                                    className="mb-2 block font-semibold"
                                >
                                    Conte o que está acontecendo
                                </label>

                                <textarea
                                    id="descricao"
                                    value={data.descricao}
                                    onChange={(event) =>
                                        setData(
                                            'descricao',
                                            event.target.value,
                                        )
                                    }
                                    rows={5}
                                    minLength={10}
                                    maxLength={2000}
                                    placeholder="Descreva a situação e explique como podemos ajudar..."
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                                    required
                                />

                                <p className="mt-1 text-right text-xs text-gray-500">
                                    {data.descricao.length}/2000 caracteres
                                </p>

                                {errors.descricao && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.descricao}
                                    </p>
                                )}

                                <p className="mt-1 text-sm text-gray-500">
                                    Escreva pelo menos 10 caracteres e no
                                    máximo 2000.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? 'Enviando pedido...'
                                    : 'Enviar pedido de ajuda'}
                            </button>
                        </form>
                    </section>

                    <section id="meus-pedidos" className="scroll-mt-6">
                        <h2 className="mb-5 text-2xl font-bold">
                            Meus pedidos e respostas
                        </h2>

                        {pedidos.length === 0 ? (
                            <div className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">
                                Você ainda não enviou nenhum pedido de ajuda.
                                Quando enviar, poderá acompanhar o andamento
                                nesta seção.
                            </div>
                        ) : (
                            <div className="space-y-5">
                                {pedidos.map((pedido) => {
                                    const temResposta = Boolean(
                                        pedido.resposta?.trim(),
                                    );

                                    const respostaNova =
                                        temResposta && !pedido.resposta_lida_at;

                                    return (
                                        <article
                                            key={pedido.id}
                                            className={`rounded-xl border bg-white p-6 shadow-sm ${
                                                respostaNova
                                                    ? 'border-green-400 ring-1 ring-green-200'
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <h3 className="text-lg font-bold">
                                                        {pedido.tipo}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Pedido nº {pedido.id}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${corStatus(pedido.status)}`}
                                                >
                                                    {pedido.status}
                                                </span>
                                            </div>

                                            <p className="mt-4 whitespace-pre-wrap text-gray-700">
                                                {pedido.descricao}
                                            </p>

                                            <p className="mt-3 text-sm text-gray-500">
                                                Enviado em:{' '}
                                                {formatarData(
                                                    pedido.created_at,
                                                )}
                                            </p>

                                            {temResposta && (
                                                <div
                                                    className={`mt-5 rounded-lg border p-4 ${
                                                        respostaNova
                                                            ? 'border-green-300 bg-green-50'
                                                            : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                >
                                                    <h4
                                                        className={`font-bold ${
                                                            respostaNova
                                                                ? 'text-green-900'
                                                                : 'text-gray-800'
                                                        }`}
                                                    >
                                                        {respostaNova
                                                            ? '🔔 Nova resposta do responsável'
                                                            : 'Resposta do responsável'}
                                                    </h4>

                                                    <p className="mt-2 whitespace-pre-wrap text-gray-700">
                                                        {pedido.resposta}
                                                    </p>

                                                    {respostaNova && (
                                                        <p className="mt-3 text-sm font-medium text-green-800">
                                                            Esta resposta ainda
                                                            não foi marcada como
                                                            visualizada.
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {!temResposta && (
                                                <p className="mt-5 text-sm text-gray-500">
                                                    Seu pedido está aguardando
                                                    uma resposta do responsável.
                                                </p>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    <footer className="py-8 text-center text-xs text-gray-500">
                        D.A.V.I. — Seu bem-estar importa.
                    </footer>
                </div>
            </main>
        </>
    );
}
