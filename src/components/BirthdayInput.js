import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function BirthdayInput({ onSubmit }) {
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    return (_jsxs("div", { style: { marginTop: "20px", textAlign: "center" }, children: [_jsx("h3", { style: { color: "white", marginBottom: "10px" }, children: "Enter Your Birthday" }), _jsx("input", { type: "number", placeholder: "Month (1\u201312)", value: month, onChange: (e) => setMonth(e.target.value), style: {
                    padding: "10px",
                    marginRight: "10px",
                    borderRadius: "6px",
                    width: "120px",
                } }), _jsx("input", { type: "number", placeholder: "Day (1\u201331)", value: day, onChange: (e) => setDay(e.target.value), style: {
                    padding: "10px",
                    borderRadius: "6px",
                    width: "120px",
                } }), _jsx("button", { onClick: () => onSubmit(Number(month), Number(day)), style: {
                    marginTop: "15px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "#7c3aed",
                    color: "white",
                    cursor: "pointer",
                    border: "none",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                }, children: "Save Birthday" })] }));
}
