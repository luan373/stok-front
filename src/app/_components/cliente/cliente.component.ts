import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_services/cliente.service';
import { AlertService } from '../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/_models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  titulo: string;

  clienteForm: FormGroup;

  cliente: Cliente;

  loading = false;
  submitted = false;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit() {
    this.recuperaCliente();

    this.clienteForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  private recuperaCliente() {
    let id = this.route.snapshot.params['id'];

    if (id != undefined) {
      this.clienteService.buscarPorId(id).subscribe(data => {
        this.clienteForm = new FormGroup({
          id: new FormControl(data.id, Validators.required),
          nome: new FormControl(data.nome, Validators.required),
          cpf: new FormControl(data.cpf, Validators.required),
          telefone: new FormControl(data.telefone, Validators.required),
          email: new FormControl(data.email, Validators.required)
        });

        this.titulo = "Alterar Cliente";
      });

    } else {
      this.titulo = "Cadastrar Cliente";
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.clienteForm.invalid) {
      this.alertService.error('Dados inválidos.');
      return;
    }

    this.loading = true;

    this.cliente = new Cliente();
    this.cliente.nome = this.clienteForm.value.nome;
    this.cliente.cpf = this.clienteForm.value.cpf;
    this.cliente.telefone = this.clienteForm.value.telefone;
    this.cliente.email = this.clienteForm.value.email;

    if (this.clienteForm.value.id != null) {
      this.cliente.id = this.clienteForm.value.id;

      this.clienteService.atualizar(this.cliente).subscribe(cliente => {
        this.alertService.success("Cliente salvo com sucesso!", true);
        this.redirecionaListaCliente();
      },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
    } else {
      this.clienteService.salvar(this.cliente).subscribe(
        cliente => {
          this.alertService.success("Cliente salvo com sucesso!", true);
          this.redirecionaListaCliente()
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
    }
  }

  redirecionaListaCliente() {
    this.router.navigate(['/listarCliente']);
  }

}
