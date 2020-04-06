import * as React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class EditorView extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Typography variant='h3'>Schema Editor</Typography>
        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Schemas</Typography>
          {/*<Typography className='schema-header' variant='subtitle2'>5 Schemas</Typography>*/}
          <Divider/>
          {this.renderSchemas(3)}
        </Paper>
        <div className='space'/>
        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Create New Schema</Typography>
          <Divider/>
          <div className='schema-paper-content'>
            <Typography variant='body1'>Properties</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Year" type='number'/>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField fullWidth required label="Description"/>
              </Grid>
              {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
                {/*<TextField fullWidth label="Competition"/>*/}
              {/*</Grid>*/}
            </Grid>

            <Grid container spacing={2}>
              {/* String inputs */}
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Type" value='String'/>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField fullWidth required label="Default"/>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Number inputs */}
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Type" value='Number'/>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <TextField fullWidth required label="Default" type='number'/>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <TextField fullWidth required label="Min Value" type='number'/>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <TextField fullWidth required label="Max Value" type='number'/>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Boolean inputs */}
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Type" value='True/False'/>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <TextField fullWidth required label="Default" value='True'/>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Dropdown inputs */}
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth required label="Property Type" value='Dropdown'/>
              </Grid>
              <Grid item xs={12} sm={6} md={2} lg={2}>
                <TextField fullWidth required label="Default" value='True'/>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <TextField fullWidth required label="Options" value='True'/>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                >
                  Add
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>

            <br/>
            <Divider/>
            <Typography variant='body1'>Categories</Typography>
            <br/>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField fullWidth label="Category Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={9} lg={9}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Properties</InputLabel>
                  <Select
                    labelId="category-checkbox-label"
                    multiple
                    value={['Property 3']}
                    input={<Input />}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    MenuProps={MenuProps}
                  >
                    {this.renderProperties(5)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <br/>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                >
                  Add
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>

            <br/>
            <Divider/>
            <Typography variant='body1'>Actions</Typography>
            <br/>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                >
                  Save Schema
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                >
                  Reset Schema
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

  private renderProperties(elementNumber: number): React.ReactElement[] {
    let view: React.ReactElement[] = [];
    for (let i = 0; i < elementNumber; i++) {
      view.push(
        <MenuItem key={`property-${i}`} value={`Property ${i}`}>
          <Checkbox/>
          <ListItemText primary={`Property ${i}`} />
        </MenuItem>
      );
    }
    return view;
  }
}

export default EditorView;