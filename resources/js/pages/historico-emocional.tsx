
import { Head, Link, usePage } from '@inertiajs/react';

type SentimentoRegistrado = {
    id: number;
    sentimento: string;
    observacao: string | null;
    created_at: string;
};

type Props = {
    sentimentos: SentimentoRegistrado[];
};

const emojis: Record<string, string> = {
    Feliz: '😊',
    Neutro: '😐',
    Triste: '😔',
    Ansioso: '😟',
};

export default function HistoricoEmocional({ sentimentos }: Props) {
    const { currentTeam } = usePage<{
        currentTeam: { slug: string } | null;
    }>().props;

    const painelUrl = currentTeam
        ? `/${currentTeam.slug}/dashboard`
        : '/';

    return (
        <>
            <Head title="Histórico emocional - D.A.V.I." />

            <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href={painelUrl}
                        className="text-sm font-medium text-cyan-300 hover:underline"
                    >
                        ← Voltar ao painel inicial
                    </Link>

                    <header className="mb-8 mt-6">
                        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                            D.A.V.I. • Bem-estar
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Histórico emocional
                        </h1>

                        <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                            Consulte os sentimentos que você registrou e
                            reflita sobre como tem se sentido ao longo do tempo.
                        </p>
                    </header>

                    <section className="mb-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-cyan-400/20 bg-slate-900 p-5">
                            <p className="text-sm text-slate-400">
                                Total de registros
                            </p>

                            <p className="mt-2 text-3xl font-bold text-cyan-300">
                                {sentimentos.length}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-violet-400/20 bg-slate-900 p-5">
                            <p className="text-sm text-slate-400">
                                Sentimento mais recente
                            </p>

                            <p className="mt-2 text-xl font-bold">
                                {sentimentos.length > 0
                                    ? `${emojis[sentimentos[0].sentimento] ?? '💭'} ${sentimentos[0].sentimento}`
                                    : 'Nenhum registro ainda'}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-4 text-xl font-bold">
                            Seus registros
                        </h2>

                        {sentimentos.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center">
                                <span className="text-4xl">♡</span>

                                <h3 className="mt-4 text-lg font-semibold">
                                    Seu histórico está vazio
                                </h3>

                                <p className="mt-2 text-slate-400">
                                    Quando você registrar um sentimento, ele
                                    aparecerá aqui.
                                </p>

                                <Link
                                    href="/sentimentos"
                                    className="mt-5 inline-flex rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-200"
                                >
                                    Registrar sentimento
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sentimentos.map((item) => (
                                    <article
                                        key={item.id}
                                        className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">
                                                    {emojis[item.sentimento] ?? '💭'}
                                                </span>

                                                <div>
                                                    <h3 className="font-bold">
                                                        {item.sentimento}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-400">
                                                        {new Date(
                                                            item.created_at,
                                                        ).toLocaleString('pt-BR')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {item.observacao && (
                                            <div className="mt-4 rounded-xl bg-slate-950/70 p-4">
                                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Observação
                                                </p>

                                                <p className="whitespace-pre-wrap leading-6 text-slate-300">
                                                    {item.observacao}
                                                </p>
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="mt-8">
                        <Link
                            href="/sentimentos"
                            className="inline-flex rounded-xl border border-cyan-300/40 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-300/10"
                        >
                            + Registrar novo sentimento
                        </Link>
                    </div>

                    <footer className="py-8 text-center text-xs text-slate-500">
                        D.A.V.I. — Seu bem-estar importa.
                    </footer>
                </div>
            </main>
        </>
    );
}
