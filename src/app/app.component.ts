import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FirebaseAuthenticationService } from '@app/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private readonly firebaseAuthenticationService: FirebaseAuthenticationService
  ) {
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    await this.firebaseAuthenticationService.initialize();
  }
}
