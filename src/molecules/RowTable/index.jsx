import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@atoms';
import NumberFormat from 'react-number-format';
import Decimal from 'decimal.js';
import shortId from 'shortid';
import { noBorder } from './style.module.scss';

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
  const [vat, setVat] = useState({ 21: 21 });
  const [rows, setRows] = useState([initialRow]);
  const [total, setTotal] = useState(121);
  const [subtotal, setSubtotal] = useState(100);

  const onColumnChange = (id, field, value) => {
    const values = rows.reduce((acc, r) => {
      const row = { ...r };

      if (row.id === id) {
        row[field] = value;
      }

      const invoiceVat = new Decimal(acc.vat[row.vat] || 0);
      const invoiceTotal = new Decimal(acc.total || 0);
      const invoiceSubtotal = new Decimal(acc.subtotal || 0);

      const rowVat = new Decimal(row.vat || 0);
      const rowPrice = new Decimal(row.price || 0);
      const rowQuantity = new Decimal(row.quantity || 0);
      const rowTotal = rowQuantity.times(rowPrice).times(rowVat.dividedBy(100).add(1));

      return {
        vat: {
          ...acc.vat,
          [row.vat]: invoiceVat
            .add(rowPrice.times(row.quantity).times(rowVat.dividedBy(100)))
            .toDP(2)
            .toFixed(2),
        },
        rows: [...acc.rows, { ...row, total: rowTotal.toDP(2).toFixed(2) }],
        total: invoiceTotal.add(rowTotal).toDP(2).toFixed(2),
        subtotal: invoiceSubtotal.add(rowPrice.times(rowQuantity)).toDP(2).toFixed(2),
      };
    }, {
      vat: {}, rows: [], total: 0, subtotal: 0,
    });

    // console.key(values);
    setVat(values.vat);
    setRows(values.rows);
    setTotal(values.total);
    setSubtotal(values.subtotal);
  };


  const onAddClick = () => {
    setRows([...rows, { ...initialRow, id: shortId.generate() }]);
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
        <tr className="d-print-none">
          <td colSpan="5">
            <button
              type="button"
              onClick={onAddClick}
              className="btn btn-dark float-right"
            >
            Nieuwe regel
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3" className={noBorder} />
          <td>
            Subtotaal
          </td>
          <td>
            €
            {subtotal}
          </td>
        </tr>
        {Object.keys(vat).map(vatRate => (
          <tr key={shortId.generate()}>
            <td colSpan="3" className={noBorder} />
            <td>
              {vatRate}
              %
            </td>
            <td>
              €
              {vat[vatRate]}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" className={noBorder} />
          <td>
            Totaal
          </td>
          <td>
            €
            {total}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};


export default RowTable;
