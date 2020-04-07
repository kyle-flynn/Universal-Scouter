import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import BANNER from '../../media/banner.jpg';

class HomeView extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div id='banner'>
          <img alt='FIRST World Championship 2019' src={BANNER} className='fit-w'/>
          <Typography id='banner-header' variant='h3' className='center-items'>Universal Scouter</Typography>
          <Typography id='banner-subtitle' variant='subtitle1' className='center-items'>Universal, Cross-Platform, Yours</Typography>
        </div>
      </div>
    );
  }
}

export default HomeView;