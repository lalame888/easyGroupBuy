import { PageState } from "@easy-group-buy/data";
import { useReduxSelector } from "@easy-group-buy/redux"
import { CSSProperties } from "react"
import { ContactUsPage } from "./ContactUsPage/ContactUsPage";
import { HelpPage } from "./HelpPage/HelpPage";
import { InfoPage } from "./InfoPage/InfoPage";
import { OpenGroupPage } from "./OpenGroupPage/OpenGroupPage";

export function WorkSpace(){
    const style: CSSProperties = {
        //
        }
    const pageState: PageState = useReduxSelector((state)=> state.pageSelect.pageState);
    return(
        <div style={style}>
            {pageState === PageState['開團'] && <OpenGroupPage/>}
            {pageState === PageState['使用說明'] && <HelpPage/>}
            {pageState === PageState['關於輕鬆開好團'] && <InfoPage/>}
            {pageState === PageState['聯絡我們'] && <ContactUsPage/>}
        </div>
    )
}