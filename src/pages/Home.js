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
import { useEffect, useState } from 'react';
import { getAllGames } from '../api/gamesAPI';

const Home = () => {
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getAllGames().then((res) => {
      if (res.status === 200) {
        setGamesData(res.data);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    });
  }, []);

  return (
    <Container>
      <Typography variant='h2' component='h1' align='center'>
        Games
      </Typography>
      <Grid container>
        {isError ? (
          <Typography variant='body1' align='center'>
            Sorry! No data found
          </Typography>
        ) : (
          gamesData.map((gameData) => (
            <Grid padding={2} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                {isLoading ? (
                  <Skeleton variant='rectangular' height={140} />
                ) : (
                  <CardMedia
                    sx={{ height: 140 }}
                    image={gameData.thumbnail}
                    title={gameData.title}
                  />
                )}

                <CardContent>
                  {isLoading ? (
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width='60%' />
                    </Box>
                  ) : (
                    <>
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
                            color='primary'
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
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
