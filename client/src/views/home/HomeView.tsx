import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BANNER from '../../media/banner.jpg';
import AppStats from '../../components/AppStats';
import SchemaProvider, {
  ISchemaEntriesResponse,
  ISchemasResponse
} from '../../providers/SchemaProvider';
import {Schema, SchemaEntry} from 'universal-scouter-shared';
import {Link} from 'react-router-dom';

interface IState {
  schemas: Schema[];
  entries: SchemaEntry[];
}

class HomeView extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      schemas: [],
      entries: []
    }
  }

  public componentDidMount(): void {
    const {entries} = this.state;
    SchemaProvider.getSchemas().then((res: ISchemasResponse) => {
      if (res.error) {
        console.log(res.error);
      } else {
        this.setState({schemas: res.schemas});
        for (const schema of res.schemas) {
          SchemaProvider.getAllEntries(`${schema.id}`).then((entryRes: ISchemaEntriesResponse) => {
            if (entryRes.error) {
              console.log(entryRes);
            } else {
              this.setState({entries: entries.concat(entryRes.entries)});
            }
          });
        }
      }
    });
  }

  public render() {
    const {schemas, entries} = this.state;
    return (
      <div>
        <div id='banner'>
          <img alt='FIRST World Championship 2019' src={BANNER} className='fit-w'/>
          <Typography id='banner-header' variant='h3' className='center-items'>Universal Scouter</Typography>
          <Typography id='banner-subtitle' variant='subtitle1' className='center-items'>Universal, Cross-Platform, Yours</Typography>
        </div>
        <Grid container id={'home'} spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <AppStats entryCount={entries.length} schemaCount={schemas.length}/>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title='Getting Started'
              />
              <Divider/>
              <CardContent>
                <Typography variant='body1'>
                  The Universal Scouting application is a tool aimed to make data analysis and data entry simplified year-to-year for FIRST robotics events all over the world.
                  Getting started can be divided into 3 easy steps:
                  <ol>
                    <li>Create a yearly schema over at the <Link className='inline-link' to={`/editor`}>Schema Editor</Link></li>
                    <li>Enter in some data for your newly created schema using the <Link className='inline-link' to={`/scouting`}>Scouting Mode</Link></li>
                    <li>View all of the data that has been entered with the use of the <Link className='inline-link' to={`/dashboard`}>Data Dashboard</Link></li>
                  </ol>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default HomeView;