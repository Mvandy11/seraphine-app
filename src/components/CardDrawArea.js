import { jsx as _jsx } from "react/jsx-runtime";
import { TarotCard } from "./TarotCard";
export function CardDrawArea({ cards }) {
    return (_jsx("div", { className: "card-draw-area", children: cards.map((card, i) => (_jsx(TarotCard, { data: card }, i))) }));
}
export default CardDrawArea;
