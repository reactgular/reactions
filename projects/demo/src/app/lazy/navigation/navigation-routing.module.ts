import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutletNavigationComponent} from './outlet-navigation/outlet-navigation.component';

const routes: Routes = [
    {
        path: '',
        component: OutletNavigationComponent,
        children: [
            {
                path: 'font-awesome',
                loadChildren: () => import('../font-awesome/font-awesome.module').then(m => m.FontAwesomeModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavigationRoutingModule {
}
