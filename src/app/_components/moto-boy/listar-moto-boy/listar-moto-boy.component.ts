import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoBoyService } from 'src/app/_services/moto-boy.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { NgxSmartModalService, NgxSmartModalModule } from 'ngx-smart-modal';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-listar-moto-boy',
  templateUrl: './listar-moto-boy.component.html',
  styleUrls: ['./listar-moto-boy.component.css']
})
export class ListarMotoBoyComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  motoBoyForm: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<MotoBoy> = new Subject();

  listaMotoBoy: MotoBoy[] = [];
  motoBoy: MotoBoy;

  loading = false;
  submitted = false;

  titulo: string;
  public cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public placamask = [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /\d/, /[a-zA-Z0-9_.-]/,  /\d/];

  constructor(
    private motoBoyService: MotoBoyService,
    private router: Router,
    private alertService: AlertService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute) { }

  // Iniciação

  ngOnInit(): void {
    this.carregaLista();
    this.iniciaForm();
  }

  private carregaLista() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
      }
    };

    this.listar();
  }

  private listar() {
    this.motoBoyService.listar().subscribe((data: []) => {
      this.listaMotoBoy = data;
      this.dtTrigger.next();
    });
    this.motoBoyForm = new FormGroup({
      firstName: new FormControl()
    });
  }

  iniciaForm() {
    this.motoBoyForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      placa: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      nrHabilitacao: new FormControl('', Validators.required)
    });
  }

  // Exclusão

  public recuperaMotoBoy(motoBoy: MotoBoy) {
    this.motoBoy = motoBoy;
  }

  public excluirMotoBoy() {
    this.submitted = true;
    this.loading = true;

    this.motoBoyService.excluir(this.motoBoy.id).subscribe(
      () => {
        this.alertService.successModal('O MotoBoy ' + this.motoBoy.nome + ' foi excluído com sucesso !', true);
        this.ngxSmartModalService.close('myModalDelete');

        this.rerender();
        this.submitted = false;
        this.loading = false;
      }
    );
  }

  // Recriação da grid

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.ngOnInit();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  private verificaID(idMotoBoy: any) {
    // https://stackoverflow.com/questions/40589730/local-storage-in-angular-2
    const id = idMotoBoy;

    if (id !== undefined) {
      this.motoBoyService.buscarPorId(id).subscribe(data => {
        this.motoBoyForm = new FormGroup({
          id: new FormControl(data.id, Validators.required),
          nome: new FormControl(data.nome, Validators.required),
          placa: new FormControl(data.placa, Validators.required),
          cpf: new FormControl(data.cpf, Validators.required),
          nrHabilitacao: new FormControl(data.nrHabilitacao, Validators.required)
        });
        this.titulo = 'Alterar MotoBoy';
        $('#Modal').modal('toggle');
      });

    } else {
      this.titulo = 'Cadastrar MotoBoy';
      $('#Modal').modal('toggle');

    }
  }

  // Salvar ou Atualizar

  onSubmit() {
    this.submitted = true;

    if (this.motoBoyForm.invalid) {
      this.alertService.errorModal('Campos obrigatórios não preenchidos !');
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
    $('#Modal').modal('hide');
    this.alertService.successModal('MotoBoy salvo com sucesso!', true);
    this.loading = false;
    this.rerender();
    this.motoBoyForm.reset();  // Reset all form data

  }
}
