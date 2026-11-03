
import { Head, Link, router } from '@inertiajs/react';

type Categoria = {
    id: number;
    nome: string;
    descricao?: string | null;
};

type Atividade = {
    id: number;
    titulo: string;
    instrucao: string;
    tipo: string;
    ordem: number;
};

type Conteudo = {
    id: number;
    titulo: string;
    resumo: string;
    conteudo: string;
    tempo_leitura: number;
    categoria: Categoria;
    atividades: Atividade[];
};

type Props = {
    conteudo: Conteudo;
    concluido: boolean;
};

export default function ConteudoDetalhes({
    conteudo,
    concluido,
}: Props) {
    function marcarComoConcluido() {
        router.post(`/conteudos/${conteudo.id}/concluir`);
    }

    return (
        <>
            <Head title={conteudo.titulo} />

            <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
                <article className="mx-auto max-w-3xl">
                    <Link
                        href="/conteudos"
                        className="text-sm text-cyan-300 hover:text-cyan-200"
                    >
                        ← Voltar à biblioteca
                    </Link>

                    <header className="mt-8">
                        <span className="rounded-full bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300">
                            {conteudo.categoria?.nome ?? 'Bem-estar'}
                        </span>

                        <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                            {conteudo.titulo}
                        </h1>

                        <p className="mt-4 leading-7 text-slate-400">
                            {conteudo.resumo}
                        </p>

                        <p className="mt-4 text-sm text-slate-500">
                            ◷ {conteudo.tempo_leitura} min de leitura
                        </p>
                    </header>

                    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8">
                        <h2 className="text-xl font-bold">
                            Sobre este conteúdo
                        </h2>

                        <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-300">
                            {conteudo.conteudo}
                        </div>
                    </section>

                    {conteudo.atividades?.length > 0 && (
                        <section className="mt-8">
                            <h2 className="text-2xl font-bold">
                                Vamos praticar?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Reserve alguns minutos para experimentar
                                estas atividades.
                            </p>

                            <div className="mt-5 space-y-4">
                                {conteudo.atividades.map((atividade, index) => (
                                    <div
                                        key={atividade.id}
                                        className="rounded-2xl border border-white/10 bg-slate-900 p-6"
                                    >
                                        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                            Atividade {index + 1}
                                        </p>

                                        <h3 className="mt-3 text-lg font-bold">
                                            {atividade.titulo}
                                        </h3>

                                        <p className="mt-3 whitespace-pre-line leading-7 text-slate-300">
                                            {atividade.instrucao}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">
                        {concluido ? (
                            <>
                                <p className="font-semibold text-emerald-300">
                                    ✓ Você já concluiu este conteúdo.
                                </p>

                                <Link
                                    href="/conteudos"
                                    className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-200"
                                >
                                    Explorar outros conteúdos →
                                </Link>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold">
                                    Terminou a leitura?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Marque este conteúdo como concluído para
                                    acompanhar seu progresso pessoal.
                                </p>

                                <button
                                    type="button"
                                    onClick={marcarComoConcluido}
                                    className="mt-5 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                                >
                                    Marcar como concluído
                                </button>
                            </>
                        )}
                    </section>

                    <p className="mt-8 text-center text-xs leading-6 text-slate-500">
                        Os conteúdos do D.A.V.I. têm finalidade informativa
                        e não substituem acompanhamento profissional.
                    </p>
                </article>
            </div>
        </>
    );
}
