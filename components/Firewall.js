import fs from "fs";
import path from "path";

const firewallPath = path.resolve("configs/firewall.json");
const rules = JSON.parse(fs.readFileSync(firewallPath, "utf-8"));
function ipToNumber(ip) {
    return ip.split(".").reduce((acc, octet) => {
        return (acc << 8) + parseInt(octet);
    }, 0);
}

function isIPInCIDR(ip, cidr) {
    const [range, bits] = cidr.split("/");
    const mask = -1 << (32 - parseInt(bits));

    return (ipToNumber(ip) & mask) === (ipToNumber(range) & mask);
}

function isPortInRange(port, rulePort) {
    if (rulePort.includes("-")) {
        const [start, end] = rulePort.split("-").map(Number);
        return port >= start && port <= end;
    }
    return port === Number(rulePort);
}


export function checkFirewall(packet, trace) {
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        const protocolMatch = rule.protocol === packet.protocol;
        const sourceMatch = isIPInCIDR(packet.sourceIP, rule.source);
        const portMatch = isPortInRange(packet.destinationPort, rule.port);

        if (protocolMatch && sourceMatch && portMatch) {
            if (rule.action === "deny") {
                trace.push({
                    location: "Firewall",
                    action: `Blocked by rule #${i + 1}`
                });
                return false;
            }

            if (rule.action === "allow") {
                trace.push({
                    location: "Firewall",
                    action: `Allowed by rule #${i + 1}`
                });
                return true;
            }
        }
    }

    trace.push({
        location: "Firewall",
        action: "No matching rule → allowed"
    });

    return true;
}
