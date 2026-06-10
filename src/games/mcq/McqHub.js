import { useNavigate } from "react-router-dom";
import DifficultySelect from "../DifficultySelect";

export default function McqHub() {
  const navigate = useNavigate();
  return (
    <DifficultySelect
      title="FIFA World Cup Quiz"
      subtitle="Answer multiple-choice questions on World Cup history, records, host nations, stadiums, and legendary finals."
      backLink="/play-zone"
      onSelect={(slug) => navigate(`/games/mcq/${slug}`)}
    />
  );
}
