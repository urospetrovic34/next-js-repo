import { IConstructorTable } from "src/types/API/constructorInterface";
import { IDriverTable } from "src/types/API/driverInterface";

export interface IMRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable?: IDriverTable;
    ConstructorTable?: IConstructorTable;
}

export interface IData {
    MRData: IMRData;
}
