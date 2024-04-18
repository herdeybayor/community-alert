import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonButton, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonImg, IonButton, RouterLink],
})
export class IntroPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
