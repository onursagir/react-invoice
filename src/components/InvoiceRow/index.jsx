import React from 'react';

const InvoiceRow = ({
  desc, quantity, rate, vat, onChange,
}) => (
  <tr>
    <td><input type="text" className="input" value={desc} /></td>
    <td><input type="text" className="input" value={quantity} /></td>
    <td><input type="text" className="input" value={rate} /></td>
    <td><input type="text" className="input" value={vat} /></td>
    <td className="text-right">1</td>
  </tr>
);

export default InvoiceRow;
