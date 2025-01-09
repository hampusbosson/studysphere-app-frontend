import React from "react";
import Layout from "../Layout";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-silver">Welcome to StudySphere</h1>
        <p className="text-gray-300 mt-4 text-lg">
          Master your studies with ease and efficiency.
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;