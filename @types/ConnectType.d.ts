export interface ConnectType {
    chain:  number | null | undefined;
    account: string;
    active: boolean | null | undefined;
    activate: any;
    deactivate: any;
}
//() => Promise<void | null | undefined | boolean| any>