import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ApolloClient from "apollo-boost";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    backgroundPosition: 'center',
    backgroundSize: '23vh, cover',
    height: '40vh',
  },
  cardContent: {
    flexGrow: 1,
    padding: '10px',
  },
  listLabel: {
    flex: 2,
    padding: '3px 0',
    margin: '0',
    fontSize: '0.8rem',
  },
  listContent: {
    width: '8rem',
    padding: '3px 0 3px 5px',
    margin: '0',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  item: {
    paddingTop: '0',
    paddingBottom: '0',
  },
}));



const GET_CARDS = gql`
  query cards($pageNumber: Int!, $name: String) {
    cards(pageSize: 20, name: $name, pageNumber: $pageNumber) {
      name
      text
      setName
      type
      imageUrl
    }
  }
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Linda Lei&apos;s Take-Home Exercise for HighSpot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function ElderScrollsLegends() {
  const { data, loading, error, fetchMore } = useQuery(GET_CARDS, {
    variables: { name: "", pageNumber: 1 },
  });
  
  const classes = useStyles();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
  setSearchTerm(event.target.value);
 };
 const handleSubmit = event => {
   event.preventDefault();
    fetchMore({
      variables: {
        pageNumber: 1,
        name: searchTerm,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          cards: [...fetchMoreResult.cards]
        });
      }
    })
  };  
  
  if (loading) return <p>   Loading <img src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif" /></p>;
  if (error) return <p>Error :( {error}</p>;
    return (
 
      <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <h2>Elder Scrolls Legends</h2>
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            
            <Typography align="justify" color="textSecondary" paragraph>
              The Elder Scrolls: Legends is a competitive strategy card game set in the Elder Scrolls universe. Craft decks featuring intimidating abilities and powerful allies from across all of Tamriel as you take on story-rich campaigns as well as other players.
            </Typography>
            <Typography align="justify" color="textSecondary" paragraph>
              You can filter the Craft decks by name using the Search box below:
            </Typography>
            <div>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <form className={classes.root} noValidate autoComplete="on">
                    <TextField id="outlined-basic" label="Search by name" variant="outlined" onChange={handleChange} size="small"/>
                    <Button variant="contained" color="primary" onClick={handleSubmit} >
                      Search
                    </Button>
                  </form>
                  {searchTerm && data && data.cards &&
                  (<Typography align="justify" color="textSecondary" paragraph>
                      Search results: {data.cards.length}
                  </Typography>)}
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      
      {data.cards && 
        (
        <InfiniteScroll
            dataLength={data.cards.length}
            next={() =>
              fetchMore({
                variables: {
                  pageNumber: Math.floor(data.cards.length / 20 + 1),
                  name: searchTerm,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  setSearchResults(fetchMoreResult);
                  if (!fetchMoreResult) return prev;
        
                  return Object.assign({}, prev, {
                    cards: [...prev.cards, ...fetchMoreResult.cards]
                  });
                }
              })
            }
            hasMore={searchTerm.length > 0 && data.cards.length < 20 ? false : true}
            loader={<h4>Loading More <img src="https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif" /></h4>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>End of Search Results</b>
              </p>
            }
        > 
       
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          
            
            {data.cards.map(({ name, type, setName, text, imageUrl }) => (
              <Grid item key={name} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageUrl}
                    title="setName"
                  />
                  <CardContent className={classes.cardContent}>
                    <List className={classes.root}>
                      <ListItem alignItems="flex-start" className={classes.item}>
                        <ListItemText className={classes.listLabel} secondary="Name: " />
                        <ListItemText className={classes.listContent} secondary={name} />
                      </ListItem>
                      <ListItem alignItems="flex-start" className={classes.item}>
                        <ListItemText className={classes.listLabel} secondary="Text: " />
                        <ListItemText className={classes.listContent} secondary={text} />
                      </ListItem>
                      <ListItem alignItems="flex-start" className={classes.item}>
                        <ListItemText className={classes.listLabel} secondary="Set Name: " />
                        <ListItemText className={classes.listContent} secondary={setName} />
                      </ListItem>
                      <ListItem alignItems="flex-start" className={classes.item}>
                        <ListItemText className={classes.listLabel} secondary="Type: " />
                        <ListItemText className={classes.listContent} secondary={type} />
                      </ListItem>
                    </List>
                  </CardContent>

                </Card>
              </Grid>
            ))}
          
          </Grid>
        </Container>
      </InfiniteScroll>
      )}
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Elder Scroll  Legends take-home Exercise footer
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    );
}

var apolloClientUri = "https://elder-scroll-legends-gql.herokuapp.com/"; // use the production URL when no graphql server running locally

if(process.env.NODE_ENV === 'development') {
  apolloClientUri = "http://localhost:4000/";
}

const client = new ApolloClient({
  uri: apolloClientUri
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <ElderScrollsLegends />
    </div>
  </ApolloProvider>
);

export default App;
