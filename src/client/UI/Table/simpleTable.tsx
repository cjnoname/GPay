import * as React from 'react';
import { List, Record } from 'immutable';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from './';

interface Props<T> {
  name: string,
  headers: string[],
  list?: List<Record<T>>
}

const SimpleTable = <T extends {}>(props: Props<T>) => {
  const { name, headers, list } = props;
  return (
    list ?
      (
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => <TableCell key={`${header}`}>{header}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(item => {
              const values = item.toSeq().valueSeq();
              return (
                <TableRow key={`${name}${list.indexOf(item)}`}>
                  {values.map((value: any) => {
                    return (<TableCell key={`${name}${list.indexOf(item)}${values.indexOf(value)}`}>{value}</TableCell>);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )
      :
      (
        <>
          No Record
        </>
      )
  );
};

export default SimpleTable;
