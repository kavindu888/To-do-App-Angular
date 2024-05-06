import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToDoService } from '../to-do.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  isShow: boolean = true;
  updateForm: FormGroup;
  isFromSubmit: boolean = false;
  constructor(private taskService: ToDoService, private http: HttpClient) {

    this.updateForm = new FormGroup({
      description: new FormControl("", [Validators.required, Validators.maxLength(350)]),
    })

  }


  onUpdate(id: number, description: String) {
    const isFormValid = this.updateForm.valid;
    this.isFromSubmit = true;

    if (isFormValid) {
      const formData = this.updateForm.value;
      console.log(formData)
      console.log(id)
      console.log(description)

      if (formData.description === description) {
        alert("Data not Change for update")
      } else {
        if (confirm('are you sure Update this description')) {


          this.http.put('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo/' + id, formData).subscribe((res: any) => {

            if (res) {

              alert("Task Update...!");
              this.fatchData();
              //  this.taskService.triggerRefresh();
              this.updateForm.reset();
              this.closeDisplay();

            } else {
              alert(res.message);
            }

          })
        } else {
          this.updateForm.reset();
          this.closeDisplay();
        }
      }

    }
  }

  data: any[] = []
  ngOnInit(): void {
    this.fatchData();

    //this.taskService.refresh$.subscribe(() => {
    // this.fatchData();
    //});
  }
  httpClient = inject(HttpClient);

  fatchData() {
    this.httpClient.get('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo').subscribe((data: any) => {
      console.log(data);
      this.data = data;
    })
  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  closeDisplay() {
    this.isShow = true;
  }
  onDelete(id:number){
if(confirm('are you sure Delete This task?')){
  this.http.delete('https://60a21a08745cd70017576014.mockapi.io/api/v1/todo/' + id).subscribe((res: any) => {

  if (res) {

    alert("Task Deleted...!");
    this.fatchData();
  }else{

  }
  });
}
  }

}
