<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
    /**
     * Cria o administrador inicial somente quando as credenciais forem
     * fornecidas nas variáveis de ambiente do serviço.
     */
    public function run(): void
    {
        $email = Str::lower(trim((string) env('ADMIN_EMAIL')));
        $password = (string) env('ADMIN_PASSWORD');

        if ($email === '' || $password === '') {
            return;
        }

        $user = User::firstOrNew(['email' => $email]);

        if (! $user->exists) {
            $user->name = (string) (env('ADMIN_NAME') ?: 'Administrador D.A.V.I.');
            $user->password = $password;
        }

        $user->is_admin = true;
        $user->save();
    }
}
