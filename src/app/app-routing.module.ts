import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfFinancialProductComponent } from './components/list-of-financial-product/list-of-financial-product.component';

const routes: Routes = [
  {path:'financialProducts', component: ListOfFinancialProductComponent},
  {path: '**', component: ListOfFinancialProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
