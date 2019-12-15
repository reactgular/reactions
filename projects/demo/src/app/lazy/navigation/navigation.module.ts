import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {NavigationRoutingModule} from './navigation-routing.module';
import { OutletNavigationComponent } from './outlet-navigation/outlet-navigation.component';

@NgModule({
    declarations: [OutletNavigationComponent],
    imports: [
        CommonModule,
        NavigationRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class NavigationModule {
}
