import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm : NgForm;
  subbscription : Subscription
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;

  constructor(private slSevice: ShoppingListService){

  }

  ngOnInit() {
    this.subbscription= this.slSevice.startedEditing
    .subscribe(
      (index:number) =>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slSevice.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }
  
  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredint = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slSevice.updateIngredient(this.editedItemIndex, newIngredint);
    } else{
      this.slSevice.addIngredient(newIngredint);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.slSevice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subbscription.unsubscribe();
  }
}
