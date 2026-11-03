
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('progresso_conteudos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('conteudo_bem_estar_id')
                ->constrained('conteudos_bem_estar')
                ->cascadeOnDelete();

            $table->timestamp('concluido_em')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'conteudo_bem_estar_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('progresso_conteudos');
    }
};
