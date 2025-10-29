import { useEffect, useState } from "react";
import "./LogStream.css"

export default function LogStream() {
    const [streamLogs, setStreamLogs] = useState("");
    const [isStreamLogsDone, setStreamLogsDone] = useState(false);

    const [sseLogs, setSseLogs] = useState("");
    const [isSseLogsDone, setSseLogsDone] = useState(false);

    useEffect(() => {
        const connect = async () => {
            try {
                const response = await fetch("http://localhost:8080/stream/logs");
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log("Connection closed by server - Streaming");
                        setStreamLogsDone(true);
                        break;
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    setStreamLogs((prev) => prev + chunk);

                    if (chunk.includes("END")) {
                        setStreamLogsDone(true);
                        break;
                    }
                }
            } catch (error) {
                console.error("Error Streaming:", error);
                setStreamLogsDone(true);
            }
        };

        connect();
    }, []);

    useEffect(() => {
        const connect = async () => {
            try {
                const response = await fetch("http://localhost:8080/sse/logs");
                const reader = response.body.getReader();
                const decoder = new TextDecoder("utf-8");

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log("Connection closed by server - SSE");
                        setSseLogsDone(true);
                        break;
                    }

                    const chunk = decoder.decode(value, { stream: true });
                    setSseLogs((prev) => prev + chunk);

                    if (chunk.includes("END")) {
                        setSseLogsDone(true);
                        break;
                    }
                }
            } catch (error) {
                console.error("Error SSE:", error);
                setSseLogsDone(true);
            }
        };

        connect();
    }, []);

    return (
        <div className="container">
            <div>
                <h2>🛰️ Real Time Logs [Stream]</h2>
                <pre className="pre">{streamLogs}</pre>
                {isStreamLogsDone && <p className="p">✅ Completed</p>}
            </div>

            <div>
                <h2>📡 Real Time Logs [SSE]</h2>
                <pre className="pre">{sseLogs}</pre>
                {isSseLogsDone && <p className="p">✅ Completed</p>}
            </div>
        </div>
    );

}