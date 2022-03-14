import React from 'react';
export interface IDropdownType {
    items: IDropdownItemType[];
    registrationDropdownID: number;
    code: string;
    step: number;
    propertyName: string;
    translationCode: string;
    isBoolean: boolean;
    isCountryType: boolean;
}
export interface IDropdownItemType {
    registrationDropdownItemID: number;
    registrationDropdownID: number;
    value: number;
    translationCode: string;
    isHighRisk: boolean;
}

const DropdownTypeContext = React.createContext<IDropdownType[]>([]);

export default DropdownTypeContext;
