import { Column, EditCellColumnDef } from 'material-table';
import React from 'react';
export interface CustomLookupFilterParserProps {
  columnDef: Column<{
    level: string;
    message: string;
    created: string;
    container_name: string;
  }>;
  onFilterChanged: (rowId: string, value: string | number | unknown) => void;
}
/**
 * Component created to override the default lookup filter.
 */
export declare const CustomLookupFilterParser: (
  props: CustomLookupFilterParserProps,
) => React.ReactElement;
export interface CustomLookupFilterProps {
  tableId: number;
  filterValue: EditCellColumnDef['tableData']['filterValue'];
  filterOnItemSelect: unknown;
  onFilterChanged: (rowId: string, value: string | number | unknown) => void;
  lookup: Record<string, string>;
}
export declare const CustomLookupFilter: (props: CustomLookupFilterProps) => React.ReactElement;
