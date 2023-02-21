import { PlantingPlace } from './planting-place';
import { Seedling } from './seedling';

export class PlantingPlaceStateModel {
    plantingPlaces!: PlantingPlace[];
    creating!: boolean;
    loading!: boolean;
}