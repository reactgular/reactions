export interface LayoutPanelOptions {
    size: number;
}

export interface LayoutOptions {
    bottom?: LayoutPanelOptions;

    bottomUnderLeft?: boolean;

    bottomUnderRight?: boolean;

    horizontal?: boolean | 'both';

    left?: LayoutPanelOptions;

    right?: LayoutPanelOptions;

    scrollable?: boolean;

    top?: LayoutPanelOptions;

    topAboveLeft?: boolean;

    topAboveRight?: boolean;
}
