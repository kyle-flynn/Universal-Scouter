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
import {Schema} from 'universal-scouter-shared';
import SchemaProvider, {ISchemasResponse} from "../../providers/SchemaProvider";

interface IState {
  schemas: Schema[];
  schema: Schema;
}

class DashboardView extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      schema: new Schema(),
      schemas: []
    };

    this.selectSchema = this.selectSchema.bind(this);
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
    const {schema, schemas} = this.state;
    const schemaOptions = schemas.map((s: Schema) => {
      return (<option key={s.id} value={s.id}>{s.name}</option>);
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

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="schema-native-helper">Group By</InputLabel>
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

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="schema-native-helper">Filter</InputLabel>
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

        {/*<TablePagination/>*/}
      </div>
    );
  }

  private selectSchema(event: React.ChangeEvent<HTMLSelectElement>) {
    const {schemas} = this.state;
    const id: number = parseInt(event.target.value, 10);
    this.setState({schema: schemas[id]});
  }
}

export default DashboardView;