
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('conteudos_bem_estar', function (Blueprint $table) {
            $table->id();

            $table->foreignId('categoria_conteudo_id')
                ->constrained('categorias_conteudo')
                ->cascadeOnDelete();

            $table->string('titulo', 180);
            $table->string('resumo', 300);
            $table->longText('conteudo');
            $table->string('imagem_url')->nullable();
            $table->unsignedInteger('tempo_leitura')->default(5);
            $table->boolean('ativo')->default(true);

            $table->timestamps();

            $table->index(['ativo', 'categoria_conteudo_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('conteudos_bem_estar');
    }
};
