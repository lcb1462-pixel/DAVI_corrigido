<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PedidoAjuda extends Model
{
    protected $fillable = [
        'user_id',
        'tipo',
        'descricao',
        'status',
        'resposta',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
