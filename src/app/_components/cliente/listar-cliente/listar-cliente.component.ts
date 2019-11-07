import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/_services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/_models/cliente';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Cliente> = new Subject();

  listaCliente: Cliente[] = [];

  loading = false;
  submitted = false;

  constructor(
    private clienteSerivce: ClienteService,
    private router: Router,
    private alertService: AlertService,
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.carregaLista();
  }

  private carregaLista() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json"
      }
    };

    this.listar();
  }

  private listar() {
    this.clienteSerivce.listar().subscribe((data: []) => {
      this.listaCliente = data;
      this.dtTrigger.next();
    });
  }

  public redirecionaAlterar(id: any) {
    this.router.navigate(['/cliente', id]);
  }

}
