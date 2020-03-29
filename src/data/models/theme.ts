export interface Theme {
    primaryColor : string,
    secondaryColor: string,
    backgroundColor : string
    transparent? : string | "#00000000"
}

export interface ComponentStyle {
    backgroundColor? : string
    width? : string
    height? :string
    margin? : string
    padding? : string
}

export interface AppTheme extends Theme {
    primaryTextColor? : string
}