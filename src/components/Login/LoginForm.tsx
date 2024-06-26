import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, useTheme } from "@mui/material";
import React from "react"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from "../../queries/authentication";
import { useNavigate } from "react-router-dom";


interface State {
  email: string,
  password: string;
  showPassword: boolean;
}

interface LoginProps {
  setUser: Function;
  handleProfileMenuClose?: Function;
  setIsAdmin: Function
}


function Login(props: LoginProps) {
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();

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


   async function handleSignIn() {
     if (props.handleProfileMenuClose) {
       props.handleProfileMenuClose();
       await new Promise((f) => setTimeout(f, 1000));
     }
     loginUser({email: values.email, password: values.password}).then((result) => {
        props.setUser(result.data);
        console.log(result.data);
        let roles = result.data.role.split(",");
        if(roles[1] && roles[1] === "ROLE_ADMIN"){
          props.setIsAdmin({isAdmin: true});
        }
        if(result.data.firstLogin){
          //navigate to change password
          navigate('/reviews');
        }
        navigate('/reviews');
     });
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
        className="w-full mb-4"
        placeholder="Jane.doe@example.com"
        label="Email Address"
        onChange={handleChange('email')}
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