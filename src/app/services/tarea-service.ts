import { Injectable } from '@angular/core';

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private readonly STORAGE_KEY = 'tareas_guardadas';

  constructor() { }

  // Guardar una nueva tarea
  guardarTarea(tarea: Tarea) {
    const tareas = this.obtenerTareas();
    tareas.push(tarea);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
  }

  // Obtener todas las tareas
  obtenerTareas(): Tarea[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  //obtener tareas por id
  obtenerTareaPorId(id: number): Tarea | undefined {
    const tareas = this.obtenerTareas();
    return tareas.find(t => t.id === id);
  }

  //Agrega tareas
  agregarTarea(tarea: Tarea) {
    const tareas = this.obtenerTareas();
    tareas.push(tarea);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
  }

  actualizarTarea(tareaActualizada: Tarea) {
    const tareas = this.obtenerTareas();
    const index = tareas.findIndex(t => t.id === tareaActualizada.id);

    if (index !== -1) {
      tareas[index] = tareaActualizada;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
    }
  }

  // Eliminar una tarea
  eliminarTarea(tarea: Tarea) {
    let tareas = this.obtenerTareas();
    tareas = tareas.filter(t => t.titulo !== tarea.titulo || t.fecha !== tarea.fecha);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tareas));
  }
  
}
