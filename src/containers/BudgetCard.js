import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFomatter } from "../utils";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  openAddExpenseClick,
  hideButtons,
  onViewExpensesClick,
}) => {
  const classNames = [];

  if (amount > max) classNames.push("bg-danger", "bg-opacity-10");
  else if (gray) classNames.push("bg-light");

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFomatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFomatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          ></ProgressBar>
        )}
        {!hideButtons && (
          <Stack direction="horizontal" className="mt-4" gap="2">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={openAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};

export default BudgetCard;
