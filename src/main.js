import ReportalBase from "r-reportal-base";
import HierarchyExtended from "./hierarchy";

window.Reportal = window.Reportal || {};
ReportalBase.mixin(window.Reportal,{
  HierarchyExtended
});

export default HierarchyExtended



