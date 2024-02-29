import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialProduct } from '../models/financialProduct';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {

  private URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  private headers = new HttpHeaders({'authorId':'499'});

  constructor(private http: HttpClient) {  }


  public getFinancialProducts():Observable<FinancialProduct[]>{
    return this.http.get<FinancialProduct[]>(this.URL,{headers:this.headers})
  }

}
