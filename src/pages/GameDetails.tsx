import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  List,
  ListItem,
  Skeleton,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { getGameDetailsById } from '../api/gamesAPI';

const GameDetails = () => {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getGameDetailsById(Number(id)),
  });

  if (isPending) {
    return (
      <Grid container>
        <Grid padding={2} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <Skeleton variant='rectangular' height={140} />
            <CardContent>
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width='60%' />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  if (error)
    return (
      <Typography variant='body1' align='center'>
        Something went wrong! Try again later.
      </Typography>
    );

  return (
    data && (
      <Container>
        <Grid container>
          <Grid container>
            <Grid md={3}>
              <img
                src={data?.thumbnail}
                alt={`${data?.title}'s logo`}
                height='100%'
                width='100%'
                style={{ borderRadius: '11px' }}
              />
            </Grid>
            <Grid
              md={9}
              sx={{
                pl: 2,
              }}
            >
              <Typography variant='h2' component='h1'>
                {data?.title}
              </Typography>
              <Typography variant='body2' component='h1'>
                {data?.short_description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Grid container>
              <Grid md={6}>
                <Typography
                  variant='body1'
                  component='h5'
                  sx={{ marginBottom: 1 }}
                >
                  Genre:{' '}
                  <Chip
                    size='small'
                    label={data.genre ? data.genre : 'No data available'}
                    color='warning'
                    variant='outlined'
                  />
                </Typography>

                <Typography
                  variant='body1'
                  component='h5'
                  sx={{ marginBottom: 1 }}
                >
                  Release Date:{' '}
                  {data.release_date
                    ? moment(new Date(data.release_date)).format('DD/MM/YYYY')
                    : 'No data available'}
                </Typography>

                <Typography variant='body1' component='h5'>
                  Publisher:{' '}
                  {data.publisher ? data.publisher : 'No data available'}
                </Typography>
              </Grid>

              <Grid md={6}>
                <Typography
                  variant='body1'
                  component='h5'
                  sx={{ marginBottom: 1 }}
                >
                  Platform:{' '}
                  <Chip
                    size='small'
                    label={data.platform ? data.platform : 'No data available'}
                    color='warning'
                  />
                </Typography>

                <Typography
                  variant='body1'
                  component='h5'
                  sx={{ marginBottom: 1 }}
                >
                  Link:{' '}
                  {data.game_url ? (
                    <Link target='_blank' href={data.game_url}>
                      {data.game_url}
                    </Link>
                  ) : (
                    'No data available'
                  )}
                </Typography>

                <Typography variant='body1' component='h5'>
                  Developer:{' '}
                  {data.developer ? data.developer : 'No data available'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {data.description && (
          <>
            <Typography variant='h5' sx={{ mt: 2 }}>
              Description:
            </Typography>
            <Typography variant='body1'>{data.description}</Typography>
          </>
        )}

        {data?.screenshots?.length > 0 && (
          <>
            <Typography variant='h5' sx={{ mt: 2 }}>
              Screenshots:
            </Typography>
            <Grid container>
              {data.screenshots.map((screenshot, index) => (
                <Grid padding={1} md={4} sm={6} xs={12} key={screenshot.id}>
                  <img
                    src={`${screenshot.image}`}
                    alt={`Screenshot ${index}`}
                    loading='lazy'
                    height='300px'
                    width='100%'
                    style={{
                      borderRadius: '12px',
                      border: '1px solid #ffa726',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {data?.minimum_system_requirements && (
          <>
            <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>
              Minimum System Requirements:
            </Typography>
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    OS:{' '}
                    {data.minimum_system_requirements?.os
                      ? data.minimum_system_requirements?.os
                      : 'No data available'}
                  </ListItem>
                  <ListItem>
                    Processor:{' '}
                    {data.minimum_system_requirements?.processor
                      ? data.minimum_system_requirements?.processor
                      : 'No data available'}
                  </ListItem>
                  <ListItem>
                    Memory:{' '}
                    {data.minimum_system_requirements?.memory
                      ? data.minimum_system_requirements?.memory
                      : 'No data available'}
                  </ListItem>

                  <ListItem>
                    Graphics:{' '}
                    {data.minimum_system_requirements?.graphics
                      ? data.minimum_system_requirements?.graphics
                      : 'No data available'}
                  </ListItem>

                  <ListItem>
                    Storage:{' '}
                    {data.minimum_system_requirements?.storage
                      ? data.minimum_system_requirements?.storage
                      : 'No data available'}
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </>
        )}
      </Container>
    )
  );
};

export default GameDetails;
