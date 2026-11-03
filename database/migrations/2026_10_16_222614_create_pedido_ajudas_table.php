
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedido_ajudas', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('tipo', 100);
            $table->text('descricao');
            $table->string('status', 30)->default('Pendente');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedido_ajudas');
    }
};
