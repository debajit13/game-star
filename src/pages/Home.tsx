import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Box,
  Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllGames } from '../api/gamesAPI';
import { GamesData } from '../types/types';

const Home = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: getAllGames,
  });

  if (error)
    return (
      <Typography variant='body1' align='center'>
        Something went wrong! Try again later.
      </Typography>
    );

  return (
    <Container>
      <Typography variant='h3' component='h1' align='left' padding={2}>
        All Games
      </Typography>
      <Grid container>
        {isPending ? (
          <>
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
            <Grid padding={2} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', width: '100%' }}>
                <Skeleton variant='rectangular' height={140} />
                <CardContent>
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width='60%' />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid padding={2} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', width: '100%' }}>
                <Skeleton variant='rectangular' height={140} />
                <CardContent>
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width='60%' />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          data.length > 0 &&
          data.map((gameData: GamesData) => (
            <Grid padding={2} xs={12} sm={6} md={4} key={gameData.id}>
              <Link to={`/games/${gameData.id}`}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={gameData.thumbnail}
                    title={gameData.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5'>
                      {gameData.title}
                    </Typography>
                    <Typography variant='body2'>
                      {gameData.short_description}
                    </Typography>
                    <Box mt={1}>
                      <Typography>
                        Genre:{' '}
                        <Chip
                          label={gameData.genre}
                          color='warning'
                          variant='outlined'
                          size='small'
                        />
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography>
                        Platform:{' '}
                        <Chip
                          label={gameData.platform}
                          color='warning'
                          size='small'
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
