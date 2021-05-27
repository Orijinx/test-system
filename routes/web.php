<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test/{id}',function($id){
    header('Content-Type: application/json');
    if($id == 1){
        return json_encode('[{
            id: 1,
            question: "Сколько лет создателю?",
            answer: "",
        }, {
            id: 3,
            question: "Его любимый язык программирования?",
            answer: "",
        }]');
    }
});