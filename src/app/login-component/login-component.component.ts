import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  //对应我们登录的表单
  myForm: FormGroup;

  //输入用户名的输入控件
  userName: AbstractControl;

  //输入密码的输入控件
  password: AbstractControl;

  name$: Observable<string>;

  baseUrl = 'http://127.0.0.1:8080/';

  constructor(private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }

  ngOnInit(): void {
  }

  login() {
    this.httpClient.post(this.baseUrl + 'mm', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          this.authService.login();
          this.myForm.valid;
        }
        else {
          alert('查无此账号');
          this.myForm.invalid;
        }
      })
  }
}
