import { Seedling } from './seedling';
import { User } from './user'

export class SeedlingStateModel {
    seedlings!: Seedling[];
    creating!: boolean;
    loading!: boolean;
}