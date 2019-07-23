import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListarMotoBoyService } from 'src/app/_services/listar-moto-boy.service';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-moto-boy',
  templateUrl: './listar-moto-boy.component.html',
  styleUrls: ['./listar-moto-boy.component.css']
})
export class ListarMotoBoyComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<MotoBoy> = new Subject();

  listaMotoBoy: MotoBoy[] = [];

  constructor(
    private listarMotoBoyService: ListarMotoBoyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.listarMotoBoyService.lista().subscribe((data: []) => {
      this.listaMotoBoy = data;

      this.dtTrigger.next();
    });

  }

  public redirecionaAlterar(motoBoy: MotoBoy) {
    console.log(motoBoy)
    localStorage.setItem('motoBoy', JSON.stringify(motoBoy));
    this.router.navigate(['/motoBoy']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    localStorage.removeItem('motoBoy');
  }

}
