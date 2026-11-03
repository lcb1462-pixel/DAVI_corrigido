
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mensagem_davis', function (Blueprint $table) {
            $table->id();

            $table->foreignId('conversa_davi_id')
                ->constrained('conversa_davis')
                ->cascadeOnDelete();

            $table->string('remetente', 20);
            $table->text('mensagem');

            $table->timestamps();

            $table->index(['conversa_davi_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mensagem_davis');
    }
};
