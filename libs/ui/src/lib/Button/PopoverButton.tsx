import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, RefObject } from "react"
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

interface PopoverButtonProps {
	ref?: RefObject<HTMLButtonElement>;
	style?: CSSProperties;
	buttonStyle?: CSSProperties;
	onClick?(event: React.MouseEvent): void;
	title?: string;
	text?: string;
	id: string;
	buttonText: string | JSX.Element;
	variant?: string;
	isNotButton?: boolean;
	disabled? : boolean
	isShow?: boolean;
	onToggle?: (next: boolean)=> void;
}

export function PopoverButton(props:PopoverButtonProps): JSX.Element {
    const title: string = props.title || 'Are you sure?';
    const style: CSSProperties = {
        ...props.style
	}
	const notButtonStyle: CSSProperties  = {
		...props.style,
		backgroundColor: 'transparent',
		border: 'none',
	}
    const popoverDiv = (
    	<Popover id={props.id} style={style} >
		  <Popover.Header as="h5" style={{fontSize:'15px'}}>{title}</Popover.Header>
		  <Popover.Body style={{fontSize:'14px'}}>
              <p>{props.text}</p>
			<div>
			  <Button 
				size={"sm"}
				variant={"primary"}
                style={{padding: '1px 5px'}}
				onClick={props.onClick}
				ref={props.ref}
				data-confirm={'YES'}
			  >
				<FontAwesomeIcon icon={faCheck}/>
				{" Yes"}
			  </Button>
			
			
			  <Button 
			  	
				size={"sm"}
				variant={"light"}
				style={{padding: '1px 5px'}}
				onClick={()=>{
					if (props.onToggle !== undefined) {
						props.onToggle(false)
					}
				}}
				data-confirm={'No'}
			  >
				<FontAwesomeIcon icon={faTimes}/>
				{" No"}
			  </Button>
			</div>
		  </Popover.Body>
		</Popover>
	);
    
    return (
		<OverlayTrigger 
			trigger="focus" 
			placement="top" 
			overlay={popoverDiv}
			show={props.isShow}
			onToggle={(next)=>{
				if (props.onToggle !== undefined) {
					props.onToggle(next)
				}
			}}
		>
			{ (props.isNotButton === true)? 
				<button 
					style={notButtonStyle}
					disabled={props.disabled}
					id={`${props.id}Button`}
				>
					{props.buttonText}
				</button>
			:
				<Button 
					variant={props.variant || "primary"} 
					style={props.buttonStyle}
					disabled={props.disabled}
					id={`${props.id}Button`}
				>
					{props.buttonText}
				</Button>
			}
		</OverlayTrigger>
    )
}