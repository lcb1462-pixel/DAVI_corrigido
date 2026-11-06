<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class GeminiService
{
    public function enviarMensagem(string $mensagem): string
    {
        $chave = config('services.gemini.key');
        $modelo = config('services.gemini.model', 'gemini-3.8-flash');

        if (!$chave) {
            throw new RuntimeException(
                'A chave do Gemini não foi configurada.'
            );
        }

        try {
            $resposta = Http::withOptions([
                'verify' => storage_path('certificados/cacert.pem'),
            ])
                ->withHeaders([
                    'x-goog-api-key' => $chave,
                    'Content-Type' => 'application/json',
                ])
                ->connectTimeout(15)
                ->timeout(90)
                ->retry(
                    [1000, 2000],
                    when: fn ($exception) =>
                        $exception instanceof ConnectionException
                )
                ->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/{$modelo}:generateContent",
                    [
                        'systemInstruction' => [
                            'parts' => [[
                                'text' => 'Você é o D.A.V.I., um assistente virtual acolhedor de bem-estar emocional. Responda sempre em português brasileiro, com empatia e linguagem simples. Ofereça orientações práticas e úteis. Escreva respostas completas, com começo, desenvolvimento e conclusão. Nunca interrompa uma frase no meio. Para perguntas comuns, procure responder em 2 a 5 parágrafos, sem ser excessivamente longo. Use Markdown quando ajudar na leitura. Não faça diagnósticos médicos ou psicológicos. Você não substitui profissionais de saúde. Se alguém estiver em perigo imediato, incentive a procurar ajuda de emergência e uma pessoa de confiança.'
                            ]]
                        ],
                        'contents' => [
                            [
                                'role' => 'user',
                                'parts' => [
                                    ['text' => $mensagem]
                                ]
                            ]
                        ],
                        'generationConfig' => [
                            'maxOutputTokens' => 4096,
                            'thinkingConfig' => [
                                'thinkingLevel' => 'low',
                            ],
                        ],
                    ]
                );

        } catch (ConnectionException $e) {
            logger()->error('Falha de conexão com Gemini.', [
                'modelo' => $modelo,
                'erro' => $e->getMessage(),
            ]);

            throw new RuntimeException(
                'Não foi possível conectar ao Gemini. Tente novamente em alguns instantes.',
                0,
                $e
            );
        }

        if ($resposta->failed()) {
            $erro = $resposta->json('error.message')
                ?? 'Falha na comunicação com a API Gemini.';

            logger()->error('Erro retornado pela API Gemini.', [
                'modelo' => $modelo,
                'status' => $resposta->status(),
                'erro' => $erro,
            ]);

            throw new RuntimeException(
                "Erro na API Gemini ({$resposta->status()}): {$erro}"
            );
        }

        $dados = $resposta->json();

        $partes = $dados['candidates'][0]['content']['parts'] ?? [];

        $textos = [];

        foreach ($partes as $parte) {
            if (isset($parte['text']) && is_string($parte['text'])) {
                $textos[] = $parte['text'];
            }
        }

        $textoFinal = trim(implode('', $textos));

        $motivo = $dados['candidates'][0]['finishReason']
            ?? 'DESCONHECIDO';

        logger()->info('Diagnóstico Gemini', [
            'modelo' => $modelo,
            'finishReason' => $motivo,
            'tamanho_resposta' => mb_strlen($textoFinal),
            'uso_tokens' => $dados['usageMetadata'] ?? [],
        ]);

        if ($textoFinal === '') {
            throw new RuntimeException(
                'O Gemini não retornou uma resposta em texto.'
            );
        }

        if ($motivo === 'MAX_TOKENS') {
            logger()->warning(
                'A resposta do Gemini atingiu o limite de tokens.',
                [
                    'modelo' => $modelo,
                    'finishReason' => $motivo,
                    'tamanho_resposta' => mb_strlen($textoFinal),
                ]
            );
        }

        return $textoFinal;
    }
}
