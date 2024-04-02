<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $role = Role::create(['name' => 'developer']);
        $viewUsersPermission = Permission::create(['name' => 'view users']);

        $role->givePermissionTo($viewUsersPermission);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $viewUsersPermission = Permission::findByName('view users');
        $role = Role::findByName('developer');

        $role->revokePermissionTo($viewUsersPermission);
    }
};
