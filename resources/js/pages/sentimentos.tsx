
import { type FormEvent, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

type SentimentoRegistrado = {
    id: number;
    sentimento: string;
    observacao: string | null;
    created_at: string;
};

type Props = {
    sentimentos: SentimentoRegistrado[];
};

export default function Sentimentos({ sentimentos }: Props) {
    const { currentTeam } = usePage<{
        currentTeam: { slug: string } | null;
    }>().props;

    const painelUrl = currentTeam
        ? `/${currentTeam.slug}/dashboard`
        : '/';

    const { data, setData, post, processing, errors, reset } = useForm({
        sentimento: 'Feliz',
        observacao: '',
    });

    const [mensagem, setMensagem] = useState('');

    function salvar(e: FormEvent) {
        e.preventDefault();

        setMensagem('');

        post('/sentimentos', {
            onSuccess: () => {
                reset();
                setMensagem('Sentimento registrado com sucesso!');
            },
        });
    }

    return (
        <>
            <Head title="Registrar sentimento - D.A.V.I." />

            <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800">
                <div className="mx-auto max-w-2xl">
                    <Link
                        href={painelUrl}
                        className="text-sm font-medium text-indigo-600 hover:underline"
                    >
                        ← Voltar ao painel inicial
                    </Link>

                    <header className="mb-8 mt-6">
                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            D.A.V.I. • Bem-estar
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            Como você está se sentindo?
                        </h1>

                        <p className="mt-3 text-slate-600">
                            Este é um espaço seguro para registrar suas emoções,
                            sem julgamentos.
                        </p>
                    </header>

                    <form
                        onSubmit={salvar}
                        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div>
                            <label className="mb-3 block font-semibold">
                                Como você está se sentindo hoje?
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { nome: 'Feliz', emoji: '😊' },
                                    { nome: 'Neutro', emoji: '😐' },
                                    { nome: 'Triste', emoji: '😔' },
                                    { nome: 'Ansioso', emoji: '😟' },
                                ].map((item) => (
                                    <button
                                        key={item.nome}
                                        type="button"
                                        onClick={() =>
                                            setData('sentimento', item.nome)
                                        }
                                        aria-pressed={
                                            data.sentimento === item.nome
                                        }
                                        className={`rounded-xl border p-4 text-left transition ${
                                            data.sentimento === item.nome
                                                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                                                : 'border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span className="text-2xl">
                                            {item.emoji}
                                        </span>

                                        <span className="mt-2 block font-medium">
                                            {item.nome}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {errors.sentimento && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.sentimento}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="observacao"
                                className="mb-2 block font-semibold"
                            >
                                Gostaria de compartilhar mais alguma coisa?
                                <span className="ml-1 font-normal text-slate-500">
                                    (opcional)
                                </span>
                            </label>

                            <textarea
                                id="observacao"
                                value={data.observacao}
                                onChange={(e) =>
                                    setData('observacao', e.target.value)
                                }
                                maxLength={1000}
                                rows={4}
                                placeholder="Conte como foi seu dia ou explique o que está sentindo..."
                                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            <p className="mt-1 text-right text-xs text-slate-400">
                                {data.observacao.length}/1000 caracteres
                            </p>

                            {errors.observacao && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.observacao}
                                </p>
                            )}
                        </div>

                        {mensagem && (
                            <p
                                role="status"
                                className="rounded-lg bg-green-50 p-3 text-green-700"
                            >
                                {mensagem}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {processing
                                ? 'Salvando registro...'
                                : 'Salvar sentimento'}
                        </button>
                    </form>

                    <section className="mt-10">
                        <h2 className="mb-4 text-xl font-bold">
                            Seus registros anteriores
                        </h2>

                        {sentimentos.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-slate-300 p-5 text-slate-500">
                                Você ainda não registrou nenhum sentimento.
                                Seus próximos registros aparecerão aqui.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {sentimentos.map((item) => (
                                    <article
                                        key={item.id}
                                        className="rounded-xl border border-slate-200 bg-white p-4"
                                    >
                                        <p className="font-semibold">
                                            {item.sentimento}
                                        </p>

                                        {item.observacao && (
                                            <p className="mt-1 whitespace-pre-wrap text-slate-600">
                                                {item.observacao}
                                            </p>
                                        )}

                                        <p className="mt-2 text-xs text-slate-400">
                                            Registrado em{' '}
                                            {new Date(
                                                item.created_at,
                                            ).toLocaleString('pt-BR')}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <footer className="py-8 text-center text-xs text-slate-500">
                        D.A.V.I. — Seu bem-estar importa.
                    </footer>
                </div>
            </main>
        </>
    );
}
