<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\UserResource;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'picture' => $this->picture ? url('upload/'.$this->picture) : null,
            'category' => new CategoryResource($this->category),
            'user' => new UserResource($this->user),
        ];
    }
}
