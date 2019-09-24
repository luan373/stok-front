import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoBoyService } from 'src/app/_services/moto-boy.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../alert/alert.service';
import { NgxSmartModalService, NgxSmartModalModule } from 'ngx-smart-modal';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-moto-boy',
  templateUrl: './moto-boy.component.html',
  styleUrls: ['./moto-boy.component.css']
})
export class MotoBoyComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {
    this.carregaLista();
    this.recuperaMotoBoyEdit();

    this.motoBoyForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      placa: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      nrHabilitacao: new FormControl('', Validators.required)
    });
  }

  private carregaLista() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order: [0, 'desc'], //<= Use this
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
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

  public addMsgSucesso(msg: string) {
    this.alertService.successModal(msg, true);
  }

  public excluirMotoBoy() {
    this.submitted = true;
    this.loading = true;

    this.motoBoyService.excluir(this.motoBoy.id).subscribe(
      () => {
        this.addMsgSucesso("MotoBoy excluído com sucesso.");
        this.ngxSmartModalService.close("myModalDelete");

        this.rerender();
        this.submitted = false;
        this.loading = false;
      }
    );
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.listar();
    });
  }

  public recuperaMotoBoy(motoBoy: MotoBoy) {
    this.motoBoy = motoBoy;
  }

  public redirecionaAlterar(idMotoBoy: any) {
    const id = idMotoBoy
    // tslint:disable-next-line: triple-equals
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe(); 
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  private recuperaMotoBoyEdit() {
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
    $("#modalMotoboy").fadeOut("normal", function () {
      $('#modalMotoboy').hide();
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    });
    this.alertService.successModal("MotoBoy salvo com sucesso!", true);
    this.loading = false;
    this.rerender();
    this.motoBoyForm.reset();  // Reset all form data

  }
}
