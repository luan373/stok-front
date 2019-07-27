import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoBoyService } from 'src/app/_services/moto-boy.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-listar-moto-boy',
  templateUrl: './listar-moto-boy.component.html', 
  styleUrls: ['./listar-moto-boy.component.css']
})
export class ListarMotoBoyComponent implements OnInit, OnDestroy {
  motoBoyForm: FormGroup;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<MotoBoy> = new Subject();

  listaMotoBoy: MotoBoy[] = [];

  constructor(
    private motoBoyService: MotoBoyService,
    private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.motoBoyService.listar().subscribe((data: []) => {
      this.listaMotoBoy = data;

      this.dtTrigger.next();
    });
    this.motoBoyForm = new FormGroup({
      firstName: new FormControl()
    });

  }

  public redirecionaAlterar(idMotoBoy: any) {
    this.router.navigate(['/motoBoy', idMotoBoy]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
