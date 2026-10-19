import { Component } from '@angular/core';
import { RegisterCandidat } from './auth/register-candidat';

@Component({
  selector: 'app-root',
  imports: [RegisterCandidat],
  template: `<app-register-candidat />`,
})
export class App {}