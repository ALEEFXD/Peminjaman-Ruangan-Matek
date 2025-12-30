import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import MainSidebar from "./MainSidebar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className="w-full">
        <nav className="flex items-center border-b p-4">
          <SidebarTrigger />
        </nav>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;