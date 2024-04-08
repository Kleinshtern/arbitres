<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/**
 * @package User
 *
 * @property integer $id
 * @property string $email
 * @property string $password
 * @property string $name
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'created_at' => 'datetime'
        ];
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return Carbon::parse($date)->format('d.m.Y H:i:s');
    }

    public function setPassword(string $password): void
    {
        $this->password = Hash::make($password);
    }

    public static function createUser(array $data): User
    {
        $user = new self([
            'name' => $data['name'],
            'email' => $data['email']
        ]);

        $user->setPassword($data['password']);
        $user->save();

        return $user;
    }
}
