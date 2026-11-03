
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('atividades_conteudo', function (Blueprint $table) {
            $table->id();

            $table->foreignId('conteudo_bem_estar_id')
                ->constrained('conteudos_bem_estar')
                ->cascadeOnDelete();

            $table->string('titulo', 180);
            $table->text('instrucao');
            $table->string('tipo', 30)->default('reflexao');
            $table->unsignedInteger('ordem')->default(1);

            $table->timestamps();

            $table->index(['conteudo_bem_estar_id', 'ordem']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('atividades_conteudo');
    }
};
