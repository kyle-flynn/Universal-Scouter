import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import RestoreIcon from "@material-ui/icons/Restore";
import {
  BooleanProperty,
  DropdownProperty,
  NumberProperty,
  Property,
  Schema,
  SchemaEntry,
  StringProperty
} from 'universal-scouter-shared';
import SchemaProvider, {ISchemasResponse} from "../../providers/SchemaProvider";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface IState {
  schemas: Schema[];
  schema: Schema;
  entry: SchemaEntry;
}

class ScoutView extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      schemas: [],
      schema: new Schema(),
      entry: new SchemaEntry()
    };

    this.selectSchema = this.selectSchema.bind(this);
    this.saveSchema = this.saveSchema.bind(this);
    this.resetSchema = this.resetSchema.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
  }

  public componentDidMount(): void {
    SchemaProvider.getSchemas().then((res: ISchemasResponse) => {
      if (res.error) {
        console.log(res.error);
      } else {
        this.setState({schemas: res.schemas});
      }
    });
  }

  public render() {
    const {schema, schemas, entry} = this.state;
    const schemaOptions = schemas.map((s: Schema) => {
      return (<option key={s.id} value={s.id}>{s.name}</option>);
    });
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
                    onChange={this.selectSchema}
                  >
                    <option aria-label='None' value=''/>
                    {schemaOptions}
                  </NativeSelect>
                  <FormHelperText>{schema.id > -1 ? schema.description : 'Please select a schema'}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </Paper>

        <div className='space'/>

        {
          schema.id > -1 &&
          this.renderSchema(schema, entry)
        }

      </div>
    );
  }

  private renderSchema(schema: Schema, entry: SchemaEntry) {
    const propertyView = schema.properties.map((p: Property) => {
      return this.renderProperty(p);
    });
    return (
      <Paper className='schema-paper'>
        <Typography className='schema-header' variant='h5'>{schema.name}</Typography>
        <Divider/>
        <div className='schema-paper-content'>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <TextField value={entry.team} onChange={this.updateTeam} fullWidth required label="Team"/>
            </Grid>
            {propertyView}
          </Grid>

          <br/>
          <Divider/>
          <Typography variant='body1'>Actions</Typography>
          <br/>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Button
                disabled={!this.canSubmit()}
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<SaveIcon/>}
                onClick={this.saveSchema}
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
                onClick={this.resetSchema}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }

  private renderProperty(property: Property) {
    const {entry} = this.state;
    const value: any = (entry.properties as any)[property.getJSONName()];
    switch (property.type) {
      case 'string':
        const stringProp: StringProperty = property as StringProperty;
        return (
          <Grid key={`${property.name}-${property.type}`} item xs={12} sm={6} md={3} lg={3}>
            <TextField name={stringProp.getJSONName()} value={value} fullWidth required label={stringProp.name} onChange={this.updateProperty}/>
          </Grid>
        );
      case 'number':
        const numberProp: NumberProperty = property as NumberProperty;
        return (
          <Grid key={`${property.name}-${property.type}`} item xs={12} sm={6} md={3} lg={3}>
            <TextField name={numberProp.getJSONName()} value={value} fullWidth required label={numberProp.name} onChange={this.updateProperty}/>
          </Grid>
        );
      case 'boolean':
        const booleanProp: BooleanProperty = property as BooleanProperty;
        return (
          <Grid key={`${property.name}-${property.type}`} item xs={12} sm={6} md={3} lg={3}>
            <FormControlLabel
              control={<Checkbox name={booleanProp.getJSONName()} checked={value} onChange={this.updateProperty}/>}
              label={booleanProp.name}
            />
          </Grid>
        );
      case 'dropdown':
        const dropdownProp: DropdownProperty = property as DropdownProperty;
        return (
          <Grid key={`${property.name}-${property.type}`} item xs={12} sm={6} md={3} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="property-dropdown-label">{dropdownProp.name}</InputLabel>
              <NativeSelect
                value={value}
                inputProps={{
                  name: dropdownProp.getJSONName(),
                  id: 'property-dropdown-label-placeholder',
                }}
                onChange={this.updateProperty}
              >
                {
                  dropdownProp.options.map((opt: string, i: number) => {
                    return (
                      <option key={`${property.name} option ${i}`} value={opt}>{opt}</option>
                    );
                  })
                }
              </NativeSelect>
            </FormControl>
          </Grid>
        );
      default:
        const defaultProp: StringProperty = property as StringProperty;
        return (
          <Grid key={`${property.name}-${property.type}`} item xs={12} sm={6} md={3} lg={3}>
            <TextField name={defaultProp.getJSONName()} value={value} fullWidth required label={defaultProp.name} onChange={this.updateProperty}/>
          </Grid>
        );
    }
  }

  private saveSchema(): void {
    const {entry, schema} = this.state;
    entry.entryId = `${schema.id}-0`;
    SchemaProvider.postEntry(entry).then(() => {
      // Set loading to false
    }).catch((reason: any) => {
      console.log(reason);
    });
  }

  private resetSchema(): void {
    const {schema, entry} = this.state;
    for (const property of schema.properties) {
      let value: any = (property as StringProperty).defaultValue;
      if (typeof value === 'undefined') {
        value = '';
      }
      (entry.properties as any)[property.getJSONName()] = value;
    }
    this.forceUpdate();
  }

  private selectSchema(event: React.ChangeEvent<HTMLSelectElement>) {
    const {schemas} = this.state;

    if (event.target.value.length <= 0) {
      this.setState({schema: new Schema(), entry: new SchemaEntry()});
      return;
    }

    const id: number = parseInt(event.target.value, 10);
    const schema: Schema = schemas[id];
    const entry: SchemaEntry = new SchemaEntry();
    for (const property of schema.properties) {
      switch (property.type) {
        case 'string':
          const stringProp: StringProperty = property as StringProperty;
          (entry.properties as any)[property.getJSONName()] = stringProp.defaultValue;
          break;
        case 'number':
          const numberProp: NumberProperty = property as NumberProperty;
          (entry.properties as any)[property.getJSONName()] = numberProp.defaultValue;
          break;
        case 'boolean':
          const booleanProp: BooleanProperty = property as BooleanProperty;
          (entry.properties as any)[property.getJSONName()] = booleanProp.defaultValue;
          break;
        case 'dropdown':
          const dropdownProp: DropdownProperty = property as DropdownProperty;
          (entry.properties as any)[property.getJSONName()] = dropdownProp.defaultValue;
          break;
        default:
          const defaultProp: StringProperty = property as StringProperty;
          (entry.properties as any)[property.getJSONName()] = defaultProp.defaultValue;
      }
    }
    this.setState({schema, entry});
  }

  private updateTeam(event: React.ChangeEvent<HTMLInputElement>) {
    const {entry} = this.state;
    entry.team = event.target.value;
    this.forceUpdate();
  }

  private updateProperty(event: React.ChangeEvent) {
    const {entry} = this.state;
    (entry.properties as any)[(event.target as any).name] = (event.target as any).type !== 'checkbox' ? (event.target as any).value : (event.target as any).checked;
    this.forceUpdate();
  }

  private canSubmit(): boolean {
    const {entry} = this.state;
    for (const property in entry.properties) {
      if (entry.properties.hasOwnProperty(property)) {
        const value = (entry.properties as any)[property];
        if (typeof value === 'undefined' || (typeof value === 'string' && value.length <= 0)) {
          return false;
        }
      }
    }
    return true;
  }
}

export default ScoutView;