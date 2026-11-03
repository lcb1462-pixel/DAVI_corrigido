
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

import type { FormEvent, ReactNode } from 'react';

type Conversa = {
    id: number;
    titulo: string;
    mensagens_count?: number;
};

type Mensagem = {
    id: number;
    remetente: string;
    mensagem: string;
    created_at?: string;
};

type Props = {
    conversas: Conversa[];
    conversa: Conversa | null;
    mensagens: Mensagem[];
};

// Formata negrito, itálico, código e quebras de linha.
function formatarMensagem(texto: string): ReactNode[] {
    const textoCorrigido = texto.replace(/\\([*_`])/g, '$1');

    const partes = textoCorrigido.split(
        /(\*\*[^\*]+?\*\*|\*[^\*\n]+?\*|`[^`]+`|\n)/g,
    );

    return partes.map((parte, indice) => {
        if (parte.startsWith('**') && parte.endsWith('**')) {
            return (
                <strong key={indice} className="font-bold text-white">
                    {parte.slice(2, -2)}
                </strong>
            );
        }

        if (
            parte.startsWith('*') &&
            parte.endsWith('*') &&
            !parte.startsWith('**')
        ) {
            return <em key={indice}>{parte.slice(1, -1)}</em>;
        }

        if (parte.startsWith('`') && parte.endsWith('`')) {
            return (
                <code
                    key={indice}
                    className="rounded bg-slate-800 px-1 py-0.5 text-cyan-200"
                >
                    {parte.slice(1, -1)}
                </code>
            );
        }

        if (parte === '\n') {
            return <br key={indice} />;
        }

        return parte;
    });
}

export default function DaviChat({
    conversas,
    conversa,
    mensagens,
}: Props) {
    const { currentTeam } = usePage<{
        currentTeam: { slug: string } | null;
    }>().props;

    const painelUrl = currentTeam
        ? `/${currentTeam.slug}/dashboard`
        : '/';

    const { data, setData, post, processing, errors, reset } = useForm({
        mensagem: '',
    });

    function criarConversa() {
        router.post('/davi-chat');
    }

    function enviarMensagem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!conversa || !data.mensagem.trim() || processing) {
            return;
        }

        post('/davi-chat/' + conversa.id + '/mensagens', {
            preserveScroll: true,
            onSuccess: () => reset('mensagem'),
        });
    }

    // Exclui uma conversa somente após confirmação.
    function excluirConversa(id: number, titulo: string) {
        const confirmar = window.confirm(
            `Deseja realmente excluir a conversa "${titulo}"? Essa ação não pode ser desfeita.`,
        );

        if (!confirmar) {
            return;
        }

        router.delete('/davi-chat/' + id, {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Chat D.A.V.I." />

            <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
                <div className="mx-auto max-w-6xl">
                    <Link
                        href={painelUrl}
                        className="text-sm text-cyan-300 hover:text-cyan-200"
                    >
                        ← Voltar ao painel inicial
                    </Link>

                    <header className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                            D.A.V.I. • Suporte inteligente
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Converse com o D.A.V.I.
                        </h1>

                        <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                            Um espaço para conversar sobre emoções, bem-estar
                            e convivência. Suas conversas ficam salvas na sua
                            conta.
                        </p>
                    </header>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
                        <aside className="rounded-2xl border border-white/10 bg-slate-900 p-5">
                            <button
                                type="button"
                                onClick={criarConversa}
                                className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
                            >
                                + Nova conversa
                            </button>

                            <h2 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                                Histórico
                            </h2>

                            <div className="mt-3 space-y-2">
                                {conversas.length > 0 ? (
                                    conversas.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-stretch gap-2"
                                        >
                                            <Link
                                                href={'/davi-chat/' + item.id}
                                                className={
                                                    'min-w-0 flex-1 rounded-xl border p-3 transition ' +
                                                    (conversa?.id === item.id
                                                        ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-200'
                                                        : 'border-white/5 text-slate-300 hover:bg-slate-800')
                                                }
                                            >
                                                <p className="truncate text-sm font-medium">
                                                    {item.titulo}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {item.mensagens_count ?? 0}{' '}
                                                    mensagens
                                                </p>
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    excluirConversa(
                                                        item.id,
                                                        item.titulo,
                                                    )
                                                }
                                                title="Excluir conversa"
                                                aria-label={
                                                    'Excluir conversa ' +
                                                    item.titulo
                                                }
                                                className="shrink-0 rounded-xl border border-red-400/20 px-3 text-red-300 transition hover:bg-red-400/10"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="py-4 text-sm leading-6 text-slate-500">
                                        Você ainda não tem conversas. Clique em
                                        Nova conversa para começar.
                                    </p>
                                )}
                            </div>
                        </aside>

                        <section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                            <div className="border-b border-white/10 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-xl text-cyan-300">
                                        ♡
                                    </div>

                                    <div>
                                        <h2 className="font-bold">
                                            Assistente D.A.V.I.
                                        </h2>

                                        <p className="text-xs text-emerald-300">
                                            Assistente de bem-estar
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 p-5">
                                {!conversa ? (
                                    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                                        <span className="text-4xl text-cyan-300">
                                            ♡
                                        </span>

                                        <h3 className="mt-4 text-xl font-bold">
                                            Como você está se sentindo?
                                        </h3>

                                        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                                            Inicie uma conversa para compartilhar
                                            o que está sentindo.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={criarConversa}
                                            className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
                                        >
                                            Começar conversa
                                        </button>
                                    </div>
                                ) : mensagens.length === 0 ? (
                                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-5">
                                        <p className="font-semibold text-cyan-300">
                                            Olá! Eu sou o D.A.V.I. ♡
                                        </p>

                                        <p className="mt-2 text-sm leading-7 text-slate-300">
                                            Estou aqui para conversar com você
                                            sobre bem-estar emocional. O que
                                            gostaria de compartilhar hoje?
                                        </p>
                                    </div>
                                ) : (
                                    mensagens.map((item) => (
                                        <div
                                            key={item.id}
                                            className={
                                                'flex ' +
                                                (item.remetente === 'usuario'
                                                    ? 'justify-end'
                                                    : 'justify-start')
                                            }
                                        >
                                            <div
                                                className={
                                                    'max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[80%] ' +
                                                    (item.remetente === 'usuario'
                                                        ? 'bg-cyan-500 text-slate-950'
                                                        : 'border border-white/10 bg-slate-950 text-slate-200')
                                                }
                                            >
                                                {formatarMensagem(item.mensagem)}
                                            </div>
                                        </div>
                                    ))
                                )}

                                {errors.mensagem && (
                                    <p className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">
                                        {errors.mensagem}
                                    </p>
                                )}
                            </div>

                            {conversa && (
                                <form
                                    onSubmit={enviarMensagem}
                                    className="border-t border-white/10 p-4"
                                >
                                    <div className="flex items-end gap-3">
                                        <textarea
                                            value={data.mensagem}
                                            onChange={(event) =>
                                                setData(
                                                    'mensagem',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Escreva sua mensagem..."
                                            rows={2}
                                            maxLength={4000}
                                            disabled={processing}
                                            className="min-h-[56px] flex-1 resize-y rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 disabled:opacity-50"
                                        />

                                        <button
                                            type="submit"
                                            disabled={
                                                processing ||
                                                !data.mensagem.trim()
                                            }
                                            className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Enviando...'
                                                : 'Enviar'}
                                        </button>
                                    </div>

                                    <p className="mt-3 text-xs text-slate-500">
                                        O D.A.V.I. oferece apoio informativo e
                                        não substitui profissionais de saúde.
                                    </p>
                                </form>
                            )}
                        </section>
                    </div>

                    <footer className="mt-10 border-t border-white/10 py-6 text-center text-xs text-slate-500">
                        D.A.V.I. — Informação, prevenção e bem-estar.
                    </footer>
                </div>
            </div>
        </>
    );
}
