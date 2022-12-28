import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import ImpressumView from "./views/ImpressumView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header, { drawerWidth } from "./components/Header/Header";
import OverviewView from "./views/OverviewView";
import {
  Box,
  Container,
  createTheme,
  FormControlLabel,
  styled,
  Switch,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import type { } from '@mui/x-date-pickers/themeAugmentation';
import OpeningHoursView from "./views/OpeningHoursView";
import TicketPricesView from "./views/TicketPricesView";
import MovieDetailsView, { Movie } from "./views/MovieDetailsView";
import LoginView from "./views/LoginView";
import PaymentDetailsView from "./views/PaymentDetailsView";
import ShowDetailsView from "./views/Admin/ShowDetailsView";
import TicketView from "./views/TicketView";
import { Show } from "./components/MovieDetailsView/ShowTiles";
import { Order } from "./views/PaymentDetailsView";
import AddNewMoviesView from "./views/Admin/AddNewMoviesView";

function createData(date: Date, shows: Array<Show>) {
  return { date, shows };
}

export const data = [
  createData(new Date(2023, 0, 1), [
    {
      movieID: "1",
      showID: "1",
      roomID: "1",
      room: "Saal 1",
      dateTime: new Date(2023, 0, 1, 16, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
    {
      movieID: "5",
      showID: "5",
      roomID: "2",
      room: "Saal 2",
      dateTime: new Date(2023, 0, 1, 21, 45, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
  createData(new Date(2023, 0, 2), [
    {
      movieID: "2",
      showID: "2",
      roomID: "2",
      room: "Saal 2",
      dateTime: new Date(2023, 0, 2, 17, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
  createData(new Date(2023, 0, 3), [
    {
      movieID: "3",
      showID: "3",
      roomID: "3",
      room: "Saal 3",
      dateTime: new Date(2023, 0, 3, 18, 15, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
  createData(new Date(2023, 0, 4), [
    {
      movieID: "4",
      showID: "4",
      roomID: "1",
      room: "Saal 1",
      dateTime: new Date(2023, 0, 4, 12, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
    {
      movieID: "6",
      showID: "6",
      roomID: "2",
      room: "Saal 2",
      dateTime: new Date(2023, 0, 4, 16, 15, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
    {
      movieID: "7",
      showID: "7",
      roomID: "1",
      room: "Saal 1",
      dateTime: new Date(2023, 0, 4, 20, 30, 0),
      additionalInfo: { language: "english", isDbox: false, isThreeD: false },
    },
  ]),
];

export interface AdminProps {
  isAdmin: boolean;
}

export interface AdminPropsChange {
  isAdmin: boolean;
  handleChangeAdminMode: Function;
}

export const redTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#1D1E2A",
    },
    primary: {
      main: "#ED254E",
      contrastText: "#1D1E2A",
    },
    secondary: {
      main: "#1D1E2A",
    },
    info: {
      main: "#5C95FF",
    },
    text: {
      primary: "#1D1E2A",
      secondary: "#7F7F7F",
    },
  },
  typography: {
    fontFamily: [
      "Monospace",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: '#ED254E',
        },
      },
    },
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `${drawerWidth}`,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  }),
}));

function App() {
  const [open, setOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  const [selectedMovie, setSelectedMovie] = React.useState<Movie | undefined>(undefined);
  const [selectedShow, setSelectedShow] = React.useState<Show | undefined>(undefined);
  const [adminProps, setAdminProps] = React.useState<AdminProps>({
    isAdmin: false,
  });

  const [order, setOrder] = React.useState<Order | undefined>(undefined);

  const handleChangeAdminMode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdminProps({
      isAdmin: event.target.checked,
    });
  };

  const [isNew, setIsNew] = React.useState<boolean>(false);

  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <BrowserRouter>
          <Header
            open={open}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
          />
          <Toolbar />
          <Main open={open}>
            <Container maxWidth="xl">
              <Box className="App-Box" sx={{ minHeight: "82vh" }}>
                  <Routes>
                    <Route
                      path="/movieDetails/:imdbID"
                      element={<MovieDetailsView setSelectedMovie={setSelectedMovie} setSelectedShow={setSelectedShow} selectedMovie={selectedMovie} isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} showData={data} />}
                    />
                    <Route
                      path="/showDetails/:imdbID/:showID"
                      element={<TicketView selectedMovie={selectedMovie} selectedShow={selectedShow} setOrder={setOrder} />}
                    />
                    <Route
                      path="/orderDetails/:imdbID/:showID/:orderID"
                      element={<PaymentDetailsView order={order} />}
                    />
                    <Route path="/" element={<OverviewView isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} />} />
                    <Route path="/impressum" element={<ImpressumView />} />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/openingHours" element={<OpeningHoursView isAdmin={adminProps.isAdmin} />} />
                    <Route path="/ticketPrices" element={<TicketPricesView isAdmin={adminProps.isAdmin} />} />
                    <Route path="/movieDetails/:imdbID/new" element={<MovieDetailsView setSelectedMovie={setSelectedMovie} setSelectedShow={setSelectedShow} selectedMovie={selectedMovie} isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} showData={data} />} />
                    <Route path="/addNewMovie" element={<AddNewMoviesView isAdmin={adminProps.isAdmin} isNew={isNew} setIsNew={setIsNew} />} />
                    <Route path="/showDetails/:imdbID/:showID/edit" element={<ShowDetailsView isAdmin={adminProps.isAdmin} selectedShow={selectedShow} setSelectedShow={setSelectedShow} />} />
                  </Routes>
              </Box>
            </Container>
            <Footer />
            <FormControlLabel
              control={<Switch onChange={handleChangeAdminMode} />}
              label="Admin"
            />
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
