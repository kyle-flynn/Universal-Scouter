import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";

interface IProps {
  open: boolean;
  onClose: () => void;
  onAdd: (option: string) => void;
}

interface IState {
  option: string;
}

class AddPropertyOptionDialog extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      option: ""
    };

    this.cancelEdit = this.cancelEdit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.updateOption = this.updateOption.bind(this);
  }

  public render() {
    const {open, onClose} = this.props;
    const {option} = this.state;

    return (
      <div>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle id="alert-dialog-title">Add Option</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="option"
                  label="Option Name"
                  type="text"
                  value={option}
                  onChange={this.updateOption}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button className={'success'} onClick={this.onAdd}>Add</Button>
            <Button className={'error'} onClick={this.cancelEdit}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  private cancelEdit() {
    const {onClose} = this.props;
    this.setState({option: ''});
    onClose();
  }

  private onAdd() {
    const {onClose, onAdd} = this.props;
    const {option} = this.state;
    onClose();
    onAdd(option);
  }

  private updateOption(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({option: event.target.value});
  }
}

export default AddPropertyOptionDialog;