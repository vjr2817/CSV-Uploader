<?php
// src/Service/AuthService.php

namespace App\Service;

use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;

use UnexpectedValueException;
use DomainException;

class AuthService{
    /**
     * Password hasing method 
     */
    public function getHashedPassword($password){
        $factory = new PasswordHasherFactory([
            'common' => ['algorithm' => 'bcrypt']
        ]);
        $hasher = $factory->getPasswordHasher('common');
        $hash = $hasher->hash($password);
        return $hash;
    }
    /**
     * Password verification method 
     */
    public function verifyPassword($password){
        $factory = new PasswordHasherFactory([
            'common' => ['algorithm' => 'bcrypt']
        ]);
        $hasher = $factory->getPasswordHasher('common');
        $verifyFlag = $hasher->verify($_ENV['Login_Password'],$password);
        return $verifyFlag;
    }

    /**
     * Generating JWT token with payloadd data to be shared with client
     */
    public function generateJWTToken($username){
        $key = $_ENV['JWT_Key'];
        $payload = [
            'username'=> $username,
            'created'=>time()
        ];
        $jwt = JWT::encode($payload, $key, 'HS256');
        return $jwt;
    }

    /**
     *  Decoding JWT Token and fetching payload data 
     */

    public function decodeJWTToken($jwt){
        $key = $_ENV['JWT_Key'];
        $headers = new \stdClass();
        try{
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'),$headers);
        }
        catch(UnexpectedValueException|DomainException $error){
            throw new CustomUserMessageAuthenticationException('Invalid API token provided');
        }
        return  (array) $decoded;
    }
}