import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const additionalCityDescriptions = {
  "al baha": "Al Baha is often called the 'Pearl of Resorts' for its breathtaking scenery, cool climate, and lush green landscapes. Located in the southwestern part of Saudi Arabia, it boasts charming ancient villages like Dhee Ain, terraced hillsides, and vibrant forests. The city offers a blend of traditional Saudi culture and beautiful natural attractions, making it a peaceful retreat away from the heat of the desert. Al Baha's moderate weather, historical forts, and cultural festivals make it an emerging tourist hotspot that promises visitors an unforgettable experience among mountains and misty valleys.",
  
  "jazan": "Located along the Red Sea coast, Jazan is a land of rich biodiversity and captivating traditions. It’s famous for the stunning Farasan Islands, pristine beaches, and tropical fruits like mangoes. Beyond its natural beauty, Jazan offers a lively cultural atmosphere with colorful local markets, traditional dances, and warm hospitality. The city's strategic location also makes it an important economic hub, blending modernity with deep-rooted traditions. From beach adventures to mountain hikes in Faifa, Jazan is a hidden treasure waiting to be explored.",

  "taif": "Taif, perched high in the Sarawat Mountains, is a city that charms visitors with its cool air, fragrant rose gardens, and scenic valleys. Known as the summer capital of Saudi Arabia, it hosts the famous Taif Rose Festival and boasts historical sites like Shubra Palace. Taif is also renowned for its bustling traditional souqs, camel races, and beautiful mountain resorts. The city's elevated terrain provides panoramic views and a refreshing escape from the desert heat, making it a beloved destination for both residents and tourists alike.",

  "al madinah": "Al Madinah, the second holiest city in Islam, holds deep spiritual significance for Muslims worldwide. Beyond its religious importance, the city is a beacon of hospitality, culture, and peace. Al Madinah's stunning Islamic architecture, serene gardens, and vibrant date markets create an inviting atmosphere. Modern developments blend harmoniously with historic landmarks like the Prophet’s Mosque. As one of Saudi Arabia’s major cultural centers, Al Madinah welcomes visitors with open arms, offering a journey through faith, history, and tradition.",

  "al ula": "Al Ula is a breathtaking open-air museum nestled in the heart of the desert. Rich with archaeological wonders, it is home to the UNESCO World Heritage site of Hegra (Madain Saleh), ancient tombs carved into sandstone cliffs, and dramatic rock formations like Elephant Rock. This mystical destination offers visitors a glimpse into ancient civilizations, art, and history, all set against a backdrop of golden sands and starry skies. Al Ula is quickly becoming one of the world's most extraordinary cultural and adventure tourism destinations.",

  "umluj": "Known as the 'Maldives of Saudi Arabia,' Umluj is a coastal paradise offering white-sand beaches, crystal-clear turquoise waters, and vibrant coral reefs. Perfect for diving, snorkeling, and island-hopping, Umluj captivates nature lovers and adventure seekers alike. Its calm waters are teeming with marine life, and nearby volcanic landscapes add a striking contrast to its serene beaches. Umluj’s untouched beauty and relaxing atmosphere make it a top choice for anyone dreaming of a peaceful seaside escape in the heart of Arabia.",

  "tabuk": "Tabuk is a land of legends and landscapes, combining ancient history with futuristic ambition. Known for its role in prophetic stories and as a strategic crossroad, Tabuk features ancient ruins, stunning valleys, and mesmerizing deserts. It also serves as the gateway to NEOM, Saudi Arabia’s visionary mega-city project. The region's cooler climate, beautiful beaches along the Red Sea, and historical castles make it a perfect blend of past and future. Tabuk invites explorers, adventurers, and dreamers to discover its wonders.",

  "hail": "Hail is a city steeped in poetry, hospitality, and the spirit of the desert. Located in the north-central region of Saudi Arabia, it is famous for its role in Arab folklore and its strong Bedouin traditions. Visitors can experience the majestic sand dunes of Nafud Desert, ancient rock art at Jubbah, and the warmth of a culture that has thrived in harsh environments. Hail's deep historical roots, traditional architecture, and welcoming spirit make it a fascinating destination for anyone seeking to experience the heart of Saudi Arabia’s cultural heritage.",

  "al ahsa": "Recognized as a UNESCO World Heritage site, Al Ahsa boasts the world's largest oasis, with over 2.5 million date palms spread across fertile lands. This lush region is a stark contrast to the surrounding desert and offers breathtaking natural springs, ancient caves, and vibrant traditional markets. Al Ahsa's history as a center for trade and culture is reflected in its forts, mosques, and colorful festivals. A visit to Al Ahsa promises a journey into a green paradise where heritage and nature flourish together.",

  "buraidah": "Buraidah, the capital of Al-Qassim Province, is a city where agriculture and tradition harmoniously blend. Renowned for producing some of the finest dates in the world, Buraidah hosts the world’s largest date festival every year. Beyond agriculture, it offers charming parks, lively souqs, and a thriving cultural scene. Its warm, welcoming people and commitment to preserving Saudi traditions make Buraidah a delightful city to explore. From the green farms to the vibrant marketplaces, Buraidah reflects the rich spirit of central Saudi Arabia.",
};

const AdditionalCityInfo = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();

  const normalizedCityName = cityName.toLowerCase().replace(/-/g, " ");
  const description = additionalCityDescriptions[normalizedCityName];

  if (!description) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem", fontSize: "1.5rem" }}>
        City information not found.
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "7rem",
        paddingBottom: "5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem"
      }}
    >
      <div
        style={{
          maxWidth: "64rem",
          backgroundColor: "white",
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", textTransform: "capitalize" }}>
          {normalizedCityName}
        </h2>
        <p style={{ color: "#374151", fontSize: "1.125rem", textAlign: "center", lineHeight: "1.75" }}>
          {description}
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "2.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#9747FF",
          color: "white",
          fontSize: "1.125rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}
      >
        ← Back to Additional Cities
      </button>
    </div>
  );
};

export default AdditionalCityInfo;
