import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

interface IProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

class AlertDialog extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { open, message, onClose } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle id="alert-dialog-title">App Alert</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className={'blue'} onClick={onClose}>Okay</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;