import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

interface IProps {
  open: boolean;
  title: string;
  object: string;
  onClose: () => void;
  onRemove: () => void;
}

class RemoveDialog extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { object, open, title, onClose, onRemove } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove this {object}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={'success'} onClick={onRemove}>Yes</Button>
            <Button className={'error'} onClick={onClose}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RemoveDialog;