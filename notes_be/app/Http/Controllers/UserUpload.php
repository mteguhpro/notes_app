<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserUpload extends Controller
{
    public function index($folder, $path)
    {
        return response()->file(storage_path('app/'.$folder.'/'.$path));
    }
}
