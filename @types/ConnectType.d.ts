export interface ConnectType {
    chain:  number;
    account: number;
    active: boolean;
    activate: () => void;
    deactivate: () => void;
}