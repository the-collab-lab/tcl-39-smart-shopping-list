import PuffLoader from 'react-spinners/PuffLoader';
import "./loading.css"

const color = '#7A7A7A'

const Loading = () => {
  return (
    <div className='container-loading'>
      <PuffLoader size={160} color={color} />
      <p className='loading_text'>Loading</p>
    </div>
  );
};

export default Loading;
