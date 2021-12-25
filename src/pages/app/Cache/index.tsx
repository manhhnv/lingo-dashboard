import { Button, Container } from "@material-ui/core";
import React, { useCallback } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { updateRanking } from "apis/cache";

const CachePage = () => {
  const updateHandler = useCallback(() => {
    updateRanking().catch((e) => {
      throw e;
    });
  }, []);
  return (
    <DashboardLayout>
      <Container>
        <Button onClick={updateHandler} color="primary" variant="contained">
          Update Cache
        </Button>
      </Container>
    </DashboardLayout>
  );
};

export default React.memo(CachePage);
