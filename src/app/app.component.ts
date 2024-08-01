import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Ascendere1.2';

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore
      .collection('courses')
      .snapshotChanges()
      .subscribe(
        (data) => {
          console.log('Successfully connected to Firebase Firestore:', data);
        },
        (error) => {
          console.error('Error connecting to Firebase Firestore:', error);
        }
      );
  }
}
