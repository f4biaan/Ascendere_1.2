import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivityService } from '../../../../core/services/user-activity.service';
import { AuthService } from '../../../../core/services/auth.service';
import { DailyGoalService } from '../../../../core/services/daily-goal.service';
import { User } from '../../../../core/interfaces/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProgressComponent implements OnInit, OnDestroy {
  user: User | null = null;
  dailyGoal: number = 0;
  retention: number = 50;
  courseProgress: number = 90;
  metaDiaria: number = 0; // Meta diaria en segundos
  tiempoActivo: number = 0; // Tiempo activo en segundos
  porcentajeProgreso: number = 0; // Porcentaje de progreso de la meta diaria
  intervalo: any;

  // Variable para controlar el intervalo de actualización (10 minutos en milisegundos)
  tiempoActualizacion: number = 10 * 60 * 1000; // 5 minutos
  ultimoTiempoActualizacion: number = 0; // Última vez que se actualizó

  constructor(
    private _authActivity: AuthService,
    private _dailyGoalService: DailyGoalService
  ) {}

  ngOnInit() {
    // localStorage.setItem('tiempoTranscurrido', '3550'); // Inicializar el tiempo transcurrido
    // Obtener la meta diaria del almacenamiento local
    this.tiempoActivo = parseInt(
      localStorage.getItem('tiempoTranscurrido') || '0',
      10
    );
    this._authActivity.getCurrentUser().subscribe((user) => {
      this.user = user;
      const storedMetaStorage = localStorage.getItem('metaDiaria');
      const storedMeta = user?.dailyGoal;
      if (!storedMetaStorage || storedMetaStorage !== storedMeta?.toString()) {
        localStorage.setItem('metaDiaria', storedMeta?.toString()!);
      }
      if (storedMeta) {
        this.metaDiaria = storedMeta * 60; // Convertir minutos a segundos
        if (this.tiempoActivo > this.metaDiaria) {
          this.tiempoActivo = this.metaDiaria; // Limitar al valor de la meta diaria
          this.porcentajeProgreso = (this.tiempoActivo / this.metaDiaria) * 100;
          this.actualizarBarraTiempo();
        } else if (this.tiempoActivo < this.metaDiaria) {
          this.iniciarContador(); // Iniciar el contador de tiempo activo
        }
      } else {
        console.error('No se pudo obtener la meta diaria');
      }

      this._dailyGoalService
        .getCurrentEntry(user?.id!, user?.lastEntry!)
        .subscribe((entry) => {
          console.log('Current entry:', entry);
          if (!entry.hasReachedDailyGoal) {
            if (this.tiempoActivo >= this.metaDiaria) {
              this._dailyGoalService.updateDailyGoalState(
                user?.id!,
                true,
                user?.lastEntry!
              );
            }
          }
        });
    });

    /* if (storedMeta) {
      this.metaDiaria = parseInt(storedMeta, 10) * 60; // Convertir minutos a segundos
      this.iniciarContador(); // Iniciar el contador de tiempo activo
    } */

    setTimeout(() => {
      // Asegura que el DOM esté completamente cargado
      this.setProgressValues();
    }, 0); // Ejecuta después de que Angular haya completado el ciclo de detección de cambios
  }

  setProgressValues() {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach((circle: any, index: number) => {
      let value = 0;
      switch (index) {
        case 0:
          value = this.dailyGoal;
          break;
        case 1:
          value = this.retention;
          break;
        case 2:
          value = this.courseProgress;
          break;
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
      if (this.tiempoActivo >= this.metaDiaria) {
        // clearInterval(this.intervalo);
        // console.log('Meta diaria alcanzada');
        return;
      } else {
        if (document.visibilityState === 'visible') {
          this.tiempoActivo++;
          // console.log('Tiempo activo:', this.tiempoActivo);
          // now print as a time format minutes ans seconds 02:12
          /* console.log(
              'Tiempo activo en formato HH:MM:SS:',
              new Date(this.tiempoActivo * 1000).toISOString().substr(11, 8)
              ); */
          this.actualizarProgreso();
          localStorage.setItem(
            'tiempoTranscurrido',
            this.tiempoActivo.toString()
          );

          // Comprobar si han pasado 5 minutos para actualizar en Firebase
          /* const tiempoActual = Date.now();
        if (
          tiempoActual - this.ultimoTiempoActualizacion >=
          this.tiempoActualizacion
          ) {
            this._dailyGoalService.updateUserProgress(
              this.user?.id!,
              this.tiempoActivo
          );
          this.ultimoTiempoActualizacion = tiempoActual; // Actualizar el tiempo de última actualización
          } */
          //  FIXME: persistant data to save for each 5 o 10 minutes on firebase
        }
        if (this.tiempoActivo >= this.metaDiaria) {
          this._dailyGoalService
            .getCurrentEntry(this.user?.id!, this.user?.lastEntry!)
            .subscribe((entry) => {
              // console.log('Current entry:', entry);
              this._dailyGoalService.updateDailyGoalState(
                this.user?.id!,
                true,
                this.user?.lastEntry!
              );
            });
        }
      }
    }, 1000); // Actualizar cada segundo
  }

  actualizarProgreso(): void {
    if (this.metaDiaria > 0) {
      this.porcentajeProgreso = (this.tiempoActivo / this.metaDiaria) * 100;
      if (this.porcentajeProgreso >= 100) {
        this.porcentajeProgreso = 100; // Limitar al 100%
      }
      this.actualizarBarraTiempo();
      // this.
    }
  }

  actualizarBarraTiempo(): void {
    const circle = document.querySelector(
      '.progress-circle .circle.red'
    ) as HTMLElement;
    if (circle) {
      circle.style.strokeDasharray = `${this.porcentajeProgreso}, 100`;
    }
    const percentageText = document.querySelector(
      '.progress-circle .percentage'
    ) as HTMLElement;
    if (percentageText) {
      percentageText.innerHTML = `${this.porcentajeProgreso.toFixed(0)}%`;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpiar el intervalo al destruir el componente
  }
}
