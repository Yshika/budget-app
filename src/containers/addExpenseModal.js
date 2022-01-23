import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { useRef } from "react";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpenses, budgets } = useBudgets();

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpenses({
      description: descRef?.current?.value,
      amount: parseFloat(amountRef?.current?.value),
      budgetId: budgetIdRef?.current?.value,
    });
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descRef} required />
          </Form.Group>

          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              ref={amountRef}
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          <Form.Group controlId="budgetId" className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
