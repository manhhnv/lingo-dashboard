import { VersionContext } from "contexts/version.context";
import { useContext } from "react";

export const useVersionContext = () => useContext(VersionContext);
