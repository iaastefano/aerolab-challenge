import React from 'react';
import { IDropdownType } from '../../no-state/merchantDocuments/models';

const DropdownTypeContext = React.createContext<IDropdownType[]>([]);

export default DropdownTypeContext;
