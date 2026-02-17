import migrations from "@convex-dev/migrations/convex.config";
import resend from "@convex-dev/resend/convex.config";
import geospatial from "@convex-dev/geospatial/convex.config";
import presence from "@convex-dev/presence/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(migrations);
app.use(resend);
app.use(geospatial);
app.use(presence);
export default app;
