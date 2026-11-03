<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MensagemDavi extends Model
{
    protected $table = 'mensagem_davis';

    protected $fillable = [
        'conversa_davi_id',
        'remetente',
        'mensagem',
    ];

    public function conversa(): BelongsTo
    {
        return $this->belongsTo(
            ConversaDavi::class,
            'conversa_davi_id'
        );
    }
}
