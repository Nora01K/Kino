import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, useTheme } from "@mui/material";
import React from "react"
import '../../styles/Login.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { waitForDebugger } from "inspector";

interface State {
  password: string;
  showPassword: boolean;
}

interface LoginProps {
  setUser: Function;
  handleProfileMenuClose?: Function;
}

function Login(props: LoginProps) {
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const theme = useTheme();

  function createUserData(
    firstName: string | undefined,
    surname: string | undefined,
    street: string | undefined,
    houseNumber: string | undefined,
    postcode: string | undefined,
    city: string | undefined,
    emailAdress: string | undefined,) {
    return { firstName, surname, street, houseNumber, postcode, city, emailAdress };
  }

  const testUser = (
    createUserData("Jojo", "Siwaaaa", "Fifth Avenue", "87", "64729", "New York", "jojo.siwaaa@gmail.com")
  );


  async function handleSignIn() {
    if (props.handleProfileMenuClose){
      props.handleProfileMenuClose();
      await new Promise(f => setTimeout(f, 1000));
    }
    props.setUser(testUser);
  }

  return (
    <Box
      component="form"
      sx={{
        paddingX: theme.spacing,
        '& .MuiTextField-root': { m: 0.5, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="email"
        className="Form-Login-Input"
        placeholder="Jane.doe@example.com"
        label="Email Address"
      />
      <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password-signIn">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-signIn"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        sx={{ m: 0.5, width: '100%' }}
        variant="contained"
        onClick={handleSignIn}
      >
        Sign In
      </Button>
    </Box>
  )
}

export default Login;