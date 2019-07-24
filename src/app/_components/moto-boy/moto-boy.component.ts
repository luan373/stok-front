import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { AlertService } from '../alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoBoyService } from 'src/app/_services/moto-boy.service';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private motoBoyService: MotoBoyService
  ) { }

  ngOnInit() {
    this.recuperaMotoBoy();

    this.motoBoyForm = this.formBuilder.group({
      nome: ['', Validators.required],
      placa: ['', Validators.required],
      cpf: ['', Validators.required],
      nrHabilitacao: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {

  }

  private recuperaMotoBoy() {
    //https://stackoverflow.com/questions/40589730/local-storage-in-angular-2
    let id = this.route.snapshot.params['id'];

    if (id != undefined) {
      this.motoBoyService.buscarPorId(id).pipe(map(data => {
        this.displaydata(data);
        this.recuperaTitulo();
      })).toPromise();
    } else {
      this.recuperaTitulo();
    }
  }


  displaydata(data) {
    this.motoBoy = new MotoBoy();
    this.motoBoy.id = data.id;
    this.motoBoy.cpf = data.cpf;
    this.motoBoy.nome = data.nome;
    this.motoBoy.nrHabilitacao = data.nrHabilitacao;
    this.motoBoy.placa = data.placa;
  }

  private recuperaTitulo() {
    console.log("aff" + this.motoBoy);
    if (this.motoBoy == null) {
      this.titulo = "Cadastrar MotoBoy";
    } else {
      this.titulo = "Alterar MotoBoy";
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.motoBoyForm.invalid) {
      this.alertService.error('Dados inválidos.');
      return;
    }
  }

}
