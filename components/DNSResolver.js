import fs from "fs";
import path from "path";

const dnsPath = path.resolve("configs/dns.json");
const dnsRecords = JSON.parse(fs.readFileSync(dnsPath, "utf-8"));

export function resolve(hostname, trace) {
    // If already an IP, skip DNS
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        trace.push({
            location: "DNS Resolver",
            action: `Destination is already an IP (${hostname})`
        });
        return hostname;
    }

    const record = dnsRecords[hostname];

    if (!record) {
        trace.push({
            location: "DNS Resolver",
            action: `NXDOMAIN: ${hostname} not found`
        });
        return null;
    }

    if (record.type === "A") {
        trace.push({
            location: "DNS Resolver",
            action: `Resolved ${hostname} → ${record.value}`
        });
        return record.value;
    }

    if (record.type === "CNAME") {
        trace.push({
            location: "DNS Resolver",
            action: `CNAME ${hostname} → ${record.value}`
        });
        return resolve(record.value, trace);
    }
}
