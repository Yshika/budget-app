import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import "./App.scss";
import AddBudgetModal from "./containers/AddBudgetModal";
import AddExpenseModal from "./containers/addExpenseModal";
import BudgetCard from "./containers/BudgetCard";
import TotalBudgetCard from "./containers/TotalBudgetCard";
import UncategorizedBudgetCard from "./containers/UncategorizedBudgetCard";
import ViewExpensesModal from "./containers/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div className="card-container">
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                openAddExpenseClick={() => {
                  openAddExpenseModal(budget.id);
                }}
                onViewExpensesClick={() => {
                  setViewExpensesModalBudgetId(budget.id);
                }}
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            openAddExpenseClick={() => {
              openAddExpenseModal();
            }}
            onViewExpensesClick={() => {
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID);
            }}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default App;
