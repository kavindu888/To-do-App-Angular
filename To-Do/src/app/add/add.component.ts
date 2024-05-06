import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { title } from 'process';
import { TaskComponent } from '../task/task.component';
import { ToDoService } from '../to-do.service';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,TaskComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})

export class AddComponent {

  applyForm: FormGroup;
  isFromSubmit:boolean=false;


  constructor(private http:HttpClient,private taskService: ToDoService) {

    this.applyForm = new FormGroup({
      title: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required,Validators.maxLength(300)])
      
    })

  
  }

onSubmit(){
  const isFormValid=this.applyForm.valid;
  this.isFromSubmit=true;

if(isFormValid){
  const formData = this.applyForm.value;
 
console.log(formData)

 

  this.http.post('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo',formData).subscribe((res:any)=>{

  if(res){
     
        alert("Task saved...!");
      //  this.taskService.triggerRefresh();
        this.applyForm.reset();
       
   }else{
      alert(res.message);
    }

  })
}
}

}

