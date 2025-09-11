export default function HomePage() {
    const redirect_uri = process.env.NEXT_PUBLIC_BACKEND_REDIRECT_URI;
    return (
        <a href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=475148083359-ui2hf007eh8jee2qalr0ojckg2vh9fje.apps.googleusercontent.com&redirect_uri=${redirect_uri}/google/callback&response_type=code&scope=email%20profile&access_type=offline`}>google 登入</a>
    )
}