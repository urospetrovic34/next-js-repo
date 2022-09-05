export interface IDrivers {
    driverId: string;
    permanentNumber?: string;
    code?: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
}

export interface IDriverTable {
    driverId?: string;
    Drivers: IDrivers[];
}

export interface IMRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable: IDriverTable;
}

export default interface IDriverData {
    MRData: IMRData;
}
