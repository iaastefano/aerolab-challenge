export interface GridFilter {
  key: string;
  value: string;
}

export interface GridRequestParams {
  pageIndex: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: string;
  query?: string;
  filters?: GridFilter[];
  id?: string;
}

export interface CustomAction {
  disabled?: (row: any) => boolean;
  icon: string;
  tooltipText: string;
  showCallback?: (row: any) => boolean;
  popover?: {
    text: string;
  };
  actionCallback: (cell: any, row?: any, refetch?: any) => void;
  variableIcon?: (row: any) => string;
  variableTooltipText?: (row: any) => string;
  variablePopover?: (
    row: any
  ) => {
    text: string;
  };
}
