import { useOutletContext } from "react-router-dom";
import { ContextType } from "../interfaces/ContextType";

export function useUser() {
  return useOutletContext<ContextType>();
}
