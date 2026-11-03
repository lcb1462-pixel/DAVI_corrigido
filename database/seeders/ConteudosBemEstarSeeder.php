<?php

namespace Database\Seeders;

use App\Models\AtividadeConteudo;
use App\Models\CategoriaConteudo;
use App\Models\ConteudoBemEstar;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConteudosBemEstarSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            $categorias = [
                [
                    'nome' => 'Respiração e relaxamento',
                    'descricao' => 'Práticas simples para relaxar e lidar com momentos de tensão.',
                ],
                [
                    'nome' => 'Autoconhecimento e emoções',
                    'descricao' => 'Aprenda a reconhecer sentimentos e compreender suas emoções.',
                ],
                [
                    'nome' => 'Relacionamentos e convivência',
                    'descricao' => 'Conteúdos sobre empatia, respeito e comunicação.',
                ],
                [
                    'nome' => 'Hábitos saudáveis',
                    'descricao' => 'Pequenas atitudes para cuidar do bem-estar no dia a dia.',
                ],
                [
                    'nome' => 'Segurança e prevenção',
                    'descricao' => 'Orientações sobre segurança, bullying e busca de apoio.',
                ],
            ];

            foreach ($categorias as $dados) {
                CategoriaConteudo::firstOrCreate(
                    ['nome' => $dados['nome']],
                    ['descricao' => $dados['descricao']]
                );
            }

            $conteudos = [
                [
                    'categoria' => 'Respiração e relaxamento',
                    'titulo' => 'Respiração consciente para momentos de tensão',
                    'resumo' => 'Conheça uma técnica simples de respiração para fazer uma pausa e recuperar a atenção.',
                    'tempo_leitura' => 4,
                    'conteudo' => <<<'TEXTO'
Em momentos de tensão, pode ser difícil organizar os pensamentos. Fazer uma pequena pausa e prestar atenção à respiração pode ajudar você a desacelerar e perceber como está se sentindo.

COMO PRATICAR

1. Encontre uma posição confortável, sentado ou em pé.
2. Relaxe os ombros, se isso for confortável.
3. Inspire suavemente pelo nariz, sem forçar.
4. Solte o ar devagar, no seu ritmo.
5. Repita algumas vezes, mantendo a atenção no movimento da respiração.

Se sentir desconforto, tontura ou falta de ar, pare e respire normalmente.

LEMBRE-SE

Você não precisa eliminar todos os pensamentos nem se sentir bem imediatamente. O objetivo é reservar um momento para perceber seu corpo e suas emoções, sem cobranças.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Pausa de um minuto',
                            'instrucao' => 'Durante um minuto, observe sua respiração sem tentar controlá-la. Depois, perceba se alguma sensação ou pensamento chamou sua atenção.',
                            'tipo' => 'pratica',
                        ],
                        [
                            'titulo' => 'Percepção do momento',
                            'instrucao' => 'Complete mentalmente: "Neste momento, estou me sentindo..." e "Uma coisa que pode me ajudar agora é...".',
                            'tipo' => 'reflexao',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Respiração e relaxamento',
                    'titulo' => 'Como fazer uma pausa em um dia difícil',
                    'resumo' => 'Descubra pequenas formas de interromper a correria e cuidar de si durante o dia.',
                    'tempo_leitura' => 3,
                    'conteudo' => <<<'TEXTO'
Nem sempre é possível resolver todos os problemas imediatamente. Em dias difíceis, uma pausa curta pode ajudar você a identificar o que precisa de atenção primeiro.

EXPERIMENTE

Afaste-se por alguns instantes da atividade, se for possível. Beba água, alongue suavemente o corpo ou observe o ambiente ao seu redor.

Você também pode dividir uma tarefa grande em etapas menores. Em vez de pensar em tudo o que precisa fazer, escolha apenas o próximo passo possível.

RESPEITE SEUS LIMITES

Descansar não é fracassar. Se a dificuldade continuar ou estiver prejudicando sua rotina, conversar com alguém de confiança ou procurar apoio profissional pode ser importante.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Minha pausa possível',
                            'instrucao' => 'Escolha uma pausa de cinco minutos que seja possível na sua rotina. Pense em quando você poderá realizá-la hoje.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Autoconhecimento e emoções',
                    'titulo' => 'Aprendendo a reconhecer suas emoções',
                    'resumo' => 'Entenda por que reconhecer o que sente pode ajudar você a comunicar suas necessidades.',
                    'tempo_leitura' => 4,
                    'conteudo' => <<<'TEXTO'
Alegria, tristeza, medo, ansiedade, raiva e tranquilidade são exemplos de emoções que podem aparecer em diferentes situações.

Sentir uma emoção não significa que você fez algo errado. As emoções podem fornecer informações sobre como percebemos as experiências, mas não precisam determinar todas as nossas atitudes.

COMO RECONHECER O QUE VOCÊ SENTE

Pare por alguns instantes e pergunte a si mesmo:

- O que aconteceu antes de eu me sentir assim?
- O que estou percebendo no meu corpo?
- Que pensamento está passando pela minha cabeça?
- Do que preciso neste momento?

Não existe obrigação de encontrar uma resposta perfeita. Às vezes, identificar que algo está difícil já é um primeiro passo.

CADA PESSOA TEM SEU TEMPO

Evite comparar suas emoções com as de outras pessoas. Se um sentimento estiver muito intenso ou persistente, buscar apoio pode ajudar.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Dê um nome ao sentimento',
                            'instrucao' => 'Pense em como você está se sentindo agora. Escolha uma palavra que represente essa emoção e reflita sobre o que pode ter contribuído para ela.',
                            'tipo' => 'reflexao',
                        ],
                        [
                            'titulo' => 'O que eu preciso?',
                            'instrucao' => 'Reflita: preciso descansar, conversar, resolver alguma situação, ter um momento sozinho ou pedir ajuda?',
                            'tipo' => 'reflexao',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Autoconhecimento e emoções',
                    'titulo' => 'Como lidar com a ansiedade antes de uma prova',
                    'resumo' => 'Veja estratégias práticas para organizar os estudos e enfrentar o nervosismo antes de uma avaliação.',
                    'tempo_leitura' => 5,
                    'conteudo' => <<<'TEXTO'
Sentir nervosismo antes de uma prova é uma experiência comum. A preocupação pode aparecer quando queremos ter um bom resultado ou temos medo de errar.

ANTES DA PROVA

Organize o conteúdo em partes menores e prepare um plano de estudos realista. Fazer pequenas revisões com antecedência pode ser mais útil do que tentar aprender tudo de uma vez.

DURANTE O NERVOSISMO

Faça uma pausa breve, respire naturalmente e leia as instruções com atenção. Comece pelas questões que você consegue responder e retorne às mais difíceis depois, se o tempo permitir.

CUIDE DAS EXPECTATIVAS

Uma avaliação não define todo o seu valor ou sua capacidade. Erros também podem mostrar o que precisa ser estudado novamente.

Se a ansiedade for frequente, intensa ou atrapalhar muito sua vida, converse com alguém de confiança e considere buscar apoio profissional.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Plano de revisão',
                            'instrucao' => 'Anote três assuntos que precisa revisar. Escolha um deles para começar e defina um período de estudo com uma pausa.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Relacionamentos e convivência',
                    'titulo' => 'Empatia: ouvir antes de julgar',
                    'resumo' => 'Aprenda como ouvir com atenção e considerar diferentes perspectivas nas relações.',
                    'tempo_leitura' => 4,
                    'conteudo' => <<<'TEXTO'
Empatia é a capacidade de tentar compreender o que outra pessoa pode estar sentindo ou vivendo. Isso não significa concordar com tudo, mas ouvir e considerar outras perspectivas.

NA PRÁTICA

- Escute sem interromper imediatamente.
- Faça perguntas respeitosas para compreender melhor.
- Evite tirar conclusões antes de conhecer a situação.
- Reconheça que cada pessoa tem experiências diferentes.

RESPEITO TAMBÉM ENVOLVE LIMITES

Ser empático não significa aceitar agressões, humilhações ou comportamentos que fazem mal. É possível compreender que alguém esteja passando por dificuldades e, ao mesmo tempo, estabelecer limites.

Uma convivência saudável depende de respeito mútuo, diálogo e responsabilidade pelas próprias atitudes.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Praticando a escuta',
                            'instrucao' => 'Na próxima conversa, tente ouvir até o fim antes de responder. Depois, explique com suas palavras o que entendeu e pergunte se compreendeu corretamente.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Relacionamentos e convivência',
                    'titulo' => 'Como resolver conflitos com respeito',
                    'resumo' => 'Conheça atitudes que ajudam a conversar sobre desacordos sem recorrer a ofensas.',
                    'tempo_leitura' => 4,
                    'conteudo' => <<<'TEXTO'
Desentendimentos podem acontecer na escola, no trabalho, em casa ou entre amigos. A maneira como lidamos com eles pode diminuir ou aumentar o problema.

TENTE ESTES PASSOS

1. Escolha um momento adequado para conversar.
2. Descreva o que aconteceu sem recorrer a insultos.
3. Explique como a situação afetou você.
4. Escute o outro lado sem abrir mão de seus limites.
5. Procurem uma solução que seja segura e respeitosa.

O QUE EVITAR

Ameaças, humilhações e exposição de conversas privadas dificultam a resolução e podem causar novos danos.

Se houver violência, intimidação ou risco à segurança, não é necessário enfrentar a situação sozinho. Procure uma pessoa responsável ou um serviço de apoio adequado.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Uma conversa mais respeitosa',
                            'instrucao' => 'Imagine um desacordo cotidiano. Escreva uma frase que descreva o problema sem ofender ninguém e outra que proponha uma solução.',
                            'tipo' => 'reflexao',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Hábitos saudáveis',
                    'titulo' => 'Pequenos hábitos para cuidar de si',
                    'resumo' => 'Descubra atitudes realistas para incluir descanso, movimento e organização na rotina.',
                    'tempo_leitura' => 4,
                    'conteudo' => <<<'TEXTO'
Cuidar do bem-estar não exige mudar toda a rotina de uma vez. Pequenas atitudes, realizadas de maneira possível e consistente, podem ajudar a organizar o dia.

ALGUMAS IDEIAS

- Manter horários de descanso tão regulares quanto possível.
- Fazer pausas entre tarefas.
- Beber água ao longo do dia.
- Incluir movimento corporal adequado às suas condições.
- Reservar momentos para atividades agradáveis.
- Conversar com pessoas em quem você confia.

COMECE PEQUENO

Escolha uma atitude que combine com sua realidade. Evite transformar o autocuidado em mais uma cobrança.

As necessidades variam entre as pessoas. Se estiver enfrentando dificuldades persistentes com sono, disposição ou atividades diárias, considere conversar com um profissional de saúde.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Uma mudança possível',
                            'instrucao' => 'Escolha um hábito pequeno para experimentar nesta semana. Pense em como incluí-lo na rotina sem criar uma cobrança excessiva.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Hábitos saudáveis',
                    'titulo' => 'Organizando tarefas sem se sobrecarregar',
                    'resumo' => 'Aprenda a priorizar atividades e dividir tarefas grandes em etapas menores.',
                    'tempo_leitura' => 3,
                    'conteudo' => <<<'TEXTO'
Quando muitas tarefas se acumulam, pode parecer difícil saber por onde começar. Organizar as prioridades ajuda a transformar uma lista extensa em passos mais claros.

COMO COMEÇAR

1. Anote as tarefas que estão ocupando sua atenção.
2. Identifique o que é urgente e o que pode esperar.
3. Escolha uma tarefa pequena para iniciar.
4. Divida atividades grandes em etapas.
5. Reserve tempo para pausas e imprevistos.

NEM TUDO PRECISA SER FEITO AO MESMO TEMPO

Se uma tarefa não puder ser concluída hoje, avalie quando poderá retomá-la. Pedir orientação ou negociar prazos pode ser necessário em algumas situações.

Organização deve ajudar você, não servir como motivo para se culpar quando algo não sai como planejado.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Minha próxima etapa',
                            'instrucao' => 'Escolha uma tarefa que está pendente e escreva apenas o primeiro passo necessário para começar.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Segurança e prevenção',
                    'titulo' => 'Como reconhecer e enfrentar o bullying',
                    'resumo' => 'Entenda o que caracteriza o bullying e como buscar apoio diante de situações de intimidação.',
                    'tempo_leitura' => 5,
                    'conteudo' => <<<'TEXTO'
Bullying é uma forma de violência entre pessoas marcada por ações agressivas repetidas e por um desequilíbrio de poder. Pode incluir apelidos humilhantes, exclusão intencional, ameaças, agressões físicas ou exposição vexatória.

NÃO É CULPA DE QUEM SOFRE

A pessoa que passa por essa situação não é responsável pela violência que recebe. Pedir ajuda é uma atitude legítima.

O QUE FAZER

- Procure um adulto de confiança ou responsável pela instituição.
- Conte o que aconteceu, quando ocorreu e quem pode ajudar.
- Se for seguro, guarde registros relevantes de mensagens ou situações.
- Evite responder com violência ou enfrentar sozinho quem está intimidando você.

QUEM PRESENCIA TAMBÉM PODE AJUDAR

Não incentive a agressão nem compartilhe conteúdos humilhantes. Apoie a pessoa afetada e procure alguém responsável.

Se houver risco imediato, procure ajuda de emergência ou de um serviço de proteção adequado.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Identifique uma pessoa de confiança',
                            'instrucao' => 'Pense em uma pessoa adulta ou responsável com quem você poderia conversar se presenciasse ou sofresse uma situação de bullying.',
                            'tipo' => 'reflexao',
                        ],
                        [
                            'titulo' => 'Planeje como pedir ajuda',
                            'instrucao' => 'Pense em como descreveria uma situação preocupante a alguém de confiança, incluindo o que aconteceu e de que tipo de apoio precisa.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
                [
                    'categoria' => 'Segurança e prevenção',
                    'titulo' => 'Segurança e respeito no ambiente digital',
                    'resumo' => 'Saiba como proteger sua privacidade e agir diante de ofensas ou exposição na internet.',
                    'tempo_leitura' => 4,
                    'conteudo' => <<<'TEXTO'
O ambiente digital facilita a comunicação, mas também exige atenção à privacidade e ao respeito. Mensagens, imagens e informações podem ser compartilhadas rapidamente e alcançar pessoas além do público pretendido.

PROTEJA SUA PRIVACIDADE

- Use senhas fortes e diferentes para suas contas.
- Não compartilhe senhas ou códigos de verificação.
- Revise as configurações de privacidade.
- Pense antes de publicar informações pessoais ou imagens de outras pessoas.
- Peça consentimento antes de compartilhar conteúdo que identifique alguém.

SE OCORRER UMA AGRESSÃO DIGITAL

Evite participar de discussões que possam aumentar o risco. Quando for seguro, guarde registros relevantes, bloqueie ou denuncie a conta e procure apoio de alguém de confiança.

Não reenvie imagens íntimas, ameaças ou conteúdos usados para humilhar alguém. A exposição pode ampliar o dano.

Se houver ameaças ou risco à segurança, procure ajuda adequada.
TEXTO,
                    'atividades' => [
                        [
                            'titulo' => 'Revisão da privacidade',
                            'instrucao' => 'Escolha uma conta digital e confira se suas informações pessoais e publicações estão visíveis apenas para o público desejado.',
                            'tipo' => 'pratica',
                        ],
                    ],
                ],
            ];

            foreach ($conteudos as $dados) {
                $categoria = CategoriaConteudo::where(
                    'nome',
                    $dados['categoria']
                )->firstOrFail();

                $conteudo = ConteudoBemEstar::updateOrCreate(
                    ['titulo' => $dados['titulo']],
                    [
                        'categoria_conteudo_id' => $categoria->id,
                        'resumo' => $dados['resumo'],
                        'conteudo' => $dados['conteudo'],
                        'tempo_leitura' => $dados['tempo_leitura'],
                        'ativo' => true,
                    ]
                );

                foreach ($dados['atividades'] as $indice => $atividade) {
                    AtividadeConteudo::updateOrCreate(
                        [
                            'conteudo_bem_estar_id' => $conteudo->id,
                            'titulo' => $atividade['titulo'],
                        ],
                        [
                            'instrucao' => $atividade['instrucao'],
                            'tipo' => $atividade['tipo'],
                            'ordem' => $indice + 1,
                        ]
                    );
                }
            }
        });
    }
}
