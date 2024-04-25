import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string,
  icon: string,
  url: string
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuReactive: MenuItem[] = [
    { label: 'Basicos', icon: 'label', url: './reactive/basic' },
    { label: 'Dinamicos', icon: 'add', url: './reactive/dynamic' },
    { label: 'Switches', icon: 'search', url: './reactive/switches' },
    { label: 'Selectores', icon: 'search', url: './reactive/selectors' },
  ];
  public menuAuth: MenuItem[] = [
    { label: 'Registro', icon: 'label', url: './auth' },
  ]
}
