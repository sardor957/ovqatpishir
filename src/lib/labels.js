const categoryKeys = {
  "Suyuq ovqatlar": "liquid",
  "Quyuq ovqatlar": "main",
  "Pishiriqlar": "bakery",
  "Shirinliklar": "desserts",
  "Xamirli ovqatlar": "dough",
  "Salatlar": "salads",
  "Milliy taomlar": "national",
  "Nonushtalar": "breakfast",
};

export function categoryLabel(t, name) {
  const key = categoryKeys[name];
  return key ? t(`categories.${key}`) : name;
}

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/['‘’`ʻʼ]/g, "")
    .trim();

const difficultyKeys = {
  oson: "easy",
  orta: "medium",
  qiyin: "hard",
};

export function difficultyLabel(t, value) {
  const key = difficultyKeys[normalize(value)];
  return key ? t(`difficulty.${key}`) : value;
}

export function timeLabel(t, value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/daqiqa/gi, t("units.minute"))
    .replace(/soat/gi, t("units.hour"));
}
