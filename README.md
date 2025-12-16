Network Packet Tracer Simulator

This project is a simple API-based network packet tracer built using Node.js.
It simulates how a network packet travels through a virtual network and helps in understanding core networking concepts like DNS resolution, routing, firewall rules, and TTL (Time To Live).

The application accepts a packet definition as input and returns a step-by-step trace showing how the packet is processed at each stage of the network.

Features

DNS resolution using configuration files (A and CNAME records)

Routing with TTL decrement and route validation

Firewall rule evaluation using protocol, source CIDR, and port ranges

Clear hop-by-hop packet trace

Handles common network errors:

NXDOMAIN (domain not found)

No route to host

Firewall blocked packets

TTL exceeded

Project Setup
Prerequisites

Node.js (version 18 or higher)

npm

Installation & Run
git clone  https://github.com/Mounika4406/packet-tracer-simulator.git

cd packet-tracer
npm install
npm start

The server will start at:

http://localhost:3000
API Documentation
Endpoint
POST /trace
Request Body
{
  "sourceIP": "192.168.1.2",
  "destination": "example.com",
  "destinationPort": 80,
  "protocol": "TCP",
  "ttl": 5
}
Successful Response Example
{
  "trace": [
    { "location": "DNS Resolver", "action": "Resolved example.com → 10.0.0.5" },
    { "location": "Router", "action": "Packet forwarded (TTL=4)" },
    { "location": "Firewall", "action": "Allowed by rule #2" },
    { "location": "Destination", "action": "Packet delivered successfully" }
  ]
}
Firewall Blocked Example
{
  "trace": [
    { "location": "DNS Resolver", "action": "Resolved example.com → 10.0.0.5" },
    { "location": "Firewall", "action": "Blocked by rule #1" }
  ]
}
No Route to Host Example
{
  "trace": [
    { "location": "DNS Resolver", "action": "Resolved example.com → 10.0.0.5" },
    { "location": "Router", "action": "No route to host" }
  ]
}
Configuration Scenarios

The configs/ folder contains two example network setups:

scenario-basic

Demonstrates normal packet delivery

DNS resolution

Routing

Firewall allow rules

scenario-complex

Demonstrates firewall blocking

No route to host scenario

To switch between scenarios, copy the files from the desired scenario folder into the main configs/ directory before running the application.

Demo Evidence

The screenshots/ folder contains screenshots demonstrating:

Successful packet delivery

Firewall blocked packet

No route to host error

These screenshots show the simulator working as expected for different network conditions.
“To switch scenarios, copy the configuration files from the desired scenario folder into the configs/ directory before running the application.”
