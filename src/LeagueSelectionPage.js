import React from "react";
import { useNavigate } from "react-router-dom";
import DifficultySelect from "./games/DifficultySelect";

export default function LeagueSelectionPage() {
  const navigate = useNavigate();
  return (
    <DifficultySelect
      title="Who Am I?"
      subtitle="Identify players from mystery image reveals — eyes, silhouettes, jerseys, and celebrations. Each round includes 5 randomized questions."
      backLink="/play-zone"
      onSelect={(slug) => navigate(`/quiz/${slug}`)}
    />
  );
}
