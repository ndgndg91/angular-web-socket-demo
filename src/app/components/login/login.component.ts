import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signInFormGroup = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.min(5), Validators.max(255)]),
      password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(100)])
    });
  }

  signIn(): void {
    console.log('loing clicked');
    if (this.signInFormGroup.invalid) {
      this.signInFormGroup.markAllAsTouched();
    }

    const username = this.signInFormGroup.get('username').value;
    const password = this.signInFormGroup.get('password').value;
    console.log(username, password);
    this.authService.signIn(username, password);
  }

  get username(): any {
    return this.signInFormGroup.get('username');
  }

  get password(): any {
    return this.signInFormGroup.get('password');
  }

}
