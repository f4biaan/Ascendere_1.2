import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
  standalone: true,
})
export class ProgressComponent implements OnInit {
  dailyGoal: number = 75; 
  retention: number = 50;  
  courseProgress: number = 90; 
  

  ngOnInit() {
    this.setProgressValues();
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
      const offset = 100 - value;
      circle.querySelector('.circle').style.strokeDasharray = `${value}, 100`;
      circle.querySelector('.percentage').innerHTML = `${value}%`;
    });
  }
}
