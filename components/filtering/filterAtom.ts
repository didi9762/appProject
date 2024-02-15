import { atom } from "jotai";
import { Filters,defaultFilters } from "../types/types";

const defultFilters:Filters = defaultFilters

const filterAtom =atom(defultFilters as Filters)

  export default filterAtom