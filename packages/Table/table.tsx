/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */
import React, { CSSProperties } from 'react';
import './style.scss';
import classNames from 'classnames';
import { Empty } from "..";

export type TableProps = {
  headStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  className?: string;
  border?: boolean;
  columns: Array<any>;
  dataSource: Array<any>;
  size?: 'large' | 'middle' | 'small';
};
export default function Table(props: TableProps): JSX.Element {
  const { headStyle, bodyStyle, className, border, columns, dataSource, size } = props;
  const tableClass = classNames({
    'fx_table_inner': true,
    [className || '']: !!className,
  });
  const theadTrClass = classNames({
    'fx_table_thead_th': true,
    'fx_table_thead_th_boder': border,
    [`fx_table_thead_th_size_${size}`]: size,
  })
  const tbodyTrClass = classNames({
    'fx_table_tbody_td': true,
    'fx_table_tbody_td_boder': border,
    [`fx_table_tbody_td_size_${size}`]: size,
  })
  return (
    <div className={tableClass}>
      <table className="fx_table_content">
        {/** 表格头部 */}
        <thead className="fx_table_thead">
          <tr className="fx_table_thead_tr">
            {
              columns && columns.length ? columns.map((item: any, index: number) => {
                const thStyle = {
                  ...item.style,
                  ...headStyle,
                  textAlign: item.align ? item.align : '',
                }
                return (
                  <th className={theadTrClass} key={item.field + index} style={thStyle}>{item.title}</th>
                )
              }) : null
            }
          </tr>
        </thead>
         {/** 表格body */}
        <tbody className="fx_table_tbody">
          {
            dataSource && dataSource.length ? dataSource.map((item: any, index: number) => (
              <tr className="fx_table_tbody_tr" key={index + Math.random()}>
                {
                  columns && columns.length ? columns.map((column: any, i: number) => {
                    const tdStyle = {
                      ...bodyStyle,
                      width: column.width ? `${column.width}px` : '',
                      textAlign: column.align ? column.align : '',
                    }
                    const tdContent = column.render ? column.render(item) : (item[column.field] !== undefined ? item[column.field] : '')
                    return (
                      <td
                        className={[tbodyTrClass, column.ellipsis ? 'fx_table_tbody_td_ellipsis' : ''].join(' ')}
                        key={index + i}
                        style={tdStyle}
                        title={column.ellipsis ? item[column.field] : ''}
                      >
                        <div style={tdStyle}>{tdContent}</div>
                      </td>
                    )
                  }) : null
                }
              </tr>
            )) : (
              <tr className="noTableData">
                <td>
                  <Empty />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
Table.defaultProps = {
  headStyle: '',
  bodyStyle: '',
  className: '',
  border: false,
  size: 'large',
};
