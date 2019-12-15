export interface LayoutPanelOptions {
    size: number;
}

export interface LayoutOptions {
    bottom?: LayoutPanelOptions;

    bottomUnderLeft?: boolean;

    bottomUnderRight?: boolean;

    left?: LayoutPanelOptions;

    right?: LayoutPanelOptions;

    top?: LayoutPanelOptions;

    topAboveLeft?: boolean;

    topAboveRight?: boolean;
}
