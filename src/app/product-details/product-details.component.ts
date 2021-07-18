import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }from'@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products: Product [] = []
  detailProduct: Product
  sortKey: keyof Product = 'id'
  
  constructor(private route: ActivatedRoute, private productService: ProductService, private customerService:CustomerService) {
    productService.getProducts().subscribe(products => {this.products = products})
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      const id = String(params.id)
      this.productService.getProduct(id).subscribe(product => {this.detailProduct = product})
      ;})
  }

  addTobasket(event: Product): void {
    this.customerService.addProduct(event);
    this.productService.decreaseStock(event);
  }
  
  isTheLast() {
    return this.productService.isTheLast(this.detailProduct);
  }

  outOfStock() {
    return this.productService.outOfStock(this.detailProduct);
  }
}
