export interface Theme {
    primaryColor : string,
    secondaryColor: string,
    backgroundColor : string
}

export interface ComponentStyle {
    backgroundColor? : string
    width? : string
    height? :string
    margin? : string
    padding? : string
}

export interface AppTheme extends Theme {

}