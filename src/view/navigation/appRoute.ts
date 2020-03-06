import React from "react";

export interface AppRoute {
    key: string
    path: string
    component: React.FC
}
