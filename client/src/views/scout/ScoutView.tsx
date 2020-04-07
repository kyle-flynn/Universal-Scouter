import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import RestoreIcon from "@material-ui/icons/Restore";

class ScoutView extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Typography variant='h3'>Scouting Data</Typography>
        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Schemas</Typography>
          <Divider/>
          <div className='schema-paper-content'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="schema-native-helper">Schema</InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: 'schema',
                      id: 'schema-native-helper',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </NativeSelect>
                  <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </Paper>

        <div className='space'/>

        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Schema</Typography>
          <Divider/>
          <div className='schema-paper-content'>
            <Typography variant='body1'>Category 1</Typography>

            <br/>
            <Divider/>
            <Typography variant='body1'>Actions</Typography>
            <br/>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<SaveIcon/>}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<RestoreIcon/>}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }

  private renderSchemas(elementNumber: number): React.ReactElement {
    let view: any[] = [];
    for (let i = 0; i < elementNumber; i++) {
      view.push(
        <ListItem key={i} className='schema-list-item' button divider>
          <ListItemText primary={`Schema ${i + 1}`}/>
          <ListItemSecondaryAction>
            <IconButton color='secondary' edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }
    return (
      <List className='schema-list'>
        {view}
      </List>
    );
  }
}

export default ScoutView;