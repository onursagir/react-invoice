import React from 'react';
import { Creator } from '@templates';
import { creator, creatorBody } from './style.module.scss';

const Create = () => (
  <div className="container">
    <div className="row">
      <div className={creator}>
        <div className={creatorBody}>
          <Creator />
        </div>
      </div>
      <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum velit accusamus possimu
          quibusdam quis vel, atque vitae et dolorem excepturi dolore enim est distinctio
          unde expedita nisi recusandae optio eum.
      </p>
    </div>
  </div>
);

export default Create;
