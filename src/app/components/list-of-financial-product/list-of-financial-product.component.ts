import { Component, OnInit } from '@angular/core';
import { FinancialProduct } from 'src/app/models/financialProduct';
import { FinancialProductService } from '../../services/financial-product.service';

@Component({
  selector: 'app-list-of-financial-product',
  templateUrl: './list-of-financial-product.component.html',
  styleUrls: ['./list-of-financial-product.component.scss']
})
export class ListOfFinancialProductComponent implements OnInit {

  constructor(private financialProductService:FinancialProductService){}

  private financialProducts:FinancialProduct[] = [];

  public filteredFinancialProducts:FinancialProduct[] = [];
  public searchInput:string= '';


  ngOnInit(): void {
    this.financialProductService.getFinancialProducts()
    .subscribe((products:FinancialProduct[])=>{
      this.financialProducts = products;
      this.filteredFinancialProducts = [...products];

    })
  }

  public search():void{


    if(!this.searchInput.trim()){
      this.filteredFinancialProducts = [...this.financialProducts]
    }

    if(this.searchInput){
      this.filteredFinancialProducts = this.financialProducts.filter((product:FinancialProduct)=>{

        const search:string = this.searchInput.trim().toLocaleLowerCase();
        if(product.name.toLowerCase().includes(search)) return true;
        if(product.description.toLocaleLowerCase().includes(search)) return true;
        if(this.formatDate(product.date_release).includes(search)) return true;
        if(this.formatDate(product.date_revision).includes(search)) return true;

        return false;
      })
    }

  }


  private formatDate(date:Date):string{
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

}
