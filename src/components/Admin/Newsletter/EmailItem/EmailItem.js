import React, {useState} from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react"
import "./EmailItem.scss";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";

const newsletterController = new Newsletter();

export function EmailItem(props) {
    const { email, onReload } = props;
    const { accessToken } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false)

    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onDelete = async () => {
        try {
            await newsletterController.remove(accessToken, email._id);

            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className="email-item">
            <div className="email-item__info">
                <span>{email.email}</span>
            </div>

            <div>
                <Button icon color="red"  onClick={onOpenCloseConfirm}>
                    <Icon name="trash"/>
                </Button>
            </div>
        </div>

        <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Eliminar ${email.email}`}
        size="mini"
        />
    </>
  )
}
