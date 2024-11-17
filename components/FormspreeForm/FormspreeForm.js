"use client";
import { ValidationError, useForm } from "@formspree/react";
import { Input } from "components/Input";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const FormspreeForm = ({formId}) => {
    const searchParams = useSearchParams();
    const nom = searchParams.get('nom');
    const quantite = searchParams.get('quantite');
    const prix = searchParams.get('prix');
    const [quantity, setQuantity] = useState(1);
    const [state, handleSubmit] = useForm(formId);
    
    if (state.succeeded) {
        return <p className="max-w-5xl mx-auto my-64 text-2xl">Thanks for joining!</p>;
    }

    const inputStyle = {
        padding: '0.6rem',
        width: '410px'
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto my-5 mb-12">
            <label htmlFor="Nom et prénom">
                Nom et prénom
            </label>
            <Input
                id="Nom et prénom"
                type="text"
                name="Nom et prénom"
                placeholder="Alex..."
                style={inputStyle}
            />

            <label htmlFor="Téléphone">
                Téléphone
            </label>
            <Input
                id="Téléphone"
                type="tel"
                name="Téléphone"
                placeholder="06-3456-7890"
                style={inputStyle}  
            />
            <ValidationError
                prefix="Téléphone"
                field="Téléphone"
                errors={state.errors}
            />

            <label htmlFor="Ville">
                Ville
            </label>
            <Input
                id="Ville"
                type="text"
                name="Ville"
                placeholder="Ville"
                style={inputStyle}
            />
            <ValidationError
                prefix="Ville"
                field="Ville"
                errors={state.errors}
            />

            <label htmlFor="Produit">
                Nom du produit
            </label>
            <Input
                id="Produit"
                type="text"
                name="Produit"
                value={nom}
                style={inputStyle}
            />
            <ValidationError
                prefix="Produit"
                field="Produit"
                errors={state.errors}
            />

            <label htmlFor="Quantité">
                Quantité
            </label>
            <Input
                id="Quantite"
                type="number"
                name="Quantite"
                value={quantity}
                min="1"
                max={quantite}
                onChange={(e) => setQuantity(e.target.value)}
                style={inputStyle}
            />

            <label htmlFor="Total">
                Prix Total
            </label>
            <Input
                id="Total"
                type="number"
                name="Total"
                value={prix * quantity}
                style={inputStyle}
            />
            <div>
                <button className="btn" type="submit" disabled={state.submitting}>
                    Submit
                </button>
            </div>
        </form>
    );
};
