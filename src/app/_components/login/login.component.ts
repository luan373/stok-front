import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Usuario } from '../../_models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfig } from 'src/app/_interfaces/api-config';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  usuario: Usuario = new Usuario();

  constructor(
    private loginSerivce: LoginService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.alertService.error('Usuário ou senha inválidos.');
      return;
    }
    this.usuario.usuario = this.loginForm.value.usuario;
    this.usuario.senha = this.loginForm.value.senha;

    this.loginSerivce.doLogin(this.usuario).pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/home'])
        },
        error => {
          this.alertService.error('Usuário ou senha inválidos.');
          this.loading = false;
        });
  }
}