import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Usuario } from '../../_models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiConfig } from 'src/app/_interfaces/api-config';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  usuario: Usuario = new Usuario();

  constructor(
    private loginSerivce: LoginService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.alertService.error('Usuário ou senha inválidos.');
      return;
    }

    this.usuario.username = this.loginForm.value.usuario;
    this.usuario.password = this.loginForm.value.senha;

    this.loading = true;
    this.authenticationService.login(this.usuario.username, this.usuario.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error('Usuário ou senha inválidos.');
          this.loading = false;
        });

  }
}