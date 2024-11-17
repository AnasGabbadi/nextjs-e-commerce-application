"use client";
import { useRouter } from 'next/router';
import { useState } from 'react';

export const PropertyChekout = () => {
    const router = useRouter();
    const { title, quantite, prix, categorie } = router.query;
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <h2>{title}</h2>
            <p>Catégorie: {categorie}</p>
            <p>Prix unitaire: {prix}</p>
            <p>Quantité disponible: {quantite}</p>
            <div>
                <label>Quantité à acheter:</label>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    max={quantite}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <p>Total: {prix * quantity}</p>
        </div>
    );
};
