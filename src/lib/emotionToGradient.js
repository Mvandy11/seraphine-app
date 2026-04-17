// emotionToGradient.ts
export function emotionToGradient(emotion) {
    switch (emotion) {
        case "calm":
            return "linear-gradient(135deg, #4f46e5, #0ea5e9)";
        case "determination":
            return "linear-gradient(135deg, #f97316, #ea580c)";
        case "wonder":
            return "linear-gradient(135deg, #a855f7, #6366f1)";
        case "melancholy":
            return "linear-gradient(135deg, #475569, #1e293b)";
        default:
            return "linear-gradient(135deg, #0f172a, #1e293b)";
    }
}
