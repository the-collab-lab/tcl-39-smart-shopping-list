import PuffLoader from 'react-spinners/PuffLoader';
import "./loading.css"

const Loading = () => {
  return (
    <div className='container-loading'>
      <PuffLoader size={160} color='#7A7A7A' />
      <p className='loading_text'>Loading</p>
    </div>
  );
};

export default Loading;
