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
import { GameDetailsData } from '../types/types';

const GameDetails = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState<GameDetailsData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getGameDetailsById(Number(id)).then((res) => {
      if (res.status === 200) {
        setGameData(res.data);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    });
  }, [id]);

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
          gameData && (
            <Grid container>
              <Grid md={3}>
                <img
                  src={gameData.thumbnail}
                  alt={`${gameData.title}'s logo`}
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
                  {gameData.title}
                </Typography>
                <Typography variant='body2' component='h1'>
                  {gameData.short_description}
                </Typography>
              </Grid>
            </Grid>
          )
        )}
      </Grid>
      {gameData && (
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
                    label={
                      gameData.genre ? gameData.genre : 'No data available'
                    }
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
                  {gameData.release_date
                    ? moment(new Date(gameData.release_date)).format(
                        'DD/MM/YYYY'
                      )
                    : 'No data available'}
                </Typography>

                <Typography variant='body1' component='h5'>
                  Publisher:{' '}
                  {gameData.publisher
                    ? gameData.publisher
                    : 'No data available'}
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
                    label={
                      gameData.platform
                        ? gameData.platform
                        : 'No data available'
                    }
                    color='warning'
                  />
                </Typography>

                <Typography
                  variant='body1'
                  component='h5'
                  sx={{ marginBottom: 1 }}
                >
                  Link:{' '}
                  {gameData.game_url ? (
                    <Link target='_blank' href={gameData.game_url}>
                      {gameData.game_url}
                    </Link>
                  ) : (
                    'No data available'
                  )}
                </Typography>

                <Typography variant='body1' component='h5'>
                  Developer:{' '}
                  {gameData.developer
                    ? gameData.developer
                    : 'No data available'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {gameData && gameData.description && (
        <>
          <Typography variant='h5' sx={{ mt: 2 }}>
            Description:
          </Typography>
          <Typography variant='body1'>{gameData.description}</Typography>
        </>
      )}

      {gameData && gameData?.screenshots.length > 0 && (
        <>
          <Typography variant='h5' sx={{ mt: 2 }}>
            Screenshots:
          </Typography>
          <Grid container>
            {gameData.screenshots.map((screenshot, index) => (
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

      {gameData?.minimum_system_requirements && (
        <>
          <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>
            Minimum System Requirements:
          </Typography>
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  OS:{' '}
                  {gameData.minimum_system_requirements?.os
                    ? gameData.minimum_system_requirements?.os
                    : 'No data available'}
                </ListItem>
                <ListItem>
                  Processor:{' '}
                  {gameData.minimum_system_requirements?.processor
                    ? gameData.minimum_system_requirements?.processor
                    : 'No data available'}
                </ListItem>
                <ListItem>
                  Memory:{' '}
                  {gameData.minimum_system_requirements?.memory
                    ? gameData.minimum_system_requirements?.memory
                    : 'No data available'}
                </ListItem>

                <ListItem>
                  Graphics:{' '}
                  {gameData.minimum_system_requirements?.graphics
                    ? gameData.minimum_system_requirements?.graphics
                    : 'No data available'}
                </ListItem>

                <ListItem>
                  Storage:{' '}
                  {gameData.minimum_system_requirements?.storage
                    ? gameData.minimum_system_requirements?.storage
                    : 'No data available'}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </>
      )}
    </Container>
  );
};

export default GameDetails;
