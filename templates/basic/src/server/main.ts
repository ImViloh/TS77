import { onResourceStart } from "@open77/sdk/server";
import { greet } from "../shared/greeting";

onResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});
