import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodo } from '../shared/models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  isInEditMode : boolean = false;

  editId : string = '';

  @ViewChild('todoItem') item !: ElementRef;

  todoArr : Array <Itodo> = [
  
  {
    todoItem: 'Ferrari F8 Tributo',
    todoId: 'SC101'
  },
  {
    todoItem: 'Lamborghini Huracán',
    todoId: 'SC102'
  },
  {
    todoItem: 'Porsche 911 Turbo',
    todoId: 'SC103'
  },
  {
    todoItem: 'McLaren 720S',
    todoId: 'SC104'
  }
];

  trackById(index : number, todo : Itodo){
    return todo.todoId
  }

  constructor(
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onTodoAdd(){
    if(this.item.nativeElement.value.length > 0){
      let obj = {
        todoItem : this.item.nativeElement.value,
        todoId : Date.now().toString()
      }

      this.item.nativeElement.value = '';

      this.todoArr.push(obj);

      this._snackBar.open(`The todo item is added successfully!!!`,'Close',{
        horizontalPosition : "left",
        verticalPosition : "top",
        duration : 3000
      })

    }
  
  }

  onRemove(id : string){
    let getIndex = this.todoArr.findIndex(t => t.todoId === id);
    this.todoArr.splice(getIndex,1);

    this._snackBar.open(`The TodoItem is removed successfully!!!`,'Close',{
      horizontalPosition : "left",
      verticalPosition : "bottom" ,
      duration : 3000
    })
  }

  onEdit(t : Itodo){
    // to patch data on input controls
    this.item.nativeElement.value = t.todoItem;
  //  to show update button
    this.isInEditMode = true;
  // to reuse id as update id for this >>>> store in editId
    this.editId = t.todoId;
    // this represents the input controls data
  }

  onUpdate(){
    let Updated_obj : Itodo = {
        todoItem : this.item.nativeElement.value,
        todoId : this.editId
    }
    // reset form
     this.item.nativeElement.value = '';

    //  to update the obj in Database
    let getIndex = this.todoArr.findIndex(t => t.todoId === Updated_obj.todoId);
    this.todoArr[getIndex] = Updated_obj;

    // to hide update button
    this.isInEditMode = false;

    this._snackBar.open(`The TodoItem updated ${Updated_obj.todoId} successfully!!!`,'Close',{
      horizontalPosition : 'right',
      verticalPosition : 'bottom',
      duration : 3000
    })

  }


}









