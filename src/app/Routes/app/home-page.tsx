import React, { useEffect } from "react";
import DashboardLayout from "../../../components/layouts/dashboard-layout";

const HomePage: React.FC = () => {

  return (
    <DashboardLayout>
      <div className="flex flex-col p-8">
        <div>
          <p className="text-3xl font-semibold">Dashboard</p>
        </div>
        <div></div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
