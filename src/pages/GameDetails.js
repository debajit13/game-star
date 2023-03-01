import {
  Alert,
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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
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
        ) : isError ? (
          <Alert variant='filled' severity='error'>
            Sorry! something went wrong. Please try again later.
          </Alert>
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
                pl: 2,
              }}
            >
              <Typography variant='h2' component='h1'>
                {gameData && gameData.title}
              </Typography>
              <Typography variant='body2' component='h1'>
                {gameData && gameData.short_description}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Grid container>
            <Grid md='6'>
              <Typography
                variant='body1'
                component='h5'
                sx={{ marginBottom: 1 }}
              >
                Genre:{' '}
                <Chip
                  size='small'
                  label={gameData && gameData.genre}
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
                {gameData &&
                  moment(new Date(gameData.release_date)).format('DD/MM/YYYY')}
              </Typography>

              <Typography variant='body1' component='h5'>
                Publisher: {gameData && gameData.publisher}
              </Typography>
            </Grid>

            <Grid md='6'>
              <Typography
                variant='body1'
                component='h5'
                sx={{ marginBottom: 1 }}
              >
                Platform:{' '}
                <Chip
                  size='small'
                  label={gameData && gameData.platform}
                  color='warning'
                />
              </Typography>

              <Typography
                variant='body1'
                component='h5'
                sx={{ marginBottom: 1 }}
              >
                Link:{' '}
                <Link target='_blank' href={gameData && gameData.game_url}>
                  {gameData && gameData.game_url}
                </Link>
              </Typography>

              <Typography
                variant='body1'
                component='h5'
                sx={{ marginBottom: 1 }}
              >
                Developer: {gameData && gameData.developer}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant='h5' sx={{ mt: 2 }}>
        Description:
      </Typography>
      <Typography variant='body1'>
        {gameData && gameData.description}
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

      <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>
        Minimum System Requirements:
      </Typography>
      <Card>
        <CardContent>
          <List>
            <ListItem>OS: {gameData?.minimum_system_requirements.os}</ListItem>
            <ListItem>
              Processor: {gameData?.minimum_system_requirements.processor}
            </ListItem>
            <ListItem>
              Memory: {gameData?.minimum_system_requirements.memory}
            </ListItem>

            <ListItem>
              Graphics: {gameData?.minimum_system_requirements.graphics}
            </ListItem>

            <ListItem>
              Storage: {gameData?.minimum_system_requirements.storage}
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GameDetails;
