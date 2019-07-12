import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Usuario } from './usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  usuario: Usuario = new Usuario();


  constructor(
    private loginSerivce: LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('invalido');
    }

    this.usuario.usuario = this.loginForm.value.usuario;
    this.usuario.senha = this.loginForm.value.senha;

    try {
      this.loginSerivce.doLogin(this.usuario);
    } catch (e) {
      console.log("eae");
      console.log(e);
    }
  }

}