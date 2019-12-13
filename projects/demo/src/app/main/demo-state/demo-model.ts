import {DemoCard} from './demo-card';

export interface DemoModel {
    [id:number]: DemoCard;
    index: number[];
}
