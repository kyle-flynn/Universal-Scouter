import * as React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import RestoreIcon from '@material-ui/icons/Restore';
import SaveIcon from '@material-ui/icons/Save';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  BooleanProperty,
  DropdownProperty,
  NumberProperty,
  Property,
  Schema,
  StringProperty
} from 'universal-scouter-shared';

import SchemaProvider, {ISchemasResponse} from '../../providers/SchemaProvider';
import AddPropertyOptionDialog from "../../components/AddPropertyOptionDialog";
import RemoveDialog from "../../components/RemoveDialog";

interface IState {
  editMode: boolean;
  schemas: Schema[];
  schema: Schema;
  markedSchema: Schema;
  propertyIndex: number;
  optionDialogOpen: boolean;
  removeDialogOpen: boolean;
}

class EditorView extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      editMode: false,
      schemas: [],
      schema: new Schema(),
      markedSchema: new Schema(),
      propertyIndex: -1,
      optionDialogOpen: false,
      removeDialogOpen: false
    };

    this.saveSchema = this.saveSchema.bind(this);
    this.updateSchema = this.updateSchema.bind(this);
    this.removeSchema = this.removeSchema.bind(this);
    this.resetSchema = this.resetSchema.bind(this);
    this.addProperty = this.addProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateCompetition = this.updateCompetition.bind(this);
    this.updatePropertyOptions = this.updatePropertyOptions.bind(this);
    this.openOptionDialog = this.openOptionDialog.bind(this);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeOptionDialog = this.closeOptionDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
  }

  public componentDidMount(): void {
    SchemaProvider.getSchemas().then((response: ISchemasResponse) => {
      this.setState({schemas: response.schemas});
    });
  }

  public render() {
    const {editMode, schemas, schema, optionDialogOpen, removeDialogOpen} = this.state;
    const canRemoveProperty: boolean = schema.properties.length > 0;
    const schemaProperties = schema.properties.map((p: Property, i: number) => {
      return this.renderProperty(p, i);
    });

    return (
      <div>
        <AddPropertyOptionDialog open={optionDialogOpen} onClose={this.closeOptionDialog} onAdd={this.updatePropertyOptions}/>
        <RemoveDialog open={removeDialogOpen} title={'Remove Schema'} object={'Schema'} onClose={this.closeRemoveDialog} onRemove={this.removeSchema}/>
        <Typography variant='h3'>Schema Editor</Typography>
        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Schemas</Typography>
          {/*<Typography className='schema-header' variant='subtitle2'>5 Schemas</Typography>*/}
          <Divider/>
          {this.renderSchemas(schemas)}
          {schemas.length <= 0 && <Typography className={'schema-header'} variant='subtitle2'>No schemas were found.</Typography>}
        </Paper>
        <div className='space'/>
        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Create New Schema</Typography>
          <Divider/>
          <div className='schema-paper-content'>
            <Typography variant='body1'>Properties</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField value={schema.name} onChange={this.updateName} fullWidth required label="Name"/>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <TextField value={schema.year} onChange={this.updateYear} fullWidth required label="Year" type='number'/>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField value={schema.description} onChange={this.updateDescription} fullWidth required label="Description"/>
              </Grid>
            </Grid>

            {schemaProperties}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<AddIcon/>}
                  onClick={this.addProperty}
                >
                  Add
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  disabled={!canRemoveProperty}
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<DeleteIcon/>}
                  onClick={this.removeProperty}
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
                  disabled={!canRemoveProperty}
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<SaveIcon/>}
                  onClick={editMode ? this.updateSchema : this.saveSchema}
                >
                  {editMode ? 'Update Schema' : 'Save Schema'}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<RestoreIcon/>}
                  onClick={this.resetSchema}
                >
                  {editMode ? 'Exit Edit Mode' : 'Reset Schema'}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    );
  }

  private async saveSchema(): Promise<any> {
    const {schema, schemas} = this.state;
    schema.id = schemas.length;
    const values = await SchemaProvider.postSchema(schema);
    if (values.error) {
      console.log(values.error);
    } else {
      this.setState({schemas: values.schemas});
    }
  }

  private async updateSchema(): Promise<any> {
    const {schema} = this.state;
    const values = await SchemaProvider.putSchema(schema);
    if (values.error) {
      console.log(values.error);
    } else {
      this.setState({schemas: values.schemas});
    }
  }

  private async removeSchema(): Promise<any> {
    const {markedSchema} = this.state;
    const values = await SchemaProvider.deleteSchema(markedSchema.id);
    if (values.error) {
      console.log(values.error);
    } else {
      this.setState({schemas: values.schemas});
    }
  }

  private resetSchema(): void {
    this.setState({schema: new Schema(), editMode: false});
  }

  private editSchema(schema: Schema): void {
    this.setState({schema, editMode: true});
  }

  private renderSchemas(schemas: Schema[]): React.ReactElement {
    let view: any[] = [];
    for (let i = 0; i < schemas.length; i++) {
      view.push(
        <ListItem key={i} className='schema-list-item' button divider>
          <ListItemText primary={schemas[i].name} onClick={() => this.editSchema(schemas[i])}/>
          <ListItemSecondaryAction>
            <IconButton color='secondary' edge="end" aria-label="delete" onClick={() => this.openRemoveDialog(schemas[i])}>
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

  private renderProperty(property: Property, i: number): React.ReactNode {
    const {schema} = this.state;
    switch (property.type) {
      case "string":
        const stringProp: StringProperty = schema.properties[i] as StringProperty;
        return (
          <Grid key={`Property ${i}`} container spacing={2}>
            {/* String inputs */}
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField value={stringProp.name} fullWidth required label="Property Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyName(i, e.target.value)}/>
            </Grid>
            {this.renderPropertyTypes(i)}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField value={stringProp.defaultValue} fullWidth required label="Default" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyDefaultValue(i, e.target.value)}/>
            </Grid>
          </Grid>
        );
      case "number":
        const numberProp: NumberProperty = schema.properties[i] as NumberProperty;
        return (
          <Grid key={`Property ${i}`} container spacing={2}>
            {/* Number inputs */}
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField value={numberProp.name} fullWidth required label="Property Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyName(i, e.target.value)}/>
            </Grid>
            {this.renderPropertyTypes(i)}
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <TextField value={numberProp.defaultValue} fullWidth required label="Default" type='number' onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyDefaultValue(i, e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <TextField value={numberProp.min} fullWidth required label="Min Value" type='number' onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyMin(i, e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <TextField value={numberProp.max} fullWidth required label="Max Value" type='number' onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyMax(i, e.target.value)}/>
            </Grid>
          </Grid>
        );
      case "boolean":
        const booleanProp: BooleanProperty = schema.properties[i] as BooleanProperty;
        return (
          <Grid key={`Property ${i}`} container spacing={2}>
            {/* Boolean inputs */}
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField value={booleanProp.name} fullWidth required label="Property Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyName(i, e.target.value)}/>
            </Grid>
            {this.renderPropertyTypes(i)}
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <FormControl fullWidth>
                <InputLabel id="property-boolean-label">Default Value</InputLabel>
                <NativeSelect
                  value={booleanProp.defaultValue}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.updatePropertyDefaultValue(i, e.target.value)}
                  inputProps={{
                    name: 'property-type',
                    id: 'property-type-label-placeholder',
                  }}
                >
                  <option value={'true'}>True</option>
                  <option value={'false'}>False</option>
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
        );
      case "dropdown":
        const dropdownProp: DropdownProperty = schema.properties[i] as DropdownProperty;
        return (
          <Grid key={`Property ${i}`} container spacing={2}>
            {/* Dropdown inputs */}
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField value={dropdownProp.name} fullWidth required label="Property Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyName(i, e.target.value)}/>
            </Grid>
            {this.renderPropertyTypes(i)}
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id="property-dropdown-label">Options</InputLabel>
                <NativeSelect
                  value={dropdownProp.defaultValue}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.updatePropertyDefaultValue(i, e.target.value)}
                  inputProps={{
                    name: 'property-dropdown',
                    id: 'property-dropdown-label-placeholder',
                  }}
                >
                  {
                    dropdownProp.options.map((opt: string, j: number) => {
                      return (
                        <option key={`Property ${i} option ${j}`} value={opt}>{opt}</option>
                      );
                    })
                  }
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} className={'center-items-end'}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<AddIcon/>}
                onClick={() => this.openOptionDialog(i)}
              >
                Add Option
              </Button>
            </Grid>
          </Grid>
        );
      default:
        const defaultProp: StringProperty = schema.properties[i] as StringProperty;
        return (
          <Grid key={`Property ${i}`} container spacing={2}>
            {/* String inputs */}
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField value={defaultProp.name} fullWidth required label="Property Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyName(i, e.target.value)}/>
            </Grid>
            {this.renderPropertyTypes(i)}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField value={defaultProp.defaultValue} fullWidth required label="Default" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.updatePropertyDefaultValue(i, e.target.value)}/>
            </Grid>
          </Grid>
        );
    }
  }

  private renderPropertyTypes(i: number) {
    const {schema} = this.state;
    const property: Property = schema.properties[i];
    return (
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormControl fullWidth>
          <InputLabel id="property-type-label">Property Type</InputLabel>
          <NativeSelect
            value={property.type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.updatePropertyType(i, e.target.value)}
            inputProps={{
              name: 'property-type',
              id: 'property-type-label-placeholder',
            }}
          >
            <option value={'string'}>Alphanumeric</option>
            <option value={'number'}>Numeric</option>
            <option value={'boolean'}>True/False</option>
            <option value={'dropdown'}>Dropdown</option>
          </NativeSelect>
        </FormControl>
      </Grid>
    )
  }

  private addProperty(): void {
    const {schema} = this.state;
    schema.properties.push(new Property("string", ""));
    this.forceUpdate();
  }

  private removeProperty(): void {
    const {schema} = this.state;
    schema.properties.splice(schema.properties.length - 1, 1);
    this.forceUpdate();
  }

  private updateName(event: React.ChangeEvent<HTMLInputElement>) {
    const {schema} = this.state;
    schema.name = event.target.value;
    this.forceUpdate();
  }

  private updateYear(event: React.ChangeEvent<HTMLInputElement>) {
    const {schema} = this.state;
    schema.year = parseInt(event.target.value, 10);
    this.forceUpdate();
  }

  private updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
    const {schema} = this.state;
    schema.description = event.target.value;
    this.forceUpdate();
  }

  private updateCompetition(event: React.ChangeEvent<HTMLInputElement>) {
    const {schema} = this.state;
    schema.competition = event.target.value;
    this.forceUpdate();
  }

  private updatePropertyName(i: number, value: string): void {
    const {schema} = this.state;
    schema.properties[i].name = value;
    this.forceUpdate();
  }

  private updatePropertyDefaultValue(i: number, value: any): void {
    const {schema} = this.state;
    switch (schema.properties[i].type) {
      case 'string':
        const stringProp: StringProperty = schema.properties[i] as StringProperty;
        stringProp.defaultValue = value;
        break;
      case 'number':
        const numberProp: NumberProperty = schema.properties[i] as NumberProperty;
        numberProp.defaultValue = parseInt(value, 10);
        break;
      case 'boolean':
        const booleanProp: BooleanProperty = schema.properties[i] as BooleanProperty;
        booleanProp.defaultValue = value.toString() === 'true';
        break;
      case 'dropdown':
        const dropdownProp: DropdownProperty = schema.properties[i] as DropdownProperty;
        dropdownProp.defaultValue = value;
        break;
      default:
        const defaultProp: StringProperty = schema.properties[i] as StringProperty;
        defaultProp.defaultValue = value;
    }
    this.forceUpdate();
  }

  private updatePropertyMin(i: number, value: any): void {
    const {schema} = this.state;
    (schema.properties[i] as NumberProperty).min = parseInt(value, 10);
    this.forceUpdate();
  }

  private updatePropertyMax(i: number, value: any): void {
    const {schema} = this.state;
    (schema.properties[i] as NumberProperty).max = parseInt(value, 10);
    this.forceUpdate();
  }

  private updatePropertyType(i: number, type: string): void {
    const {schema} = this.state;
    const oldProperty: Property = schema.properties[i];
    switch (type) {
      case 'string':
        schema.properties[i] = new StringProperty(oldProperty.name);
        break;
      case 'number':
        schema.properties[i] = new NumberProperty(oldProperty.name);
        break;
      case 'boolean':
        schema.properties[i] = new BooleanProperty(oldProperty.name);
        break;
      case 'dropdown':
        schema.properties[i] = new DropdownProperty(oldProperty.name);
        break;
      default:
        schema.properties[i] = new StringProperty(oldProperty.name);
    }
    this.forceUpdate();
  }

  private updatePropertyOptions(option: string): void {
    const {schema, propertyIndex} = this.state;
    (schema.properties[propertyIndex] as DropdownProperty).options.push(option);
    this.forceUpdate();
  }

  private openOptionDialog(i: number): void {
    this.setState({optionDialogOpen: true, propertyIndex: i});
  }

  private openRemoveDialog(schema: Schema): void {
    this.setState({removeDialogOpen: true, markedSchema: schema});
  }

  private closeOptionDialog(): void {
    this.setState({optionDialogOpen: false});
  }

  private closeRemoveDialog(): void {
    this.setState({removeDialogOpen: false});
  }
}

export default EditorView;