<?php
// src/Controller/LoginController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Service\AuthService;


class LoginController extends AbstractController
{

    public function login(Request $request, AuthService $authService): JsonResponse
    {
     
        $data =  $request->toArray(); 
        if($data && array_key_exists('username',$data) && $data['username'] === $_ENV['Login_Username']){           
            if($data && array_key_exists('password',$data) && $authService->verifyPassword($data['password'])){
                $token = $authService->generateJWTToken($data['username']);
                return new JsonResponse(['token'=>$token,'status'=>'success'], Response::HTTP_OK);
            }
        }
        $res_data = ['status'=>'failure','message'=>'Invalid Credentials'];
        return new JsonResponse($res_data, Response::HTTP_UNAUTHORIZED);
     
    }

  
}