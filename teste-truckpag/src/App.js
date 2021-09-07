import React, { useEffect, useState } from 'react';
import { API_BASE } from './API_BASE';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  Chip,
  Container,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  CardContent: {
    paddingBottom: 5
  },
  cardActions: {
    padding: 16
  }
})

function App() {
  const [jokes, setJokes] = useState([])
  const [jokeToShow, setJokesToShow] = useState([])
  const [likedJokes, setLikedJokes] = useState([])
  const [currentTab, setCurrentTab] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    fetch(`${API_BASE}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setJokes(res.value)
        setJokesToShow(res.value.slice(0, 30))
      })
      .catch((err) => console.log(err))
  }, [])

  const likeJoke = (id) => {
    if (likedJokes.find(joke => joke.id === id)) return
    const likedJoke = jokes.find(joke => joke.id === id)
    setLikedJokes([likedJoke, ...likedJokes])
    console.log(likedJokes)
  }

  const unlikeJoke = (id) => {
    const newlikedJokes = likedJokes.filter(joke => joke.id !== id)
    setLikedJokes(newlikedJokes)
  }

  const changeTab = (event, value) => {
    setCurrentTab(value)
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h1" align="center">
          Chuck Norris jokes
        </Typography>
        <AppBar style={{ marginBottom: 20 }} position="sticky">
          <Tabs value={currentTab} onChange={changeTab} centered>
            <Tab label="Home" id="home-tab" aria-controls="home-panel" />
            <Tab label="Likes" id="like-tab" aria-controls="like-panel" />
          </Tabs>
        </AppBar>
        <div role="tabpanel" hidden={currentTab !== 0}>
          {jokeToShow.map(joke => (
            <Card key={joke.id} className={classes.card}>
              <CardContent className={classes.CardContent}>
                {joke.categories.length > 0 ? (
                  joke.categories.map((category) => (
                    <Chip label={category} key={category} variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} />
                  ))
                ) : <Chip label="regular" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} />}
                <Typography>
                  {joke.joke}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button variant="contained" color="primary" onClick={() => likeJoke(joke.id)}>
                  Like
                </Button>
                <Button variant="contained" color="secondary" onClick={() => unlikeJoke(joke.id)}>
                  Unlike
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div role="tabpanel" hidden={currentTab !== 1}>
          {likedJokes.map(joke => (
            <Card key={joke.id} className={classes.card}>
              <CardContent className={classes.CardContent}>
                {joke.categories.length > 0 ? (
                  joke.categories.map((category) => (
                    <Chip label={category} key={category} variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} />
                  ))
                ) : <Chip label="regular" variant="outlined" style={{ marginTop: 10, marginBottom: 10 }} />}
                <Typography>
                  {joke.joke}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button variant="contained" color="primary" onClick={() => likeJoke(joke.id)}>
                  Like
                </Button>
                <Button variant="contained" color="secondary" onClick={() => unlikeJoke(joke.id)}>
                  Unlike
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
