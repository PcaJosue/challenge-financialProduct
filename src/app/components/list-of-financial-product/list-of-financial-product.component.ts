import { Component, OnInit } from '@angular/core';
import { FinancialProduct } from 'src/app/models/financialProduct';
import { FinancialProductService } from 'src/app/services/financial-product.service';

@Component({
  selector: 'app-list-of-financial-product',
  templateUrl: './list-of-financial-product.component.html',
  styleUrls: ['./list-of-financial-product.component.scss']
})
export class ListOfFinancialProductComponent implements OnInit {

  constructor(private financialProductService:FinancialProductService){}

  private financialProducts:FinancialProduct[] = [];
  public filteredFinancialProducts:FinancialProduct[] = [];


  ngOnInit(): void {
    this.financialProductService.getFinancialProducts()
    .subscribe((products:FinancialProduct[])=>{
      this.financialProducts = products;
      this.filteredFinancialProducts = [...products];
    })
  }

}
