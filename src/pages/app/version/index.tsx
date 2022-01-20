import { useAdmin } from "../../../AdminContext";
import React from "react";
import { Redirect } from "react-router";
import DashboardLayout from "layouts/DashboardLayout";
import { Helmet } from "react-helmet-async";
import VersionContainer from "containers/Version";

const VersionPage = () => {
  const { admin } = useAdmin();
  return (
    <React.Fragment>
      {admin.token ? (
        <DashboardLayout>
          <React.Fragment>
            <Helmet>
              <title>Quản lý phiên bản ứng dụng</title>
            </Helmet>
            <VersionContainer />
          </React.Fragment>
        </DashboardLayout>
      ) : (
        <Redirect to="/login" exact />
      )}
    </React.Fragment>
  );
};
export default VersionPage;
