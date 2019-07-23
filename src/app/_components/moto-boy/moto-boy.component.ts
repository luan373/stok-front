import { Component, OnInit, OnDestroy } from '@angular/core';
import { MotoBoy } from 'src/app/_models/motoBoy';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-moto-boy',
  templateUrl: './moto-boy.component.html',
  styleUrls: ['./moto-boy.component.css']
})
export class MotoBoyComponent implements OnInit, OnDestroy {

  titulo: string;
  motoBoy: MotoBoy;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.recuperaMotoBoy();
    this.recuperaTitulo();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('motoBoy');
  }

  private recuperaMotoBoy() {
    //https://stackoverflow.com/questions/40589730/local-storage-in-angular-2
    this.motoBoy = JSON.parse(localStorage.getItem('motoBoy'));
  }

  private recuperaTitulo() {
    if (this.motoBoy == null) {
      this.titulo = "Cadastrar MotoBoy";
    } else {
      this.titulo = "Alterar MotoBoy";
    }
  }

}
