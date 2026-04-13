import { TarotCard } from "./TarotCard";

export function CardDrawArea({ cards }: { cards: any[] }) {
  return (
    <div className="card-draw-area">
      {cards.map((card, i) => (
        <TarotCard key={i} data={card} />
      ))}
    </div>
  );
}
export default CardDrawArea;
