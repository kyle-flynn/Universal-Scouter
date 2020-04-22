import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import TablePagination from '../../components/TablePagination';
import {Property, Schema, SchemaEntry} from 'universal-scouter-shared';
import SchemaProvider, {ISchemaEntriesResponse, ISchemasResponse} from '../../providers/SchemaProvider';

interface IState {
  schemas: Schema[];
  schema: Schema;
  entries: SchemaEntry[];
}

class DashboardView extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      schema: new Schema(),
      schemas: [],
      entries: []
    };

    this.selectSchema = this.selectSchema.bind(this);
    this.removeEntries = this.removeEntries.bind(this);
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
    const {schema, schemas, entries} = this.state;
    const schemaOptions = schemas.map((s: Schema) => {
      return (<option key={s.id} value={s.id}>{s.name}</option>);
    });
    const headerCells: any[] = schema.properties.map((p: Property) => {
      return {disabledPadding: true, id: p.getJSONName(), label: p.name, numeric: p.type === 'number'};
    });
    return (
      <div>
        <Typography variant='h3'>Data Dashboard</Typography>
        <Paper className='schema-paper'>
          <Typography className='schema-header' variant='h5'>Options</Typography>
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
          entries.length > 0 &&
          <TablePagination
            onDelete={this.removeEntries}
            title={`${schema.name} Entries`}
            headCells={[
              {disablePadding: true, id: 'entryId', label: 'ID', numeric: false},
              {disablePadding: true, id: 'team', label: 'Team', numeric: false},
              {disablePadding: true, id: 'match', label: 'Match', numeric: false},
            ].concat(headerCells)}
            data={entries}
            identifier={'entryId'}
          />
        }
      </div>
    );
  }

  private selectSchema(event: React.ChangeEvent<HTMLSelectElement>) {
    const {schemas} = this.state;
    const id: number = parseInt(event.target.value, 10);
    this.setState({schema: schemas[id]});
    SchemaProvider.getAllEntries(`${id}`).then((res: ISchemaEntriesResponse) => {
      this.setState({entries: res.entries});
    }).catch((reason: any) => {
      console.log(reason);
    });
  }

  private removeEntries(selected: any[]) {
    for (const entry of selected) {
      SchemaProvider.deleteEntry(entry).then((res: ISchemaEntriesResponse) => {
        if (res.error) {
          console.log(res.error);
        } else {
          console.log(res.entries);
          this.setState({entries: res.entries})
        }
      });
    }
  }
}

export default DashboardView;