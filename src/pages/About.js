import { Card, CardContent, Typography } from '@mui/material';
import { Container } from '@mui/system';

const About = () => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography
            variant='h2'
            component='h1'
            align='center'
            sx={{ marginBottom: 2 }}
          >
            About
          </Typography>
          <Typography variant='body1'>
            Game Star is a one stop solution for all your game needs. When you
            want to explore games we are not sure which game you want to play at
            first. There Game Star helps you with its huge database of games. It
            has game details with their type, platform specs, screenshot, genre
            and a lot more. You can use this as a reference book to find your
            next favourite game.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
