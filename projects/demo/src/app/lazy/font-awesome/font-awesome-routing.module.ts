import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OutletFontAwesomeComponent} from './outlet-font-awesome/outlet-font-awesome.component';

const routes: Routes = [
    {
        path: '',
        component: OutletFontAwesomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FontAwesomeRoutingModule {
}
