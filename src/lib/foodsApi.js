import { supabase } from "../supabase";

const toList = (text) => (text ? text.split("; ") : []);

const normalize = (row) => ({
  ...row,
  time: row.cook_time,
  ingredients: toList(row.ingredients),
  steps: toList(row.steps),
});

export async function fetchFoods() {
  const { data, error } = await supabase
    .from("oshxona")
    .select("*")
    .order("id");

  if (error) throw error;
  return data.map(normalize);
}

export async function fetchFood(id) {
  const { data, error } = await supabase
    .from("oshxona")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return normalize(data);
}