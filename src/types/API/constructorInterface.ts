export interface IConstructors {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
}

export interface IConstructorTable {
    driverId?: string;
    constructorId?: string;
    Constructors: IConstructors[];
}
