import * as React from 'react';
import {
    Button,
    FormControl,
    Checkbox,
    FormControlLabel,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
const providers = [
    { id: 'google', name: 'Google' }, 
    { id: 'github', name: 'GitHub' },
    {id: 'line', name: 'Line'}, 
    { id: 'credentials', name: 'Email and Password' }
];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
function CustomEmailField() {
    return (
        <TextField
            id="input-with-icon-textfield"
            label="Email"
            name="email"
            type="email"
            size="small"
            required
            fullWidth
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle fontSize="inherit" />
                        </InputAdornment>
                    ),
                },
            }}
            variant="outlined"
        />
    );
}

function CustomPasswordField() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
            <InputLabel size="small" htmlFor="outlined-adornment-password">
                Password
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                size="small"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? (
                                <VisibilityOff fontSize="inherit" />
                            ) : (
                                <Visibility fontSize="inherit" />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
        </FormControl>
    );
}

function CustomButton() {
    return (
        <Button
            type="submit"
            variant="outlined"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
        >
            Log In
        </Button>
    );
}

function SignUpLink() {
    return (
        <Link href="/register" variant="body2">
            Sign up
        </Link>
    );
}

function ForgotPasswordLink() {
    return (
        <Link href="/" variant="body2">
            Forgot password?
        </Link>
    );
}

function Title() {
    return <h2 style={{ marginBottom: 8 }}>Login</h2>;
}

function Subtitle({ isShowSubtitle }) {
    return (
        isShowSubtitle && (
            <Alert sx={{ mb: 2, px: 1, py: 0.25, width: '100%' }} severity="warning">
                {/* Add your subtitle message here */}
            </Alert>
        )
    );
}

function RememberMeCheckbox() {
    const theme = useTheme();
    return (
        <FormControlLabel
            label="Remember me"
            control={
                <Checkbox
                    name="remember"
                    value="true"
                    color="primary"
                    sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
            }
            slotProps={{
                typography: {
                    color: 'textSecondary',
                    fontSize: theme.typography.pxToRem(14),
                },
            }}
        />
    );
}

function GitHubLogin() {

    const GITHUB_CONFIG = {
        clientID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,

        redirectURI: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI,
    };
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CONFIG.clientID}&redirect_uri=${GITHUB_CONFIG.redirectURI}&scope=user:email`
    window.location.href = githubAuthUrl;

    return Promise.resolve();
}


function LineLogin() {
    const LINE_CONFIG = {
        clientID: process.env.NEXT_PUBLIC_LINE_CLIENT_ID,
        redirectURI: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI,
    };
    const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CONFIG.clientID}&redirect_uri=${LINE_CONFIG.redirectURI}&scope=openid%20profile%20email&state=12345abcde`
    window.location.href = lineAuthUrl;

    return Promise.resolve();
}
function GoogleLogin() {
    

    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=475148083359-ui2hf007eh8jee2qalr0ojckg2vh9fje.apps.googleusercontent.com&redirect_uri=https://localhost:3000/google/callback&response_type=code&scope=email%20profile&access_type=offline';

    // 直接重定向到 Google 授權頁面
    window.location.href = googleAuthUrl;

    return Promise.resolve();
}


export default function SlotsSignIn() {
    const [isShowSubtitle, setIsShowSubtitle] = React.useState(false);
    const theme = useTheme();
    const router = useRouter();

    function handlelogin(provider, formData) {
        
        console.log('Logging in with provider:', provider);
        switch (provider.id) {
            case 'google':
                GoogleLogin();
                break;
            case 'github':
                GitHubLogin();
                break;
            case 'line':
                LineLogin();
                break;
            case 'credentials':
                loginWithCredentials(formData.get('email'), formData.get('password'), formData.get('remember') === 'true')

                break;
            default:
                console.error('Unknown provider:', provider.id);
        }
    }

    async function loginWithCredentials(email, password, rememberMe) {
        const data = {
            account: email,
            password: password
        }

        try {
            const res = await axios.post(`${baseUrl}/account/login`, data, { withCredentials: true })

            if (res.status === 200) {
                const token = res.data.data.accessToken


                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));

                Cookies.set('token', token)
                Cookies.set('userId', res.data.data.user.id)


                router.push('/');
            }


        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={handlelogin}
                slots={{

                    subtitle: Subtitle,

                    passwordField: CustomPasswordField,

                    signUpLink: SignUpLink,
                    rememberMe: RememberMeCheckbox,
                    forgotPasswordLink: ForgotPasswordLink,
                }}
                slotProps={{ form: { noValidate: true }, subtitle: { isShowSubtitle } }}
                providers={providers}
                localeText={{
                    providerSignInTitle: (provider) => `${provider} 登入`,
                }}
            />
        </AppProvider>
    );
}
