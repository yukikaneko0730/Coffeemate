// src/components/CoffeeQuestionRow.tsx
import React, { useMemo, useState } from "react";
import type { CoffeeQuestionKey } from "../data/coffeeQuestions";

export type CoffeeProfileRow = {
  id: string;
  questionKey: CoffeeQuestionKey | "";
  answer: string;
};

type Props = {
  row: CoffeeProfileRow;
  index: number;
  isEnabled: boolean;
  // すでに他の行で使われた質問を除いた一覧（ProfilePage から渡ってくる）
  availableQuestions: { key: CoffeeQuestionKey; label: string }[];
  onChangeQuestion: (rowIndex: number, key: CoffeeQuestionKey) => void;
  onChangeAnswer: (rowIndex: number, value: string) => void;
};

/**
 * 質問選択ポップアップ用のローカル定義
 * ここでキーと表示ラベルを管理する（スクロール付きの黄色ボックス）
 */
const QUESTION_GROUPS: {
  id: string;
  label: string;
  items: { key: CoffeeQuestionKey; label: string }[];
}[] = [
  {
    id: "basics",
    label: "☕ BASICS",
    items: [
      { key: "favoriteTypeOfCoffee" as CoffeeQuestionKey, label: "Favorite type of coffee" },
      { key: "neighborhood" as CoffeeQuestionKey, label: "Neighborhood you live in" },
      { key: "favoriteCafeInArea" as CoffeeQuestionKey, label: "Favorite café in your area" },
      {
        key: "morningOrEvening" as CoffeeQuestionKey,
        label: "Morning or evening coffee person?",
      },
      {
        key: "goToSnack" as CoffeeQuestionKey,
        label: "Go-to pastry or snack with coffee",
      },
    ],
  },
  {
    id: "personality",
    label: "💬 COFFEE PERSONALITY",
    items: [
      { key: "usualOrder" as CoffeeQuestionKey, label: "Your usual coffee order" },
      { key: "coffeeMusicCombo" as CoffeeQuestionKey, label: "Coffee & music combo" },
      { key: "coffeeVibe" as CoffeeQuestionKey, label: "Your coffee vibe" },
      { key: "cafeForFriend" as CoffeeQuestionKey, label: "Café you’d take a friend to" },
      { key: "cafeForDate" as CoffeeQuestionKey, label: "Café you’d go on a date" },
      {
        key: "coffeeStyleAsPerson" as CoffeeQuestionKey,
        label: "If your coffee style were a person, it would be...",
      },
    ],
  },
  {
    id: "taste",
    label: "☁️ TASTE & ROAST PREFERENCES",
    items: [
      { key: "favoriteBeanOrigin" as CoffeeQuestionKey, label: "Favorite coffee bean origin" },
      { key: "roastPreference" as CoffeeQuestionKey, label: "Roast preference" },
      {
        key: "favoriteBrewingMethod" as CoffeeQuestionKey,
        label: "Favorite brewing method",
      },
      { key: "milkOfChoice" as CoffeeQuestionKey, label: "Milk of choice" },
      {
        key: "addsSugarOrSyrup" as CoffeeQuestionKey,
        label: "Do you add sugar or syrup?",
      },
    ],
  },
  {
    id: "vibe",
    label: "💫 VIBE & COMMUNITY",
    items: [
      { key: "whatCoffeeMeans" as CoffeeQuestionKey, label: "What coffee means to you" },
      { key: "bestCoffeeMemory" as CoffeeQuestionKey, label: "Best coffee memory" },
      { key: "idealCoffeeMate" as CoffeeQuestionKey, label: "Your ideal coffee mate" },
      {
        key: "ownedCafeIdea" as CoffeeQuestionKey,
        label: "If you owned a café, what would it be like?",
      },
      {
        key: "dreamCafeToVisit" as CoffeeQuestionKey,
        label: "Café you dream to visit one day",
      },
    ],
  },
];

const CoffeeQuestionRow: React.FC<Props> = ({
  row,
  index,
  isEnabled,
  availableQuestions,
  onChangeQuestion,
  onChangeAnswer,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // いまの行のラベル（まだ選ばれていなければプレースホルダー）
  const currentLabel = useMemo(() => {
    if (!row.questionKey) return "Select a question";
    for (const group of QUESTION_GROUPS) {
      const found = group.items.find((i) => i.key === row.questionKey);
      if (found) return found.label;
    }
    return "Select a question";
  }, [row.questionKey]);

  // この行で選択可能なキーだけを使うための Set
  const availableKeySet = useMemo(() => {
    return new Set(availableQuestions.map((q) => q.key));
  }, [availableQuestions]);

  const handleSelectQuestion = (key: CoffeeQuestionKey) => {
    onChangeQuestion(index, key);
    setIsPickerOpen(false);
  };

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAnswer(index, e.target.value);
  };

  const handleTogglePicker = () => {
    if (!isEnabled) return;
    setIsPickerOpen(true);
  };

  const disabledClass = !isEnabled ? " coffee-row--disabled" : "";

  return (
    <div className="coffee-row-wrapper">
      {/* 1本の行（質問 + ▽ + 回答） */}
      <div className={"coffee-row" + disabledClass}>
        <div className="coffee-row__question-cell">
          <span className="coffee-row__question-label">{currentLabel}</span>
          <button
            type="button"
            className="coffee-row__toggle"
            onClick={handleTogglePicker}
            disabled={!isEnabled}
            aria-label="Choose coffee question"
          >
            ▾
          </button>
        </div>

        <div className="coffee-row__answer-cell">
          <input
            type="text"
            className="coffee-row__answer-input"
            placeholder={isEnabled ? "Type your answer here" : "Select question above"}
            value={row.answer}
            onChange={handleChangeAnswer}
            disabled={!isEnabled}
          />
        </div>
      </div>

      {/* 490x490 の質問カード */}
      {isPickerOpen && isEnabled && (
        <div className="coffee-question-popup">
          <div className="coffee-question-popup__inner">
            <button
              type="button"
              className="coffee-question-popup__close"
              onClick={() => setIsPickerOpen(false)}
              aria-label="Close question picker"
            >
              ✕
            </button>

            <h3 className="coffee-question-popup__title">Choose a coffee question</h3>
            <p className="coffee-question-popup__subtitle">
              Pick one prompt that feels fun for this line.
            </p>

            <div className="coffee-question-popup__scroll">
              {QUESTION_GROUPS.map((group) => {
                const items = group.items.filter(
                  (item) =>
                    availableKeySet.has(item.key) || item.key === row.questionKey
                );

                if (items.length === 0) return null;

                return (
                  <div key={group.id} className="coffee-question-popup__group">
                    <div className="coffee-question-popup__group-label">
                      {group.label}
                    </div>
                    <ul className="coffee-question-popup__list">
                      {items.map((item) => (
                        <li key={item.key}>
                          <button
                            type="button"
                            className={
                              "coffee-question-popup__item" +
                              (item.key === row.questionKey
                                ? " coffee-question-popup__item--active"
                                : "")
                            }
                            onClick={() => handleSelectQuestion(item.key)}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoffeeQuestionRow;
