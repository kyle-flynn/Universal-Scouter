import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import PublicIcon from '@material-ui/icons/Public';

interface IProps {
  schemaCount: number;
  entryCount: number;
}

class AppStats extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {schemaCount, entryCount} = this.props;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PublicIcon fontSize={"large"} color={'primary'}/>
                  </Avatar>
                }
                title={schemaCount}
                subheader="Schemas"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PublicIcon fontSize={"large"} color={'primary'}/>
                  </Avatar>
                }
                title={entryCount}
                subheader="Data Points"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PublicIcon fontSize={"large"} color={'primary'}/>
                  </Avatar>
                }
                title="4"
                subheader="Data Types"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <PublicIcon fontSize={"large"} color={'primary'}/>
                  </Avatar>
                }
                title="1"
                subheader="Application"
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AppStats;