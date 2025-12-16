import { resolve } from "../components/DNSResolver.js";
import { routePacket } from "../components/Router.js";
import { checkFirewall } from "../components/Firewall.js";

export default function tracePacket(packet) {
    const trace = [];

    const destIP = resolve(packet.destination, trace);
    if (!destIP) return trace;

    let ttl = packet.ttl;

    ttl = routePacket(destIP, ttl, trace);
    if (!ttl) return trace;

    const allowed = checkFirewall(packet, trace);
    if (!allowed) return trace;

    trace.push({ location: "Destination", action: "Packet delivered successfully" });
    return trace;
}