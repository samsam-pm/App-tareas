import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea, TareaService } from '../services/tarea-service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tareas: Tarea[] = [];

  constructor(private tareaService: TareaService, private router: Router) { }

  ionViewWillEnter() {
    this.cargarTareas();
    console.log('Tareas cargadas:', this.tareas);
  }

  // Cargar todas las tareas desde el servicio
  cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.tareas = this.tareaService.obtenerTareas();
    console.log('Tareas cargadas:', this.tareas); 
  }


  //Iconos de detalles
  verDetalles(id: number) {
    this.router.navigate(['/tarea-detalle', id]);
  }


  //Editar y eliminar tareas
  editarTarea(tarea: Tarea) {
    this.router.navigate(['/tarea'], { state: { tarea } });
  }

  eliminarTarea(tarea: Tarea) {
    this.tareaService.eliminarTarea(tarea);
    this.tareas = this.tareaService.obtenerTareas();
  }

}
