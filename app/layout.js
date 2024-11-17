import {Poppins, Aboreto} from 'next/font/google';
import "../styles/globals.css";
import { getMenu } from "utils/getMenu";
import { MainMenu } from "components/MainMenu";
import { config } from '@fortawesome/fontawesome-svg-core';
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false;

export default async function RootLayout({children}) {
    const data = await getMenu();
    return (
        <html lang="en">
            <body className="font-body">
                <MainMenu callToActionDestination={data.callToActionDestination} callToActionLabel={data.callToActionLabel} items={data.mainMenuItems}/>
                {children}
            </body>
        </html>
    );
}