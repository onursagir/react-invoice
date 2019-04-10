import React, { useState } from 'react';
import Textarea from 'react-textarea-autosize';
import InvoiceRow from '../InvoiceRow';
import { invoiceCreator, creatorBody } from './style.module.scss';

const Invoice = () => {
  const [rows, setRows] = useState([{
    desc: 'Product', quantity: 1, rate: 1, vat: 21,
  }]);
  const [sender, setSender] = useState(`Mijn bedrijf.${'\n'}Mijn adres 123${'\n'}1234AB Rotterdam`);
  const [companyName, setCompanyName] = useState(`Mijn${'\n'}Bedrijf.`);

  return (
    <div className="container">
      <div className={invoiceCreator}>
        <div className={creatorBody}>
          <div className="row">
            <div className="col-6">
              <Textarea
                className="input input-company mb-5"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />

              <Textarea
                value={sender}
                onChange={e => setSender(e.target.value)}
                className="input input-address"
              />
            </div>
            <div className="offset-3 col-3">
              <Textarea
                value={sender}
                onChange={e => setSender(e.target.value)}
                className="input input-address input-right mb-5"
              />

              <label htmlFor="kvk" className="form-group row">
                <span className="col-sm-2 col-form-label">KvK</span>
                <div className="col-sm-10">
                  <input id="kvk" type="text" className="input input-right" />
                </div>
              </label>

              <label htmlFor="iban" className="form-group row">
                <span className="col-sm-2 col-form-label">IBAN</span>
                <div className="col-sm-10">
                  <input id="iban" type="text" className="input input-right" />
                </div>
              </label>

              <label htmlFor="btw" className="form-group row">
                <span className="col-sm-2 col-form-label">BTW</span>
                <div className="col-sm-10">
                  <input id="btw" type="text" className="input input-right" />
                </div>
              </label>
            </div>
            <div className="col-12">
              <table className="table mt-5">
                <thead>
                  <tr>
                    <th>Beschrijving</th>
                    <th>Aantal</th>
                    <th>Prijs(exc. BTW)</th>
                    <th>BTW</th>
                    <th>Totaal(inc. BTW)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => <InvoiceRow {...row} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
