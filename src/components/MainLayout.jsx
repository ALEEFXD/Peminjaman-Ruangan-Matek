import { Outlet } from 'react-router-dom';
import { MainSidebar } from './MainSidebar';

const MainLayout = () => {
  return (
    <div className="app-container">
      {/* The Navbar stays visible at all times */}
      <MainSidebar /> 
      
      {/* The content of the current page (Home, Profile) renders here */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;