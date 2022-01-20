import { Box, Grid } from "@material-ui/core";
import { getAllPlatformsVersion } from "apis/version";
import { useVersionContext } from "hooks";
import { VersionModel } from "models";
import React, { useState } from "react";
import { useEffect } from "react";
import VersionItem from "./Item";

const ListVersions = () => {
  const [versions, setVersions] = useState<VersionModel[]>([]);
  const { recall, setRecallHandle } = useVersionContext();

  useEffect(() => {
    if (recall)
      getAllPlatformsVersion()
        .then((data) => {
          setVersions(data);
        })
        .finally(() => {
          if (setRecallHandle) {
            setRecallHandle(false);
          }
        });
  }, [recall, setRecallHandle]);
  return (
    <Box css={{ width: "100%", overflow: "hidden" }}>
      <Grid container justify="center" spacing={3}>
        {versions?.length > 0 &&
          versions.map((version) => {
            return (
              <Grid key={version._id} item lg={5} md={5} sm={12} xs={12}>
                <VersionItem {...version} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default React.memo(ListVersions);
