import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListOfFinancialProductComponent } from './components/list-of-financial-product/list-of-financial-product.component';
import { RoundedInfoComponent } from './components/utils/rounded-info/rounded-info.component';
import { FinancialProductService } from './services/financial-product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinancialProductFormComponent } from './components/financial-product-form/financial-product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfFinancialProductComponent,
    RoundedInfoComponent,
    FinancialProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FinancialProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
