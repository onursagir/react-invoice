import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@atoms';
import NumberFormat from 'react-number-format';
import Decimal from 'decimal.js';

const InvoiceRow = ({
  id, quantity, desc, price, vat, total, onChange,
}) => (
  <tr>
    <td><Input value={desc} onChange={({ target }) => onChange(id, 'desc', target.value)} /></td>
    <td><Input type={NumberFormat} value={quantity} onValueChange={({ floatValue }) => onChange(id, 'quantity', floatValue)} /></td>
    <td><Input type={NumberFormat} value={price} onValueChange={({ floatValue }) => onChange(id, 'price', floatValue)} prefix="€" /></td>
    <td><Input type={NumberFormat} value={vat} onValueChange={({ floatValue }) => onChange(id, 'vat', floatValue)} suffix="%" /></td>
    <td>
      €
      {total}
    </td>
  </tr>
);

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

InvoiceRow.propTypes = {
  id: PropTypes.string.isRequired,
  vat: stringOrNumber,
  desc: PropTypes.string,
  total: stringOrNumber,
  price: stringOrNumber,
  onChange: PropTypes.func.isRequired,
  quantity: PropTypes.number,
};

InvoiceRow.defaultProps = {
  vat: null,
  desc: '',
  price: null,
  total: null,
  quantity: null,
};

const initialRow = {
  id: '9sVOGT_bO',
  vat: 21,
  desc: 'Product',
  total: 121,
  price: 100,
  quantity: 1,
};

const RowTable = () => {
  const [rows, setRows] = useState([initialRow]);

  const onColumnChange = (id, field, value) => {
    const values = rows.reduce((acc, r) => {
      const row = { ...r };

      if (row.id === id) {
        row[field] = value;
      }

      const vat = new Decimal(acc.vat[row.vat] || 0);
      const total = new Decimal(acc.total || 0);
      const subtotal = new Decimal(acc.subtotal || 0);

      const rowVat = new Decimal(row.vat);
      const rowPrice = new Decimal(row.price);
      const rowQuantity = new Decimal(row.quantity);
      const rowTotal = rowQuantity.times(rowPrice).times(rowVat.dividedBy(100).add(1));

      return {
        vat: {
          ...acc.vat,
          [row.vat]: vat
            .add(rowPrice.times(row.quantity).times(rowVat.dividedBy(100)))
            .toDP(2)
            .toFixed(2),
        },
        rows: [...acc.rows, { ...row, total: rowTotal.toDP(2).toFixed(2) }],
        total: total.add(rowTotal).toDP(2).toFixed(2),
        subtotal: subtotal.add(rowPrice.times(rowQuantity)).toDP(2).toFixed(2),
      };
    }, {
      vat: {}, rows: [], total: 0, subtotal: 0,
    });

    setRows(values.rows);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Beschrijving</th>
          <th>Aantal</th>
          <th>Prijs (exc. BTW)</th>
          <th>BTW</th>
          <th>Totaal (inc. BTW)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <InvoiceRow
            key={row.id}
            onChange={onColumnChange}
            {...row}
          />
        ))}
      </tbody>
    </table>
  );
};


export default RowTable;
