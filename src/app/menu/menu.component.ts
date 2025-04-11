import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, ButtonModule, MenubarModule, InputIconModule, IconFieldModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  nestedMenuItems: any[] = [ // Déclarez nestedMenuItems ici
    {
      label: 'Accueil',
      icon: 'pi pi-fw pi-home',
      routerLink: '/'
    },
    {
      label: 'Champions',
      icon: 'pi pi-fw pi-star',
      routerLink: '/champions'
    }
  ];

}
