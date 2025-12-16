import express from "express";
import tracePacket from "./tracer/packetTracer.js";

const app = express();
app.use(express.json());

app.post("/trace", (req, res) => {
    const trace = tracePacket(req.body);
    res.json({ trace });
});

app.listen(3000, () => {
    console.log("Packet Tracer API running on port 3000");
});