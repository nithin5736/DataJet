import { useEffect } from 'react';
import { Flex, Spin, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PowerButtonLogo from '../../../../assets/power-button.png';
import ProfileLogo from '../../../../assets/profile.svg';
import { logout, setUser } from '../../../authentication/reducers';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';
import DataSourceSideBar from '../../components/DataSourceSideBar/DataSourceSideBar';
import DataSourceManager from '../../components/DataSourcesManager/DataSourceManager';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';

const DataSource: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    if (localStorage.getItem('user') === null) navigate('/login');
  }, []);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.get('auth/logout');
      dispatch(setUser({ name: '', id: '' }));
      dispatch(logout());
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    {!loggedIn && <div className='flex justify-center items-center h-96'><Spin indicator={<LoadingOutlined style={{ fontSize: 54}} spin />} /></div>}
    {loggedIn &&
    <Flex className="h-screen w-screen bg-gray-100">
      <div className="leftbar flex flex-col items-center bg-gray-100">
        <Tooltip title={user.name} placement="right">
          <div className="flex justify-center hover:bg-gray-300 border border-grey-500 w-full">
            <img className="w-7 h-7 p-3" src={ProfileLogo} alt="" />
          </div>
        </Tooltip>
        <Tooltip title="Query Panel" placement="right">
          <div
            onClick={() => navigate('/')}
            className="flex justify-center hover:bg-gray-300 border border-grey-500 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="darkblue"
              className="w-7 h-7 p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>
          </div>
        </Tooltip>
        <Tooltip title="Data Sources" placement="right">
          <div
            onClick={() => navigate('/datasource')}
            className="flex justify-center hover:bg-gray-300 border border-grey-500 w-full mt-45 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="darkblue"
              className="w-7 h-7 p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
              />
            </svg>
          </div>
        </Tooltip>
        <Tooltip title="Logout" placement="right">
          <div
            className="flex justify-center hover:bg-gray-300 border border-grey-500 w-full mt-auto mb-0"
            onClick={handleLogout}
          >
            <img className="w-7 h-7 p-3" src={PowerButtonLogo} alt="" />
          </div>
        </Tooltip>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex">
          <DataSourceSideBar />
        </div>
        <div className="flex w-full">
          <DataSourceManager />
        </div>
      </div>
    </Flex>
   }
   </>
  );
};

export default DataSource;