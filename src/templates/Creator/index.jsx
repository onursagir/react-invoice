import * as React from 'react';
import { Textarea, Input } from '@atoms';
import { FormGroup } from '@molecules';

const Creator = () => (
  <div className="row">
    <div className="col-lg-5">
      <Textarea
        isLarge
        value={`Mijn${'\n'}Bedrijf.`}
        rows="2"
      />
      <Textarea
        isAddress
        className="mt-5 mb-5"
        value={`Debiteur.${'\n'}Straatnaam 12${'\n'}1234AB Rotterdam`}
        rows="3"
      />
      <FormGroup text="Factuurnummer">
        <Input value="123456780001" className="text-right" />
      </FormGroup>
      <FormGroup text="Factuurdatum">
        <Input value="123456780001" className="text-right" />
      </FormGroup>
      <FormGroup text="Vervaldatum">
        <Input value="123456780001" className="text-right" />
      </FormGroup>
    </div>
    <div className="offset-lg-2 col-lg-5">
      <Textarea
        isAddress
        className="text-right mb-5"
        value={`Mijn bedrijf.${'\n'}Straatnaam 12${'\n'}1234AB Rotterdam`}
        rows="3"
      />
      <FormGroup text="KVK">
        <Input value="123456780001" className="text-right" />
      </FormGroup>
      <FormGroup text="IBAN">
        <Input value="123456780001" className="text-right" />
      </FormGroup>
      <FormGroup text="BTW">
        <Input value="123456780001" className="text-right" />
      </FormGroup>
    </div>
  </div>
);

export default Creator;
