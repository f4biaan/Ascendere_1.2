import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProgressComponent implements OnInit, OnDestroy {
  dailyGoal: number = 75; 
  retention: number = 50;  
  courseProgress: number = 90; 
  metaDiaria: number = 0; // Meta diaria en segundos
  tiempoActivo: number = 0; // Tiempo activo en segundos
  porcentajeProgreso: number = 0; // Porcentaje de progreso de la meta diaria
  intervalo: any;

  ngOnInit() {
    const storedMeta = localStorage.getItem('metaDiaria');
    if (storedMeta) {
      this.metaDiaria = parseInt(storedMeta, 10) * 60; // Convertir minutos a segundos
      this.iniciarContador(); // Iniciar el contador de tiempo activo
    }

    setTimeout(() => { // Asegura que el DOM esté completamente cargado
      this.setProgressValues();
    }, 0); // Ejecuta después de que Angular haya completado el ciclo de detección de cambios
  }

  setProgressValues() {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach((circle: any, index: number) => {
      let value = 0;
      switch (index) {
        case 0: value = this.dailyGoal; break;
        case 1: value = this.retention; break;
        case 2: value = this.courseProgress; break;
      }

      const circleElement = circle.querySelector('.circle');
      const percentageElement = circle.querySelector('.percentage');

      if (circleElement) {
        circleElement.style.strokeDasharray = `${value}, 100`;
      }

      if (percentageElement) {
        percentageElement.innerHTML = `${value}%`;
      }
    });
  }

  iniciarContador(): void {
    this.intervalo = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.tiempoActivo++;
        this.actualizarProgreso();
      }
    }, 1000); // Actualizar cada segundo
  }

  actualizarProgreso(): void {
    if (this.metaDiaria > 0) {
      this.porcentajeProgreso = (this.tiempoActivo / this.metaDiaria) * 100;
      if (this.porcentajeProgreso > 100) {
        this.porcentajeProgreso = 100; // Limitar al 100%
      }
      this.actualizarBarraTiempo();
    }
  }

  actualizarBarraTiempo(): void {
    const circle = document.querySelector('.progress-circle .circle.red') as HTMLElement;
    if (circle) {
      circle.style.strokeDasharray = `${this.porcentajeProgreso}, 100`;
    }
    const percentageText = document.querySelector('.progress-circle .percentage') as HTMLElement;
    if (percentageText) {
      percentageText.innerHTML = `${this.porcentajeProgreso.toFixed(0)}%`;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpiar el intervalo al destruir el componente
  }
}
