import { faCheck, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import numeral, { Numeral } from "numeral";

export const PropertyCard = ({title, destination, quantite, occasion, prix, neuf, image}) => {
    return (
        <a href={destination} className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200">            
            <div className="flex w-full">
                <Image src={image} style={{height: "200px", width: "300px"}} width={200} height={300} objectFit="cover"/>
            </div>
            <div className="mt-5 text-2xl font-bold justify-center flex">{title}</div>
            <div className="text-lg top-8 justify-center flex mt-4 mb-6">{numeral(prix).format("0,0")} MAD</div>
            <div className="flex justify-between text-sm mt-3">
                <div>
                    <FontAwesomeIcon icon={faBasketShopping}/>
                    <span className="pl-2">{quantite} pièces disponibles</span>
                </div> 
            </div>
            {(!!occasion || !!neuf)
            && ( 
                <div className="flex text-sm justify-between -mt-5">
                    <div className="ml-40">{!!occasion && <> <FontAwesomeIcon icon={faCheck}/> produit occasion </>}</div>
                    <div>{!!neuf && <> <FontAwesomeIcon icon={faCheck}/> produit neuf </>}</div>
                </div>
            )}
        </a>
    );
};
