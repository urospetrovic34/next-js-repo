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
