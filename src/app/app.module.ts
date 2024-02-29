import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListOfFinancialProductComponent } from './components/list-of-financial-product/list-of-financial-product.component';
import { RoundedInfoComponent } from './components/utils/rounded-info/rounded-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfFinancialProductComponent,
    RoundedInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
