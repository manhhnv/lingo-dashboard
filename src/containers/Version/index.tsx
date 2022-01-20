import React, { useCallback, useState } from "react";
import { VersionContext } from "contexts/version.context";
import ListVersions from "./List";
import NewVersion from "./NewVersion";

const Version = () => {
  const [recall, setRecall] = useState(true);

  const setRecallHandle = useCallback((value: boolean) => {
    setRecall(value);
  }, []);

  return (
    <VersionContext.Provider
      value={{
        recall,
        setRecallHandle,
      }}
    >
      <ListVersions />
      <NewVersion />
    </VersionContext.Provider>
  );
};

export default React.memo(Version);
