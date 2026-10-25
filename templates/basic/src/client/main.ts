import { onClientResourceStart } from "@open77/sdk/client";
import { greet } from "../shared/greeting";

onClientResourceStart(() => {
    print(greet(GetCurrentResourceName()));
});
