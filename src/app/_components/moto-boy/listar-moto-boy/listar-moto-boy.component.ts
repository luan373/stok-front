import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoBoyService } from 'src/app/_services/moto-boy.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
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

  constructor(
    private motoBoyService: MotoBoyService,
    private router: Router,
    private alertService: AlertService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carregaLista();
  }

  private carregaLista() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        lengthMenu: "_MENU_ resultados por página",
        loadingRecords: "Carregando...",
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        search: "Pesquisar",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente"
        }
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
    this.alertService.success(msg, true);
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
    this.router.navigate(['/motoBoy', idMotoBoy]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
