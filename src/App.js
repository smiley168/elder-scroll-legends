import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ApolloClient from "apollo-boost";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
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
        alert(`More results: searchterm ${searchTerm}  ${fetchMoreResult.cards.length}`);

        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          // cards: [...prev.cards, ...fetchMoreResult.cards]
          cards: [...fetchMoreResult.cards]
        });
      }
    })
  };  
  
  if (loading) return <p>Loading...</p>;
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
          <Container maxWidth="sm">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
            THE ELDER SCROLLS: LEGENDS
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
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
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
  

      <div>Data: {data.cards.length} {data.cards.hasMore ? "Yes" : "No"}</div>
      <div>Search Results: {searchResults.length}</div>
      
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
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Yay! You have seen it all</b>
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
                    <Typography gutterBottom variant="subtitle2">
                      <b>Name</b>: {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                    <b>Text</b>: {text}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                    <b>Set Name</b>: {setName}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                    <b>Type</b>: {type}
                    </Typography>
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
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    );
  // return data.cards.map(({ name, type, setName, text }) => (
  //   <div key={name}>
  //     <h4>
  //       Name: {name}
  //     </h4>
  //     <p>
  //       Set Name: {setName}
  //     </p>
  //     <p>
  //       Type: {type}
  //     </p>
  //     <p>
  //       text: {text}
  //     </p>
  //   </div>
  // ));
}
const client = new ApolloClient({
  // uri: "https://48p1r2roz4.sse.codesandbox.io"
  uri: "https://llei-elder-scroll-legends-gql.herokuapp.com/"
  // uri: "https://llei-elder-scroll-legends-gql.herokuapp.com/"
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <ElderScrollsLegends />
    </div>
  </ApolloProvider>
);

// render(<App />, document.getElementById("root"));
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
