import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/services.component';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product !: IProduct;
  productForm = this.formBuilder.group({
    name : ['' , [Validators.required, Validators.minLength(4)]],
    price:[0],
  })

  constructor(
    private productService : ProductService,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    this.route.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
        this.productForm.patchValue({
          name : product.name,
          price : product.price,
        })
      },error => console.log(error.message)
      )
    })
  }
  onHandleUpdate() {
    if(this.productForm.valid){
      const newProduct : IProduct = {
        id:this.product.id,
        name : this.productForm.value.name || "",
        price : this.productForm.value.price || 0,
      } 
      this.productService.updateProduct(newProduct).subscribe(product => {
        console.log('thanh cong' , product);
      })
    }
  }
}
