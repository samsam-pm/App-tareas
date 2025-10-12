import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Tarea, TareaService } from 'src/app/services/tarea-service';

@Component({
  selector: 'app-tarea-detalles',
  templateUrl: './tarea-detalles.page.html',
  styleUrls: ['./tarea-detalles.page.scss'],
  standalone: false,
})
export class TareaDetallesPage implements OnInit {
  tarea!: Tarea;
  modoEdicion = false; // controla si los campos están habilitados o no

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const tareas = this.tareaService.obtenerTareas();
    const tareaEncontrada = tareas.find(t => t.id === id);

    if (tareaEncontrada) {
      this.tarea = { ...tareaEncontrada };
      if (this.tarea.fecha) {
        const fecha = new Date(this.tarea.fecha);
        this.tarea.fecha = fecha.toISOString().split('T')[0];
      }
    } else {
      // Si no se encuentra la tarea, redirige a home
      this.router.navigate(['/home']);
    }
  }

  async guardarCambios() {
    const tareas = this.tareaService.obtenerTareas();
    const index = tareas.findIndex(t => t.id === this.tarea.id);
    if (index !== -1) {
      const fechaISO = new Date(this.tarea.fecha).toISOString();
      tareas[index] = this.tarea; // actualiza los datos
      localStorage.setItem('tareas_guardadas', JSON.stringify(tareas));
    }
    this.modoEdicion = false;

    // Mostrar alerta de éxito
    const alert = await this.alertController.create({
      header: '✅ Éxito',
      message: 'Los cambios se guardaron exitosamente.',
      buttons: ['OK'],
    });

    await alert.present();

    //  Redirigir al home después de cerrar el alert
    await alert.onDidDismiss();
    this.router.navigate(['/home']);

  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  regresar() {
    this.router.navigate(['/home']);
  }


}
