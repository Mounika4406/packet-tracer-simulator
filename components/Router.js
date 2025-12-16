import fs from "fs";
import path from "path";

const routesPath = path.resolve("configs/routes.json");
const routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));

export function routePacket(destinationIP, ttl, trace) {

    if (ttl <= 0) {
        trace.push({
            location: "Router",
            action: "Time To Live exceeded"
        });
        return null;
    }

    // No route case (task requirement)
    if (!routes || routes.length === 0) {
        trace.push({
            location: "Router",
            action: "No route to host"
        });
        return null;
    }

    trace.push({
        location: "Router",
        action: `Packet forwarded (TTL=${ttl - 1})`
    });

    return ttl - 1;
}
