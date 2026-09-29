import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      
      {/* Website Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Website Footer */}
      <Footer />

    </div>
  );
};

export default PublicLayout;