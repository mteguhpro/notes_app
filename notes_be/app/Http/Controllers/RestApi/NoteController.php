<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $note = Note::select('id', 'title', 'picture', 'body', 'category_id', 'user_id')
            ->with(['category:id,name,slug', 'user:id,name,username,email'])->paginate($request->get('perPage'));

        return NoteResource::collection($note->all())
            ->additional([
                'total' => $note->total(),
                'currentPage' => $note->currentPage(),
                'perPage' => $note->perPage(),
            ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required',
        ]);
        if($validator->fails()){
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        if($request->hasFile('picture')){
            $path = $request->file('picture')->store('pictures');
        }

        $note = Note::create([
            'title' => $request->input('title'),
            'category_id' => $request->input('category_id'),
            'body' => $request->input('body'),
            'picture' => $path ?? null,
            'user_id' => $request->get('jwt_data')['id_user'],
        ]);
        return new NoteResource($note);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $note = Note::select('id', 'title', 'picture', 'body', 'category_id', 'user_id')
            ->where('id', $id)
            ->with(['category:id,name,slug', 'user:id,name,username,email'])->first();

        if($note){
            return new NoteResource($note);
        }else{
            return response()->json([
                'message' => 'Tidak ditemukan'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $note = Note::where('id', $id)->first();
        if(!$note){
            return response()->json(['message' => 'Data Tidak Ditemukan'], 404);
        }
        
        if($note->user_id !== $request->get('jwt_data')['id_user']){
            return response()->json(['message' => 'Tidak memiliki akses'], 400);
        }
        if($request->hasFile('picture')){
            $path = $request->file('picture')->store('pictures');
        }
        if(!empty($path) && !empty($note->picture)){
            //hapus gambar karena akan ditimpa gambar baru
            Storage::delete($note->picture);
        }
        
        $rules = [
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required',
        ];

        if(!empty($path)){
            $rules['picture'] = 'file';
        }

        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $dataUpdate = $validator->validated();
        if(!empty($path)){
            $dataUpdate['picture'] = $path;
        }
        $edit = Note::where('id', $id)->update($dataUpdate);
        return response()->json([
            'message' => $edit ? 'Berhasil Edit' : 'Gagal Edit'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $note = Note::where('id', $id)->first();
        if(!$note){
            return response()->json(['message' => 'Data Tidak Ditemukan'], 404);
        }
        
        if($note->user_id !== $request->get('jwt_data')['id_user']){
            return response()->json(['message' => 'Tidak memiliki akses'], 400);
        }
        if($note->picture){
            //hapus gambar
            Storage::delete($note->picture);
        }

        $hapus = Note::where('id', $id)->delete();
        return response()->json([
            'message' => $hapus ? 'Berhasil Hapus' : 'Gagal Hapus'
        ]);
    }
}
