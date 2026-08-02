export const generateAIOutfit = async (req, res) => {
  try {
    const { sneakerId, occasion, weather, style } = req.body;
    
    const outfitRecommendations = {
      sneaker: "Air Jordan 1 Game-Worn",
      occasion: occasion || "Metropolitan Streetwear",
      weather: weather || "Autumn Cool (18°C)",
      matchScore: 99.4,
      layers: {
        top: { item: "Over-sized Heavyweight Cyber-Fleece Hoodie", color: "Matte Charcoal", brand: "SOLE LABS Studio" },
        bottom: { item: "Technical Cargo Trousers with Magnetic Buckles", color: "Obsidian Black", brand: "Acronym Ref" },
        outerwear: { item: "Reflective Modular Windshell Jacket", color: "Cyber Orange accents", brand: "SOLE LABS Studio" },
        accessories: ["Matte Titanium Carabiner Watch", "Minimalist Sling Bag"]
      },
      colorPalette: ["#0A0A0A", "#1C1C1C", "#FF5A1F", "#E5E5E5"],
      stylistNote: "This outfit creates a high-contrast silhouette emphasizing the sole geometry while protecting against chilly urban climate."
    };

    res.json({ success: true, outfit: outfitRecommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const aiStylistChat = async (req, res) => {
  try {
    const { message, history } = req.body;
    
    let reply = "I recommend pairing your high-top Jordans with cropped relaxed trousers and a heavyweight neutral hoodie to draw maximum visual attention to the sneaker profile.";

    const lowerMsg = (message || "").toLowerCase();
    if (lowerMsg.includes("size") || lowerMsg.includes("fit")) {
      reply = "Based on our machine learning size scanner data, SOLE models run true to size. However, if you have wider feet, we advise going half a size up (e.g. US 10.5 instead of US 10).";
    } else if (lowerMsg.includes("drop") || lowerMsg.includes("release")) {
      reply = "The next exclusive drop is the Air Jordan 1 Game-Worn releasing in 4 days. VIP Members (Titan & Legend tiers) receive 30-minute early access priority queueing.";
    } else if (lowerMsg.includes("resell") || lowerMsg.includes("investment")) {
      reply = "Our predictive algorithm estimates a +85% value gain on the JORDAN MONOLITH RETRO HIGH within 6 months of release due to strict limited allocation of 1,000 numbered units.";
    }

    res.json({
      success: true,
      message: reply,
      timestamp: new Date(),
      suggestedActions: ["Generate Matching Outfit", "Scan Foot Size", "View Release Calendar"]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const scanFootSize = async (req, res) => {
  try {
    const { footLengthCm, footWidthCm, archType } = req.body;
    
    const length = parseFloat(footLengthCm) || 27.2;
    const width = parseFloat(footWidthCm) || 10.1;
    
    // Size calculation algorithm
    let recommendedUS = 10;
    if (length < 25) recommendedUS = 7.5;
    else if (length < 26) recommendedUS = 8.5;
    else if (length < 27) recommendedUS = 9.5;
    else if (length < 28) recommendedUS = 10.5;
    else if (length < 29) recommendedUS = 11.5;
    else recommendedUS = 12.5;

    res.json({
      success: true,
      scanResult: {
        recommendedSizeUS: `US ${recommendedUS}`,
        recommendedSizeEU: `EU ${Math.round(recommendedUS + 33)}`,
        fitAccuracyPercent: 98.6,
        widthAssessment: width > 10.4 ? "Slightly Wide — Choose standard or +0.5 size" : "Standard Fit",
        archRecommendation: archType || "Medium Arch — Standard Carbon Insole Recommended",
        footDimensions: { lengthCm: length, widthCm: width }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
