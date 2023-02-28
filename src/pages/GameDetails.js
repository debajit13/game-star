import { Chip, Grid, Link, Skeleton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameDetailsById } from '../api/gamesAPI';

const GameDetails = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getGameDetailsById(id).then((res) => {
      if (res.status === 200) {
        setGameData(res.data);
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
      <Grid container>
        {isLoading ? (
          <Skeleton variant='rectangular' width={210} height={60} />
        ) : (
          <Grid container>
            <Grid md='3'>
              <img
                src={gameData && gameData.thumbnail}
                alt={`${gameData && gameData.title}'s logo`}
                height='100%'
                width='100%'
                style={{ borderRadius: '11px' }}
              />
            </Grid>
            <Grid
              md='9'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pl: 2,
              }}
            >
              <Typography variant='h2' component='h1'>
                {gameData && gameData.title}
              </Typography>
              <Typography variant='h5' component='h5'>
                Genre:{' '}
                <Chip
                  size='small'
                  label={gameData && gameData.genre}
                  color='warning'
                  variant='outlined'
                />
              </Typography>

              <Typography variant='body2'>
                Link:{' '}
                <Link target='_blank' href={gameData && gameData.game_url}>
                  {gameData && gameData.game_url}
                </Link>
              </Typography>
              <Typography variant='body1' component='body1'>
                Platform:{' '}
                <Chip
                  size='small'
                  label={gameData && gameData.platform}
                  color='warning'
                />
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Typography variant='h5' sx={{ mt: 2 }}>
        Description:
      </Typography>
      <Typography variant='body1'>
        {gameData && gameData.short_description}
      </Typography>

      <Typography variant='h5' sx={{ mt: 2 }}>
        Screenshots:
      </Typography>
      <Grid container>
        {gameData &&
          gameData.screenshots.map((screenshot, index) => (
            <Grid padding={1} md={4} sm={6} xs={12} key={screenshot.id}>
              <img
                src={`${screenshot.image}`}
                alt={`Screenshot ${index}`}
                loading='lazy'
                height='300px'
                width='100%'
                style={{ borderRadius: '12px', border: '1px solid #ffa726' }}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default GameDetails;
