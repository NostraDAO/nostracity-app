export interface ConnectType {
    chain:  number | null | undefined;
    account: number | null | undefined | string;
    active: boolean | null | undefined;
    activate: any;
    deactivate: any;
}
//() => Promise<void | null | undefined | boolean| any>