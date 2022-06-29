import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

const useRole = () => {
  const { user } = useSelector((store: RootState) => store.user);
  const sysRole = user?.userType;
  if (sysRole === 'Admin') {
    return false;
  }
  return true;
};
export default useRole;
