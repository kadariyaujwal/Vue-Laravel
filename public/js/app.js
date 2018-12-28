class Errors{

    constructor() {
        this.errors = {}
    }
    get(field) {
        if( this.errors[field] ){
            return this.errors[field][0];
        }
    }
    has(field) {
        return this.errors.hasOwnProperty(field);
    }
    record(errors) {
        this.errors = errors;
    }
    clear( field ) {
        if( field && this.errors[field] ){
            delete this.errors[field];
            return;
        }
        else if(!field){
            this.errors = {}
        }
    }
    any(){
        return Object.keys(this.errors).length > 0;
    }
}

class Form{
    constructor(data){
        this.originalData = data;
        this.errors = new Errors();
        for(let field in data) {
            this[field] = data[field];
        } 
    }
    post(url){
        return this.submit('post',url);
    }
    delete(url){
        return this.submit('delete',url);
    }
    patch(url){
        return this.submit('patch',url);
    }
    put(url){
        return this.submit('put',url);
    }
    reset(){
        for(let field in this.originalData){
            this[field] = '';
        }

        this.errors.clear();

    }
    data(){
        let data = {};
        for(let field in this.originalData){
            data[field]=this[field];
        }
        return data;
    }
    submit(requestType,url){
        return new Promise((resolve,reject)=>{
            axios[requestType](url,this.data())
            .then((response)=>{
                this.onSuccess(response.data);
                resolve(response.data);
            })
            .catch((error)=>{
                this.onError(error);
                reject(error.response.data);
            });
        })
       
    }
    onSuccess(response)
    {
        this.errors.clear();
        this.reset();
    }
    onError(error){
        this.errors.record(error.response.data.errors);
    }
}
new Vue({
    el:'#app',

    data:{
        form:new Form({

            title:'',

            description:'',

        }),
    },

    methods:{

        onSubmit(){
            this.form.post('/projects')

            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        
    }
})