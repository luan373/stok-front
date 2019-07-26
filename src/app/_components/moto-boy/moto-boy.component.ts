import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { AlertService } from '../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoBoyService } from 'src/app/_services/moto-boy.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-moto-boy',
  templateUrl: './moto-boy.component.html',
  styleUrls: ['./moto-boy.component.css']
})
export class MotoBoyComponent implements OnInit, OnDestroy {

  motoBoyForm: FormGroup;
  titulo: string;
  motoBoy: MotoBoy;
  loading = false;
  submitted = false;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private motoBoyService: MotoBoyService
  ) { }

  ngOnInit() {
    this.recuperaMotoBoy();

    this.motoBoyForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      placa: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      nrHabilitacao: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy(): void {

  }

  private recuperaMotoBoy() {
    //https://stackoverflow.com/questions/40589730/local-storage-in-angular-2
    let id = this.route.snapshot.params['id'];

    if (id != undefined) {
      this.motoBoyService.buscarPorId(id).subscribe(data => {
        this.motoBoyForm = new FormGroup({
          id: new FormControl(data.id, Validators.required),
          nome: new FormControl(data.nome, Validators.required),
          placa: new FormControl(data.placa, Validators.required),
          cpf: new FormControl(data.cpf, Validators.required),
          nrHabilitacao: new FormControl(data.nrHabilitacao, Validators.required)
        });

        this.titulo = "Alterar MotoBoy";
      });

    } else {
      this.titulo = "Cadastrar MotoBoy";
    }
  }

  public direcionaListarMotoBoy() {
    this.router.navigate(['/listarMotoBoy']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.motoBoyForm.invalid) {
      this.alertService.error('Dados inválidos.');
      return;
    }

    this.loading = true;

    this.motoBoy = new MotoBoy();
    this.motoBoy.cpf = this.motoBoyForm.value.cpf;
    this.motoBoy.nome = this.motoBoyForm.value.nome;
    this.motoBoy.nrHabilitacao = this.motoBoyForm.value.nrHabilitacao;
    this.motoBoy.placa = this.motoBoyForm.value.placa;

    if (this.motoBoyForm.value.id != null) {
      this.motoBoy.id = this.motoBoyForm.value.id;

      this.motoBoyService.atualizar(this.motoBoy).subscribe(
        () => this.redirecionaListaMotoBoy()
      );
    } else {
      this.motoBoyService.salvar(this.motoBoy).subscribe(
        () => this.redirecionaListaMotoBoy()
      );
    }
  }

  redirecionaListaMotoBoy() {
    this.alertService.success("MotoBoy salvo com sucesso!", true);
    this.router.navigate(['/listarMotoBoy']);
  }

}
