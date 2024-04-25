import { Routes } from '@angular/router';
import { BasicPageComponent } from './reactive/pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './reactive/pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './reactive/pages/switches-page/switches-page.component';
import { RegisterpageComponent } from './auth/pages/registerpage/registerpage.component';
import { SelectorPageComponent } from './reactive/pages/countries/selector-page/selector-page.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./auth/layout-page.component'),
        children:[
            { path: 'sign', component: RegisterpageComponent },
            { path: '**', redirectTo: 'sign' },
        ]
    },
    {
        path: 'reactive',
        loadComponent: () => import('./reactive/layout-page.component'),
        children: [
            { path: 'basic', component: BasicPageComponent },
            { path: 'dynamic', component: DynamicPageComponent },
            { path: 'switches', component: SwitchesPageComponent },
            { path: 'selectors', component: SelectorPageComponent },
            { path: '**', redirectTo: 'basic' },
        ]
    },
    {
        path: '**',
        redirectTo: 'reactive'
    },

];
