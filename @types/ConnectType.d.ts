export interface ConnectType {
    chain:  number | null | undefined;
    acc: string | null | undefined ;
    active: boolean | null | undefined;
    activate: any;
    deactivate: any;
}
//() => Promise<void | null | undefined | boolean| any>