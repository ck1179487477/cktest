import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  products$: Observable<Product>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: Product;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'password': [''],
      'id': ['']
    });

    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.password = this.myForm.controls['password'];
  }

  ngOnInit(): void {
    this.products$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');
  }

  search() {
    if (this.id.value) {
      this.products$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products/' + this.id.value);
    } else {
      this.products$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');
    }
  }

  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'product', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
        }
      })
  }

  select(u: Product) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'product/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功！');
          }
        }
      )
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须选择用户！');
    }
    else {
      this.httpClient.put(this.baseUrl + 'product', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功！');
          }
        }
      )
    }
  }
}
