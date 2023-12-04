import React, {useState} from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const TicketPricingCard = ({
  regularPrice,
  tuesdayDiscountedPrice,
  before6pmDiscountedPrice,
  onSave,
}) => {
  const [editableRegularPrice, setEditableRegularPrice] = useState(regularPrice);
  const [editableTuesdayDiscountedPrice, setEditableTuesdayDiscountedPrice] = useState(tuesdayDiscountedPrice);
  const [editableBefore6pmDiscountedPrice, setEditableBefore6pmDiscountedPrice] = useState(before6pmDiscountedPrice);

  const handleSave = () => {
    onSave({
      regularPrice: editableRegularPrice,
      tuesdayDiscountedPrice: editableTuesdayDiscountedPrice,
      before6pmDiscountedPrice: editableBefore6pmDiscountedPrice,
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Ticket Pricing</Typography>
        <div>
          <TextField
            label="Regular Price"
            type="number"
            value={editableRegularPrice}
            onChange={(e) => setEditableRegularPrice(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Tuesday Discounted Price"
            type="number"
            value={editableTuesdayDiscountedPrice}
            onChange={(e) => setEditableTuesdayDiscountedPrice(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Before 6pm Discounted Price"
            type="number"
            value={editableBefore6pmDiscountedPrice}
            onChange={(e) => setEditableBefore6pmDiscountedPrice(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default TicketPricingCard;
