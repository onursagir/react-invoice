import React from 'react';
import { Creator } from '@templates';
import { creator, creatorBody } from './style.module.scss';
import './print.scss';

const Create = () => (
  <div className="container">
    <div className="row">
      <p className="d-print-none mb-5">
        Klik op de velden om te beginnen met bewerken. Wanneer je klaar bent kan je direct printen
        in de browser
      </p>

      <div className={creator}>
        <div className={creatorBody}>
          <Creator />
        </div>
      </div>
    </div>
  </div>
);

export default Create;
