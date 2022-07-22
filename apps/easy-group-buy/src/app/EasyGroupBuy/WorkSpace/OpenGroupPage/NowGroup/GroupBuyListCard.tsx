
import { GroupBuyObject, GroupBuyStatus, UserInfo } from "@easy-group-buy/data";
import { CSSProperties } from "react"
import { getKeyByValue } from '@easy-group-buy/utils'
import { Button } from "react-bootstrap";
import { HoverButton, MyHoverButton } from '@easy-group-buy/ui'
import { useReduxSelector } from "@easy-group-buy/redux";

interface GroupBuyListCardProps {
    groupBuyObject: GroupBuyObject
    style?: CSSProperties
}

export function GroupBuyListCard(props: GroupBuyListCardProps ){
    const userInfo: UserInfo = useReduxSelector((state)=> state.userInfo) as UserInfo
    const style: CSSProperties = {
        display: 'flex',
        width: '100%',
        border: '1px #275C4C solid',
        borderRadius: '15px',
        padding: '30px',
        position: 'relative',
        justifyContent: 'space-between',
        ...props.style

    }
    const imageDivStyle: CSSProperties = {
        width: '130px', 
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid'

    }
    const imageStyle: CSSProperties = {
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto'
    }
    const infoDivStyle: CSSProperties = {
        margin:'0px 20px'
    }
    const tilteStyle: CSSProperties = {
        fontSize: '25px',
        marginBottom: '5px'
    }
    const infoStyle: CSSProperties = {
        fontSize: '15px',
        marginBottom: '5px'
    }
    
    const buttonDivStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'

    }
    const buttonStyle: CSSProperties = {
        margin: '8px 0px'
    }
    function deleteGroup(){
        // TODO
    }

    function cancleOrder(){
        // TODO
    }
    
    return(
        <div style={style}>
            <div style={{display: 'flex'}}>
                <div style={imageDivStyle}>
                    <img
                        style={imageStyle}
                        src={props.groupBuyObject.store.storeImage  || 'https://rimage.gnst.jp/livejapan.com/public/img/common/noimage.jpg?20210620050154&q=80&rw=616'}
                        alt={props.groupBuyObject.store.name}
                    />
                </div>
                <div style={infoDivStyle}>
                    <p style={tilteStyle}>{`${props.groupBuyObject.title} - ${props.groupBuyObject.store.name}`}</p>
                    <p style={infoStyle}>開團人：{props.groupBuyObject.builder.userName}</p>
                    <p style={infoStyle}>參團人數：{props.groupBuyObject.joinListLength}</p>
                    <p style={infoStyle}>團單狀態：{getKeyByValue(GroupBuyStatus,props.groupBuyObject.statues)}</p>
                </div>
            </div>
            <div style={buttonDivStyle}>
                {
                    (props.groupBuyObject.builder.userName === userInfo.userName) ?
                        <MyHoverButton style={buttonStyle} onClick={deleteGroup}>刪除團單</MyHoverButton>
                    : (props.groupBuyObject.statues === GroupBuyStatus['開放跟團中']) ? 
                        <MyHoverButton style={buttonStyle} onClick={cancleOrder}>取消跟團</MyHoverButton>:
                        <MyHoverButton style={buttonStyle} disabled={true} >不可取消</MyHoverButton>


                }
                <MyHoverButton style={buttonStyle}>查看訂單</MyHoverButton>

            </div>
        </div>
    )
}