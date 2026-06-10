import { useNavigate } from "react-router-dom";
import DifficultySelect from "../DifficultySelect";

export default function WhoAmIHub() {
  const navigate = useNavigate();
  return (
    <DifficultySelect
      title="Who Am I?"
      subtitle="Identify players from mystery image reveals. Each round includes 5 randomized questions with score, timer, and accuracy tracking."
      backLink="/play-zone"
      onSelect={(slug) => navigate(`/quiz/${slug}`)}
    />
  );
}
