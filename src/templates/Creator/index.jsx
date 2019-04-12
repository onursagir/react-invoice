import React, { useState } from 'react';
import { Textarea, Input } from '@atoms';
import { FormGroup, RowTable } from '@molecules';

const Creator = () => {
  const date = new Date();
  const day = String(date.getDay()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const dueMonth = String(date.getMonth() + 2).padStart(2, 0);

  const [fields, setFields] = useState({
    kvk: '123456780001',
    btw: 'NL001234567B01',
    iban: 'NL91ABNA0417164300',
    dueDate: `${day}-${dueMonth}-${date.getFullYear()}`,
    invoiceDate: `${day}-${month}-${date.getFullYear()}`,
    invoiceNumber: `${date.getFullYear()}0001`,
    companyName: `Mijn${'\n'}Bedrijf.`,
    debtorAddress: `Debiteur.${'\n'}Straatnaam 12${'\n'}1234AB Rotterdam`,
    companyAddress: `Mijn bedrijf.${'\n'}Straatnaam 12${'\n'}1234AB Rotterdam`,
  });

  const onFieldChange = ({ target }) => setFields({ ...fields, [target.name]: target.value });

  console.log(fields, setFields);
  return (
    <div className="row">
      <div className="col-lg-5">
        <Textarea
          isLarge
          value={fields.companyName}
          rows="2"
          name="companyName"
          onChange={onFieldChange}
        />
        <Textarea
          isAddress
          className="mt-5 mb-5"
          value={fields.debtorAddress}
          rows="3"
        />
        <FormGroup text="Factuurnummer">
          <Input name="invoiceNumber" onChange={onFieldChange} value={fields.invoiceNumber} className="text-right" />
        </FormGroup>
        <FormGroup text="Factuurdatum">
          <Input name="invoiceDate" onChange={onFieldChange} value={fields.invoiceDate} className="text-right" />
        </FormGroup>
        <FormGroup text="Vervaldatum">
          <Input name="dueDate" onChange={onFieldChange} value={fields.dueDate} className="text-right" />
        </FormGroup>
      </div>
      <div className="offset-lg-2 col-lg-5">
        <Textarea
          isAddress
          className="text-right mb-5"
          value={fields.companyAddress}
          rows="3"
        />
        <FormGroup text="KVK">
          <Input name="kvk" onChange={onFieldChange} value={fields.kvk} className="text-right" />
        </FormGroup>
        <FormGroup text="IBAN">
          <Input name="iban" onChange={onFieldChange} value={fields.iban} className="text-right" />
        </FormGroup>
        <FormGroup text="BTW">
          <Input name="btw" onChange={onFieldChange} value={fields.btw} className="text-right" />
        </FormGroup>
      </div>
      <div className="col-lg-12">
        <RowTable />
      </div>
    </div>
  );
};

export default Creator;
