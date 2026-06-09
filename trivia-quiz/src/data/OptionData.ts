// The reason I need this, to let typescript know I am passing a array with the union keys of QuizOption
// Since in OptionButton I am passing dynamic keys in isSelected Object.

import type { Data } from "../types";
import categoriesData from "./categoriesData.json";
import difficultyData from "./difficulty.json";
import numberQuestionData from "./numberQuestion.json";
import questionTypeData from "./questionType.json";

export const categories = categoriesData as Data[];
export const difficultyQuestion = difficultyData as Data[];
export const numberQuestion = numberQuestionData as Data[];
export const questionType = questionTypeData as Data[];
