import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Group } from "components/Group";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PropertyChekout } from "components/PropertyChekout";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => {
    return blocks.map(block => {
        switch(block.name){
            case "core/gallery" : {
                return (
                    <Gallery 
                        key={block.id} columns={block.attributes.columns || 3}
                        cropImages={block.attributes.imageCrop}
                        items={block.innerBlocks}
                    />
                );
            }
            case "acf/propertychekout" : {
                return <PropertyChekout key={block.id}/>
            }
            case "acf/formspreeform" : {
                return <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
            }
            case "acf/prpertyfeatures" : {
                const destinationUrl = `/contact?nom=${block.attributes.nom}&quantite=${block.attributes.quantite}&prix=${block.attributes.prix}&categorie=${block.attributes.categorie}`;
                return (
                    <PropertyFeatures 
                        key={block.id} description={block.attributes.description} 
                        quantite={block.attributes.quantite} 
                        occasion={block.attributes.occasion} 
                        neuf={block.attributes.neuf} 
                        prix={block.attributes.prix} 
                        categorie={block.attributes.categorie}
                        destination={destinationUrl}
                    />
                );
            }
            case "acf/propertysearch" : {
                return (
                    <PropertySearch key={block.id}/>
                );
            }
            case "acf/ctabutton" : {
                return (
                    <CallToActionButton 
                        key={block.id}
                        buttonLabel={block.attributes.data.label}
                        destination={block.attributes.data.destination || "/"}
                        align={block.attributes.data.align}
                    />
                );
            }
            case "core/cover" : {
                return (
                <Cover key={block.id} background={block.attributes.url} blocks={block.attributes.id}>
                    <BlockRenderer blocks={block.innerBlocks}/>
                </Cover>
                );
            }
            case "core/image" : {
                return (
                    <Image 
                        key={block.id}
                        src={block.attributes.url}
                        height={block.attributes.height}
                        width={block.attributes.width}
                        alt={block.attributes.alt || ""}
                    />
                );
            }
            case "core/paragraph" : {
                return (
                    <Paragraph
                        key={block.id}
                        textAlign={block.attributes.textAlign}
                        content={block.attributes.content}
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                    />
                );
            }
            case "core/post-title" :
            case "core/heading" : {
                return (
                    <Heading 
                        key={block.id} 
                        textAlign={block.attributes.textAlign}
                        level={block.attributes.level}
                        content={block.attributes.content}
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                    />
                );
            }
            case "core/columns" : {
                console.log("COLUMNS : ", block.attributes);
                return (
                    <Columns 
                        key={block.id}
                        isStackedOnMobile = {block.attributes.isStackedOnMobile}
                        textColor={
                            theme[block.attributes.textColor] || 
                            block.attributes.style?.color?.text
                        }
                        backgroundColor = {
                            theme[block.attributes.backgroundColor] || 
                            block.attributes.style?.color?.background
                        }
                    >
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Columns>
                );
            }
            case "core/column" : {
                return (    
                    <Column 
                        key={block.id} 
                        width={block.attributes ? block.attributes.width : undefined}
                        textColor={block.attributes ? block.attributes.textColor : undefined}
                    >
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Column>
                );
            }
            case "core/group" : 
            case "core/block" : {
                return (
                    <Group>
                        <BlockRenderer key={block.id} blocks={block.innerBlocks} style={{ backgroundColor: block.innerBlocks }}/>
                    </Group>
                );
            }
            default: {
                console.log("UNKNOWN:", block);
                return null;
            } 
        }
    });
};