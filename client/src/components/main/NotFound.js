import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 3000);

  return (
    <div className="not-found">
      <div className="bg-gradient"></div>
      <div className="not-found-heading">
        It seems like the page you're looking for cannot be found.
      </div>
      <div class="progress"></div>
    </div>
  );
};

export default NotFound;
