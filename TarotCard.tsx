type TarotCardProps = {
  data: any;
};

export function TarotCard({ data }: TarotCardProps) {
  return (
    <div className="tarot-card">
      {data?.name ?? "Tarot Card"}
    </div>
  );
}
