import { FinancialProduct } from './../models/financialProduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {

  public URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'
  private headers = new HttpHeaders({'authorId':'499'});

  constructor(private http: HttpClient) {  }


  public getFinancialProducts():Observable<FinancialProduct[]>{
    return this.http.get<FinancialProduct[]>(this.URL,{headers:this.headers})
  }

  public createFinancialProduct(FinancialProduct:FinancialProduct):Observable<FinancialProduct[]>{
    return this.http.post<FinancialProduct[]>(this.URL,FinancialProduct,{headers:this.headers})
  }

  public validateFinancialProduct(id:string):Observable<boolean>{
    return this.http.get<boolean>(this.URL+'/verification',{ headers:this.headers,params: {id: id}})
  }

}
