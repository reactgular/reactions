import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DemoComponent} from './demo/demo.component';

const routes = [
    {
        path: '',
        component: DemoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        paramsInheritanceStrategy: 'always'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
