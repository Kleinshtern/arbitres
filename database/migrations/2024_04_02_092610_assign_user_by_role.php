<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $user = \App\Models\User::where('email', 'xlukis44@gmail.com')->first();

        if(empty($user)) {
            $user = new \App\Models\User();
            $user->email = 'xlukis44@gmail.com';
            $user->name = 'xlukis44@gmail.com';
            $user->setPassword('d12032001');
            $user->save();
        }

        $user->assignRole('developer');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $user = \App\Models\User::where('email', 'xlukis44@gmail.com')->first();

        if(!empty($user)) {
            $user->removeRole('developer');
        }
    }
};
