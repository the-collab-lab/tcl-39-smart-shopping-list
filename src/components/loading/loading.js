import { css } from '@emotion/react';
import PuffLoader from 'react-spinners/PuffLoader';
import "./loading.css"

// Can be a string as well. Need to ensure each key-value pair ends with ;
const color = '#7A7A7A'
const override = css`
  // top: 50%;
`;

const Loading = () => {
  return (
    <div className='container-loading'>
      <PuffLoader size={160} color={color} css={override} />
      <p className='loading_text'>Loading</p>
    </div>
  );
};

export default Loading;
