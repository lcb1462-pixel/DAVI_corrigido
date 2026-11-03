
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="D.A.V.I. | Apoio e Bem-estar" />

            <div className="min-h-screen bg-slate-950 text-white">
                <header className="border-b border-white/10">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                        <a href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
                                D
                            </div>

                            <div>
                                <h1 className="text-xl font-bold tracking-wide">
                                    D.A.V.I.
                                </h1>
                                <p className="text-xs text-slate-400">
                                    Apoio e bem-estar
                                </p>
                            </div>
                        </a>

                        <a
                            href="/login"
                            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                        >
                            Entrar
                        </a>
                    </div>
                </header>

                <main>
                    <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
                        <div>
                            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                                Sua saúde emocional importa
                            </span>

                            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
                                Você não precisa enfrentar tudo
                                <span className="text-cyan-400">
                                    {' '}sozinho.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                                O D.A.V.I. é uma plataforma de apoio ao
                                bem-estar emocional, com conteúdos informativos,
                                registro de sentimentos e orientações para
                                encontrar caminhos de ajuda.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href="/login"
                                    className="rounded-xl bg-cyan-400 px-6 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
                                >
                                    Acessar a plataforma
                                </a>

                                <a
                                    href="#recursos"
                                    className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold transition hover:bg-white/10"
                                >
                                    Conhecer os recursos
                                </a>
                            </div>

                            <p className="mt-5 text-sm text-slate-400">
                                Um espaço de acolhimento, informação e prevenção.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl" />

                            <div className="relative rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl md:p-10">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-2xl">
                                        ♡
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold">
                                            Um passo de cada vez
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-400">
                                            Cuidar de si também é importante.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="rounded-2xl bg-slate-800/80 p-5">
                                        <p className="font-semibold text-cyan-300">
                                            Relato seguro
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Um caminho para comunicar situações
                                            como bullying, assédio e discriminação.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-slate-800/80 p-5">
                                        <p className="font-semibold text-cyan-300">
                                            Suporte inteligente
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Orientações informativas para ajudar
                                            a encontrar caminhos de apoio.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-slate-800/80 p-5">
                                        <p className="font-semibold text-cyan-300">
                                            Prevenção e bem-estar
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">
                                            Conteúdos sobre empatia, convivência
                                            e cuidado emocional.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="recursos"
                        className="border-t border-white/10 bg-slate-900/60 px-6 py-16"
                    >
                        <div className="mx-auto max-w-7xl">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl font-bold">
                                    Como o D.A.V.I. pode ajudar?
                                </h2>
                                <p className="mt-4 leading-7 text-slate-300">
                                    A proposta é oferecer recursos que incentivem
                                    o acolhimento, a prevenção e a busca por ajuda
                                    sempre que necessário.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-6 md:grid-cols-3">
                                <article className="rounded-2xl border border-white/10 bg-slate-950 p-6">
                                    <div className="text-3xl">💬</div>
                                    <h3 className="mt-4 text-lg font-bold">
                                        Expressar sentimentos
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        Registrar como você está se sentindo
                                        e acompanhar suas emoções ao longo do tempo.
                                    </p>
                                </article>

                                <article className="rounded-2xl border border-white/10 bg-slate-950 p-6">
                                    <div className="text-3xl">🛡️</div>
                                    <h3 className="mt-4 text-lg font-bold">
                                        Promover segurança
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        Incentivar o relato de situações difíceis
                                        e apresentar caminhos para buscar apoio.
                                    </p>
                                </article>

                                <article className="rounded-2xl border border-white/10 bg-slate-950 p-6">
                                    <div className="text-3xl">🌱</div>
                                    <h3 className="mt-4 text-lg font-bold">
                                        Incentivar a prevenção
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        Compartilhar informações sobre empatia,
                                        convivência e bem-estar emocional.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
                    <p>D.A.V.I. — Apoio, prevenção e bem-estar.</p>
                    <p className="mt-2">
                        Uma plataforma de apoio informativo que não substitui
                        o atendimento de profissionais especializados.
                    </p>
                </footer>
            </div>
        </>
    );
}
