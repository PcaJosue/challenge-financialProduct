import { Component, OnInit } from '@angular/core';
import { FinancialProduct } from 'src/app/models/financialProduct';
import { FinancialProductService } from '../../services/financial-product.service';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'app-list-of-financial-product',
  templateUrl: './list-of-financial-product.component.html',
  styleUrls: ['./list-of-financial-product.component.scss']
})
export class ListOfFinancialProductComponent implements OnInit {

  constructor(private financialProductService:FinancialProductService){}

  private financialProducts:FinancialProduct[] = [];
  private filteredFinancialProducts:FinancialProduct[] = [];

  public data:FinancialProduct[]=[];
  public searchInput:string= '';
  public sizeTable:number = 5;
  public total:number=0;
  public page:number=0;
  public isLastPage:boolean=false;
  public rowSelected:FinancialProduct | null =null


  ngOnInit(): void {

    this.financialProductService.getFinancialProducts()
    .subscribe((products:FinancialProduct[])=>{
      this.financialProducts = products;
      this.filteredFinancialProducts = [...products];
      this.buildData();
    })

    fromEvent<MouseEvent>(document, 'click').pipe(
      filter((event: MouseEvent) => {
        const clickedElement = event.target as HTMLElement;
        return !clickedElement.closest(`.options-icon`);
      })
    ).subscribe( ()=> this.rowSelected = null);

  }

  public search():void{

    this.page=0;

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

    this.buildData();
  }



  private formatDate(date:Date):string{
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  private checkShowPagination():void{
    this.isLastPage = Math.ceil(this.total / this.sizeTable) === (this.page+1)
  }

  public buildData():void{

    this.total = this.filteredFinancialProducts.length;
    const startIndex = this.page * this.sizeTable;
    const endIndex = startIndex + this.sizeTable;
    this.data = this.filteredFinancialProducts.slice(startIndex,endIndex );

    this.checkShowPagination();

  }

  public goToPage(move:number):void{
    this.page = this.page + move;
    this.buildData();
  }

  public asignProduct(product:FinancialProduct){
    this.rowSelected = product?.id === this.rowSelected?.id ? null : product
  }


}
