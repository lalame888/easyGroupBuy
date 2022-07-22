
import React, { CSSProperties } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { OverlayTriggerType } from "react-bootstrap/esm/OverlayTrigger";
import { Placement } from "react-bootstrap/esm/types";

export interface TooltipButtonProps {
	placement?: Placement;
	tootipText: string;
	style?: CSSProperties;
	buttonStyle?: CSSProperties;
	onClick?(event: React.MouseEvent): void;
	id: string;
	buttonText: string | JSX.Element;
	variant?: string;
	disabled? : boolean,
	trigger?: OverlayTriggerType | OverlayTriggerType[],
	show?: boolean
}

export function TooltipButton(props:TooltipButtonProps): JSX.Element {
	const defaultStyle: CSSProperties = {
		cursor: 'pointer',
		display: 'inline-block',
		background: 'transparent',
		border: 'none'
	}
    return (
		<OverlayTrigger
			trigger={props.trigger || ['focus','hover']}
			placement={props.placement}
			overlay={
				<Tooltip id={props.id}>
					{props.tootipText}
				</Tooltip>
			}
			show={props.show}
		>
			{(props.variant)?
			<Button
				variant={props.variant}
				style={props.buttonStyle}
				disabled={props.disabled}
				onClick={props.onClick}
			>
				{props.buttonText}
			</Button> :
			<button 
				style={{...defaultStyle,...props.buttonStyle}}
				onClick={props.onClick}
				disabled={props.disabled}
			>
				{props.buttonText}
			</button>
			}
			
		</OverlayTrigger>
    )
}