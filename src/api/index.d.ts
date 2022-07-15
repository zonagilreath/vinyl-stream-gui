declare const api: typeof import(".").default;

export interface IElectronAPI {
    streamIt: () => Promise<void>,
    playIt: () => Promise<void>,
    killIt: () => void,
}

declare global {
    interface Window {
        api: IElectronAPI
    }
}