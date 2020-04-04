export interface Theme {

    palette: Palette

}

export interface Palette {

    primaryColor: string,
    secondaryColor: string,
    backgroundColor: string
    transparent?: string | "#00000000",

    primaryTextColor?: string
    secondaryTextColor?: string
    descriptionTextColor?: string

    primaryButtonBackgroundColor?: string
    primaryButtonTextColor?: string

    secondaryButtonBackgroundColor?: string
    secondaryButtonTextColor?: string

    textButtonColor?: string
}

export interface AppTheme extends Theme {

}