import { PropertyCard } from "./PropertyCard";

export const Results = ({properties}) => {
    return (
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
            {properties.map(property => (
                <PropertyCard 
                    key={property.databaseId} 
                    title={property.title}
                    destination={property.uri}
                    prix={property.propertyFeatures.prix}
                    occasion={property.propertyFeatures.occasion}
                    neuf={property.propertyFeatures.neuf}
                    quantite={property.propertyFeatures.quantite}
                    categorie={property.propertyFeatures.categorie}
                    image={property.featuredImage?.node?.sourceUrl}
                />
            ))}
        </div>
    );
};