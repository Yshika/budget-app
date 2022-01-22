import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  // budgets:{id:
  // name:
  // max:}

  // expenses:{
  //   id:
  //   budgetId:
  //   amount:
  //   description
  // }
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addBudget = (name, max) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name))
        return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };
  const addExpenses = (description, amount, budgetId) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  };
  const deleteBudget = ({ id }) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };

  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpenses,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
