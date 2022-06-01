<?php

namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
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
        $note = Note::select('title', 'picture', 'body', 'category_id', 'user_id')
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
        $note = Note::create([
            'title' => $request->input('title'),
            'category_id' => $request->input('category_id'),
            'body' => $request->input('body'),
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
        $note = Note::select('title', 'picture', 'body', 'category_id', 'user_id')
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
        
        $rules = [
            'title' => 'required',
            'body' => 'required',
            'category_id' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $edit = Note::where('id', $id)->update($validator->validated());
        return response()->json([
            'message' => $edit ? 'Berhasil Edit' : 'Gagal Edit'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $hapus = Note::where('id', $id)->delete();
        return response()->json([
            'message' => $hapus ? 'Berhasil Hapus' : 'Gagal Hapus'
        ]);
    }
}
