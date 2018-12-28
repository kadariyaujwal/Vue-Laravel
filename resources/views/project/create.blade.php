@extends('welcome')


@section('content')
<form action="{{route('project.store')}} " @submit.prevent="onSubmit" method="post" @keydown="form.errors.clear($event.target.name)">
    @csrf
    <div class="form-group">
      <label for="exampleInputEmail1">Title</label>
      <input type="text" class="form-control" name="title" placeholder = "Enter title" v-model="form.title">
      <small id="titleError" class="form-text text-danger" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Description</label>
      <input type="textarea" class="form-control" name="description" placeholder="Description" rows="8" v-model="form.description">
      <small id="descriptionError" class="form-text text-danger" v-if = "form.errors.has('description')" v-text="form.errors.get('description')"></small>
    </div>
    <button type="submit" class="btn btn-primary"  :disabled="form.errors.any()">Submit</button>

  </form>
  
@endsection