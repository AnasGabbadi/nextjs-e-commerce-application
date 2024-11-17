import { faCheck, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PropertyFeatures = ({description, quantite, occasion, neuf, prix, categorie, destination}) => {
    return (
        <div className="text-3xl">
            {description}
            <div className="flex justify-between text-sm mt-3">
                <div>
                    <FontAwesomeIcon icon={faBasketShopping}/>
                    <span className="pl-2">{quantite} pièces disponibles</span>
                </div> 
            </div>
            <div className="flex justify-center text-sm -mt-5">
                <span>
                    {!!neuf && <> <FontAwesomeIcon icon={faCheck}/> produit neuf </>}
                    {!!occasion && <> <FontAwesomeIcon icon={faCheck}/> produit occasion </>}
                </span>
            </div>
            <a href={destination} className="btn">
                <div className="-mt-2">
                    <span className="text-lg">Finaliser l'achat</span>
                </div>
            </a>
        </div>
    );
}