import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea, TareaService } from 'src/app/services/tarea-service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
  standalone: false,
})
export class TareaPage implements OnInit {

  tarea!: Tarea;
  esEdicion = false;
  errores = {
    titulo: '',
    descripcion: '',
    fecha: ''
  };

  constructor(
    private tareaService: TareaService,
    private router: Router,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    // Verifica si viene con ID en la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { tarea?: Tarea };

    if (state?.tarea) {
      // Modo edición (desde Home)
      this.tarea = { ...state.tarea };
      this.esEdicion = true;
    } else if (id) {
      // Modo edición (desde /tarea/:id)
      const tareaEncontrada = this.tareaService.obtenerTareaPorId(id);
      if (tareaEncontrada) {
        this.tarea = { ...tareaEncontrada };
        this.esEdicion = true;
      }
    }

    // Si no hay tarea, crear nueva
    if (!this.tarea) {
      this.tarea = { id: 0, titulo: '', descripcion: '', fecha: '' };
      this.esEdicion = false;
    }

    // Aseguramos formato ISO correcto para ion-datetime
    if (this.tarea.fecha) {
      const fecha = new Date(this.tarea.fecha);
      this.tarea.fecha = fecha.toISOString().split('T')[0];
    }
  }

  /////////////////////

  //  Guarda la tarea con validación
  async guardarTarea() {
    if (!this.validarCampos()) {
      await this.mostrarAlerta('Completa todos los campos correctamente.');
      return;
    }

    if (this.esEdicion) {
      // Editar tarea existente
      this.tareaService.actualizarTarea(this.tarea);
      await this.mostrarAlerta('Tarea actualizada correctamente ✅');
    } else {
      //  Crear nueva tarea
      this.tarea.id = Date.now();
      this.tareaService.agregarTarea(this.tarea);
      await this.mostrarAlerta('Tarea creada correctamente ✅');
    }
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }


  // Validación de campos
  validarCampos(): boolean {
    let valido = true;
    const hoy = new Date();
    const fechaIngresada = new Date(this.tarea.fecha);

    // Reset errores
    this.errores = { titulo: '', descripcion: '', fecha: '' };

    if (!this.tarea.titulo.trim()) {
      this.errores.titulo = 'El título no puede estar vacío';
      valido = false;
    }

    if (!this.tarea.descripcion.trim()) {
      this.errores.descripcion = 'La descripción no puede estar vacía';
      valido = false;
    }

    if (!this.tarea.fecha) {
      this.errores.fecha = 'Debes ingresar una fecha';
      valido = false;
    } else if (fechaIngresada < hoy) {
      this.errores.fecha = 'La fecha debe ser futura';
      valido = false;
    }

    return valido;
  }

  //  Cancelar y regresar
  cancelar() {
    this.router.navigate(['/home']);
  }

  // Alerta de éxito
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

}
