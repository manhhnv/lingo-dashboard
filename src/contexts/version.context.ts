import { createContext } from "react";
type VersionContextType = {
  recall?: boolean;
  setRecallHandle?: (value: boolean) => void;
};

export const VersionContext = createContext<VersionContextType>({});
