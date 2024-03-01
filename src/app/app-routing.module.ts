import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfFinancialProductComponent } from './components/list-of-financial-product/list-of-financial-product.component';
import { FinancialProductFormComponent } from './components/financial-product-form/financial-product-form.component';

const routes: Routes = [
  {path:'financialProducts', component: ListOfFinancialProductComponent},
  {path:'financialProductForm', component: FinancialProductFormComponent},
  {path: '**', component: ListOfFinancialProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
