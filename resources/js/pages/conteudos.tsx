
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';

type Categoria = {
    id: number;
    nome: string;
};

type Conteudo = {
    id: number;
    titulo: string;
    resumo: string;
    tempo_leitura: number;
    categoria: Categoria;
    concluido: boolean | number;
};

type Progresso = {
    total: number;
    concluidos: number;
    porcentagem: number;
};

type Props = {
    conteudos: Conteudo[];
    categorias: Categoria[];
    filtros: {
        busca: string;
        categoria: string | number;
    };
    progresso: Progresso;
};

export default function Conteudos({
    conteudos,
    categorias,
    filtros,
    progresso,
}: Props) {
    const { currentTeam } = usePage<{
        currentTeam: { slug: string } | null;
    }>().props;

    const painelUrl = currentTeam
        ? `/${currentTeam.slug}/dashboard`
        : '/';

    const [busca, setBusca] = useState(filtros.busca ?? '');
    const [categoria, setCategoria] = useState(
        String(filtros.categoria ?? ''),
    );

    function pesquisar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        router.get(
            '/conteudos',
            {
                busca: busca || undefined,
                categoria: categoria || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function limparFiltros() {
        setBusca('');
        setCategoria('');

        router.get(
            '/conteudos',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    const porcentagem = Math.min(
        100,
        Math.max(0, progresso?.porcentagem ?? 0),
    );

    return (
        <>
            <Head title="Conteúdos de bem-estar" />

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
                            D.A.V.I. • Autocuidado
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Conteúdos de bem-estar
                        </h1>

                        <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                            Encontre informações e atividades para cuidar
                            das emoções, desenvolver hábitos saudáveis e
                            melhorar a convivência.
                        </p>
                    </header>

                    <section
                        aria-label="Seu progresso de leitura"
                        className="mt-8 rounded-2xl border border-emerald-400/20 bg-slate-900 p-6"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-emerald-300">
                                    Seu progresso de bem-estar
                                </p>

                                <h2 className="mt-2 text-2xl font-bold">
                                    {porcentagem}% concluído
                                </h2>

                                <p className="mt-2 text-sm text-slate-400">
                                    {progresso?.concluidos ?? 0} de{' '}
                                    {progresso?.total ?? 0}{' '}
                                    {(progresso?.total ?? 0) === 1
                                        ? 'conteúdo concluído'
                                        : 'conteúdos concluídos'}
                                </p>
                            </div>

                            <span
                                aria-hidden="true"
                                className="text-3xl text-emerald-300"
                            >
                                ♡
                            </span>
                        </div>

                        <div
                            className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700"
                            role="progressbar"
                            aria-label="Progresso dos conteúdos"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={porcentagem}
                        >
                            <div
                                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                                style={{ width: `${porcentagem}%` }}
                            />
                        </div>

                        <p className="mt-3 text-xs text-slate-500">
                            Continue explorando os conteúdos no seu ritmo.
                        </p>
                    </section>

                    <form
                        onSubmit={pesquisar}
                        className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:grid-cols-[1fr_250px_auto_auto]"
                    >
                        <input
                            type="search"
                            value={busca}
                            onChange={(event) => setBusca(event.target.value)}
                            placeholder="Pesquisar conteúdo..."
                            className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />

                        <select
                            value={categoria}
                            onChange={(event) =>
                                setCategoria(event.target.value)
                            }
                            className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                        >
                            <option value="">Todas as categorias</option>

                            {categorias.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                            Pesquisar
                        </button>

                        <button
                            type="button"
                            onClick={limparFiltros}
                            className="rounded-xl border border-white/10 px-5 py-3 text-slate-300 transition hover:bg-slate-800"
                        >
                            Limpar
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold">
                            Explore a biblioteca
                        </h2>

                        <span className="text-sm text-slate-400">
                            {conteudos.length}{' '}
                            {conteudos.length === 1
                                ? 'conteúdo'
                                : 'conteúdos'}
                        </span>
                    </div>

                    {conteudos.length > 0 ? (
                        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {conteudos.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex flex-col rounded-2xl border border-white/10 border-t-4 border-t-cyan-400 bg-slate-900 p-6 transition hover:-translate-y-1 hover:bg-slate-800"
                                >
                                    <span className="w-fit rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                                        {item.categoria?.nome ?? 'Bem-estar'}
                                    </span>

                                    <h3 className="mt-5 text-xl font-bold">
                                        {item.titulo}
                                    </h3>

                                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
                                        {item.resumo}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-400">
                                        <span>
                                            ◷ {item.tempo_leitura} min de
                                            leitura
                                        </span>

                                        {Boolean(item.concluido) && (
                                            <span className="font-semibold text-emerald-300">
                                                ✓ Concluído
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={`/conteudos/${item.id}`}
                                        className="mt-5 rounded-xl border border-cyan-400/40 px-4 py-3 text-center text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                                    >
                                        {Boolean(item.concluido)
                                            ? 'Ler novamente →'
                                            : 'Ler conteúdo →'}
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
                            <h3 className="text-lg font-bold">
                                Nenhum conteúdo encontrado
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Tente mudar a pesquisa ou selecionar outra
                                categoria.
                            </p>
                        </div>
                    )}

                    <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-slate-500">
                        D.A.V.I. — Informação, prevenção e bem-estar.
                    </footer>
                </div>
            </div>
        </>
    );
}
