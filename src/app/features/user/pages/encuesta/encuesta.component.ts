import { Component } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  respuestas: number[] = [];

  setRespuesta(pregunta: number, valor: number) {
    this.respuestas[pregunta - 1] = valor;
  }

  submitEncuesta() {
    // Aquí puedes manejar el envío de los resultados de la encuesta, por ejemplo, enviándolos a un backend
    console.log('Respuestas de la encuesta:', this.respuestas);
    alert('¡Gracias por completar la encuesta!');
  }
}
