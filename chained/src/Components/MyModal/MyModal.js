import React, { useContext } from "react";
import { Modal } from "@material-ui/core";
import PeopleYouFollowContext from "../../Contexts/PeopleYouFollowContext";
import Styles from "./MyModal.module.css";
export default function MyModal(props) {
	const { header, handleClose, open } = props;
	/* const { IsPeopleYouFollowOpen, setIsPeopleYouFollowOpen } = useContext(
		PeopleYouFollowContext
	); */
	/* const handleClose = () => {
		setIsPeopleYouFollowOpen(false);
	}; */
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				disableAutoFocus={true}
			>
				<div className={Styles.ModalContainer}>
					<div className={Styles.Row1}>
						<div onClick={handleClose} className={Styles.backButton}>
							<p className={Styles.text}>Back</p>
						</div>
						<h3 className={Styles.title}>{header}</h3>
						<div className={Styles.OkButton}>
							<p className={Styles.text}>Ok</p>
						</div>
					</div>
					<div></div>
				</div>
			</Modal>
		</div>
	);
}
