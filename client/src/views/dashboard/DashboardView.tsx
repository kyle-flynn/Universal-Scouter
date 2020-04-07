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

class DashboardView extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
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
}

export default DashboardView;