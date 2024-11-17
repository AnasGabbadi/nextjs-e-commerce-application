import { gql } from "@apollo/client";
import client from "client";
import { cleanAndtransformBlocks } from "./cleanAndtransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {  
  const uri  = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
    const {data} = await client.query({
      query: gql`
        query PageQuery($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {   
              id
              title
              blocks(postTemplate: false)
              seo {
                title
                metaDesc
              }
            }
            ... on Property {   
              id
              title
              blocks(postTemplate: false)
              seo {
                title
                metaDesc
              }
            }
          }
          acfOptionsMainMenu {
            mainMenu {
              callToActionButton {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
              }
              menuItems {
                menuItem {
                  label
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                }
                items {
                  label
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        uri,
      }
    });
    const blocks = cleanAndtransformBlocks(data.nodeByUri.blocks); 
    return {
      props: {
        seo: data.nodeByUri.seo,
        title: data.nodeByUri.title,
        propertyFeatures: data.nodeByUri.propertyFeatures || null,
        featuredImage: data.nodeByUri.featuredImage?.node?.sourceUrl || null,
        mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
        callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
        callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
        blocks,
      },
    };
  };