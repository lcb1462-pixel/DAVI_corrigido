<?php

namespace App\Console\Commands;

use App\Services\GeminiService;
use Illuminate\Console\Command;
use Throwable;

class TestarGemini extends Command
{
    protected $signature = 'gemini:test';

    protected $description = 'Testa a conexão com o Gemini';

    public function handle(GeminiService $gemini): int
    {
        $this->info('Enviando mensagem para o Gemini...');

        try {
            $resposta = $gemini->enviarMensagem(
                'Olá! Apresente-se brevemente como o assistente D.A.V.I.'
            );

            $this->newLine();
            $this->info('Resposta do Gemini:');
            $this->line($resposta);

            return self::SUCCESS;
        } catch (Throwable $erro) {
            $this->error('Não foi possível concluir o teste.');
            $this->line($erro->getMessage());

            return self::FAILURE;
        }
    }
}
