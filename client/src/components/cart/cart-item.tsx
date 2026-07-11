import { Card, CardImg } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
function CartItem() {
  return (
    <Card style={{ width: '15rem', padding:'0' }}>
        <Link to="/products/$productId">
            <CardImg variant="top" src="/images/unoDeck.webp" alt="Product Image" />
            <Card.Body>
                    <Card.Title>Product Title</Card.Title>
                    <Card.Text>
                        $0.99
                    </Card.Text>
            </Card.Body>
        </Link>

    </Card>
  );
}

export default CartItem;