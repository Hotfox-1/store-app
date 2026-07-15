import { Carousel, Row } from "react-bootstrap";
import ProductCard from "./product-card";
import { useState } from "react";
import './products-list.css';

interface ProductsListProps {
  sectionName: string;
}

function ProductsList({ sectionName }: ProductsListProps) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };
    const rows = [1, 2, 3]
    const cards = [1, 2, 3, 4]
    return (
        <section className="flex flex-column">
            <h2 className="product-list-name">{sectionName}</h2>
            <Carousel activeIndex={index} onSelect={handleSelect} variant="dark" indicators={false} interval={null}>
                {rows.map((row) => (
                    <Carousel.Item key={row}>
                        <Row className="product-row justify-center">
                            {cards.map((card) => (
                                <ProductCard key={card} />
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
  );
}

export default ProductsList;