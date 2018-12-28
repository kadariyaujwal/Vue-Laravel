<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class ProjectsController extends Controller
{
    //
    public function index(){
        return view('project.index')->with('projects',Project::all());
    }

    public function create(){
        return view('project.create');
    }

    public function store(Request $request, Project $project){
        $request->validate([
            'title'=>'required',
            'description'=>'required'
        ]);
        $project->create([
            'title'=>$request->title,
            'description'=>$request->description
        ]);
        return response()->json([
            'error'=>false,
            'message'=>'Project created successfully'
        ]);
    }
}
