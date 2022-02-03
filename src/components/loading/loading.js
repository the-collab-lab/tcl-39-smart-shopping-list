import { css } from '@emotion/react';
import PuffLoader from 'react-spinners/PuffLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

const Loading = () => {
  return (
    <div>
      <PuffLoader css={override} size={60} />
    </div>
  );
};

export default Loading;
