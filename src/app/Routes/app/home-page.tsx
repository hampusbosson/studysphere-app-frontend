import React from "react";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import CourseOverview from "../../../features/courses/components/course-overview";

const HomePage: React.FC = () => {

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 px-12 gap-10 h-full">
        <div>
          <p className="text-4xl font-bold">Dashboard</p>
        </div>
        <div className="flex flex-row gap-10">
          <CourseOverview />
          <div>some other content</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
