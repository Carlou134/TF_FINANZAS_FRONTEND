import { Component, OnInit } from '@angular/core';
import moment from 'moment'; // Cambia el import de moment
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Cartera } from '../../../models/Cartera';
import { CarteraService } from '../../../service/cartera.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-cartera-crea-edita',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  templateUrl: './cartera-crea-edita.component.html',
  styleUrl: './cartera-crea-edita.component.css'
})

export class CarteraCreaEditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cartera: Cartera = new Cartera();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  minFecha: Date = moment().add(1, 'days').toDate();

  constructor(
    private cS: CarteraService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      id: ['',],
      nombre_cartera: ['', Validators.required],
      fecha_descuento: [null, Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.cartera.id = this.form.value.id;
      this.cartera.nombre_cartera = this.form.value.nombre_cartera;
      this.cartera.fecha_descuento = this.form.value.fecha_descuento;
      if (this.edicion) {
        this.cS.update(this.cartera).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.cartera).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['/components/cartera']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre_cartera: new FormControl(data.nombre_cartera),
          fecha_descuento: new FormControl(data.fecha_descuento),
        });
      });
    }
  }
}