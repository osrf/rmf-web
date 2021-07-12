export declare const defaultReportStyles: (
  props?: any,
) => import('@material-ui/styles').ClassNameMap<'table'>;
export interface DefaultReportQueryPayload {
  toLogDate?: Date | null;
  fromLogDate?: Date | null;
  offset?: number | null;
  limit?: number | null;
}
export interface DefaultLogTableProps {
  tableSize?: string;
  addMoreRows?(): void;
}
