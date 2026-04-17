import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function CardGrid({ cards, onSelect, }) {
    return (_jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "30px",
            padding: "20px",
        }, children: cards.map((card) => (_jsxs("div", { onClick: () => onSelect(card), style: {
                cursor: "pointer",
                transform: "translateY(0px)",
                transition: "0.3s ease",
                position: "relative",
            }, onMouseEnter: (e) => {
                e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.05)";
            }, onMouseLeave: (e) => {
                e.currentTarget.style.transform =
                    "translateY(0px) scale(1)";
            }, children: [_jsx("img", { src: card.image, alt: card.name, style: {
                        width: "100%",
                        height: "240px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 0 25px rgba(124,58,237,0.5)",
                    } }), _jsx("div", { style: {
                        marginTop: "10px",
                        textAlign: "center",
                        color: "white",
                        fontSize: "1.1rem",
                    }, children: card.name })] }, card.id))) }));
}
