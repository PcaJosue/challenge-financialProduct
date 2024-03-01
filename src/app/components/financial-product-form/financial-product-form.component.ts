import { FinancialProduct } from './../../models/financialProduct';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FinancialProductService } from '../../services/financial-product.service';

@Component({
  selector: 'app-financial-product-form',
  templateUrl: './financial-product-form.component.html',
  styleUrls: ['./financial-product-form.component.scss']
})
export class FinancialProductFormComponent {

  public today:Date= new Date();
  public message:{ value:string, code:string} | null = null;
  public loading:boolean=false;
  public submited:boolean=false;

  private isNew:boolean = true;



  public formGroup : FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl<string>('', [Validators.required]),
    date_revision: new FormControl<string>({value: '', disabled:true}, [Validators.required]),
  });

  constructor(private financialProductService:FinancialProductService){

  }

  get id(){
    return this.formGroup.get('id')
  }

  get name(){
    return this.formGroup.get('name')
  }


  get description(){
    return this.formGroup.get('description')
  }

  get logo(){
    return this.formGroup.get('logo')
  }

  get date_release(){
    return this.formGroup.get('date_release')
  }

  get date_revision(){
    return this.formGroup.get('date_revision')
  }

  public markFormAsDirty():void{
    Object.keys(this.formGroup.controls).forEach(key => this.formGroup.get(key)?.markAsDirty());
  }

  public setDateRevision():void{
    const newDate = new Date(this.date_release?.value)
    newDate.setFullYear(newDate.getFullYear() + 1);
    this.date_revision?.setValue(newDate.toISOString().slice(0, 10))

  }

  public async existID(){
   try{
     const exists = await firstValueFrom(this.financialProductService.validateFinancialProduct(this.id?.value));
     return exists;

   }catch(error){

    this.id?.setErrors({ existID:true})
    return true;
   }
  }

  public reset():void{
    this.formGroup.reset();
    this.formGroup.enable();
    this.isNew=true;
    this.submited=false;
    this.message=null;
  }

  private createFinancialProduct(financialProduct:FinancialProduct){

    this.financialProductService.createFinancialProduct(financialProduct)
      .subscribe({
        next: () => {
          this.message = { value: 'Producto Financiero Creado con éxito', code:'success'};
          this.submited=true;
          this.formGroup.disable();
          this.loading=false;
        },
        error: (error) => console.error(error)
      })
  }

  public async send(){

    this.loading = true;

    this.markFormAsDirty();

    if(this.formGroup.invalid || (this.isNew  && await this.existID())){
      this.loading = false;
      return;
    }


    const newFinancialProduct:FinancialProduct = {
      ...this.formGroup.getRawValue(),
      date_release: new Date(this.date_release?.value),
      date_revision: new Date(this.date_revision?.value)
    }

    this.isNew ? this.createFinancialProduct(newFinancialProduct) : null;

  }



}
