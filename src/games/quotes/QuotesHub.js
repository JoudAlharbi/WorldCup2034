import { useNavigate } from "react-router-dom";
import DifficultySelect from "../DifficultySelect";

export default function QuotesHub() {
  const navigate = useNavigate();
  return (
    <DifficultySelect
      title="Who Said It?"
      subtitle="Read famous football quotes and select who said them — players, managers, and icons of the game."
      backLink="/play-zone"
      onSelect={(slug) => navigate(`/games/quotes/${slug}`)}
    />
  );
}
