import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string, number, date, InferType } from 'yup';
import useAuthCalls from "../service/useAuthCalls";

const Login = () => {

    const { login } = useAuthCalls()

    const loginSchema = object({
        email: string()
            .email("E-mail is not valid.")
            .required("E-mail is required."),
        password: string()
            .required("Password is required.")
            .min(8, "Password must contain at least 8 characters.")
            .max(16, "Password cannot contain more than 16 characters.")
            // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number.")
    });

    return (
        <Container maxWidth="lg">
            <Grid
                container
                justifyContent="center"
                direction="row-reverse"
                sx={{
                    height: "100vh",
                    p: 2,
                }}
            >
                <Grid item xs={12} mb={3}>
                    <Typography variant="h3" color="primary" align="center">
                        HANAKO STOCKS
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={10} md={6}>
                    <Avatar
                        sx={{
                            backgroundColor: "secondary.light",
                            m: "auto",
                            width: 40,
                            height: 40,
                        }}
                    >
                        <LockIcon size="30" />
                    </Avatar>
                    <Typography
                        variant="h4"
                        align="center"
                        mb={4}
                        color="secondary.light"
                    >
                        Login
                    </Typography>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={loginSchema}
                        onSubmit={(values, actions) => {
                            //TODO login (post) req
                            login(values)
                            actions.resetForm()
                            actions.setSubmitting(false) // isSubmitting
                            // data to global state
                            // navigate
                            // toast 
                        }}
                    >
                        {({ handleChange, values, touched, errors, handleBlur }) =>
                            <Form>
                                <Box
                                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                                >
                                    <TextField
                                        label="Email"
                                        name="email"
                                        id="email"
                                        type="email"
                                        variant="outlined"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={errors.email}
                                    />
                                    <TextField
                                        label="password"
                                        name="password"
                                        id="password"
                                        type="password"
                                        variant="outlined"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={errors.password}
                                    />
                                    <Button variant="contained" type="submit">
                                        Submit
                                    </Button>
                                </Box>
                            </Form>}
                    </Formik>

                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Link to="/register">Don't have an account?</Link>
                    </Box>
                </Grid>

                <Grid item xs={10} sm={7} md={6}>
                    <Container>
                        <img src={image} alt="img" />
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Login;