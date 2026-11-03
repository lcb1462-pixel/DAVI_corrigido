<?php

namespace Database\Seeders;

use App\Actions\Teams\CreateTeam;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminUserSeeder extends Seeder
{
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

        if (! $user->personalTeam()) {
            app(CreateTeam::class)->handle(
                $user,
                $user->name . "'s Team",
                isPersonal: true
            );
        }
    }
}