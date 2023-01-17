import { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handlelogin = () => {

        // request
        axios({
            method: "POST",
            withCredentials: false,
            data: {
                username: username, 
                pwd: password, 
            },
            url: "http://localhost:3001/login",
          }).then( response => {
        
            if (response.data.status === "200") {
                setError(response.data.message);
                // DO something else                
            } else if(response.data.status === "401"){
                setError(response.data.message);
            } else {
                setError("Something went wrong");
            }

        }).catch( error => {
                setError(error.message);
        });
    }

    return (
        <Container >
            <Row nopadding h-100>
                <Col style={{ padding: 0, borderRadius: '0!important', }} sm={8}>
                    <div className="login_col1" style={{ borderRadius: '8px' }}>
                        <img src={require('../images/main_image.jpg')}
                            img-fluid alt="Responsive image"
                            style={{ width: '100%', height: 'auto', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}
                        />
                    </div>
                </Col>
                <Col style={{ padding: 0 }} sm={4}>
                    <Form style={{ borderTopRightRadius: '8px', borderBottomRightRadius: '8px', height: '100%' }}>
                        <h1>Login</h1>

                        <Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px', }}>@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Label>

                        <Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px', }}> {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                                </svg>}</InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Label>
                        <Button variant="warning" onClick={handlelogin}>Submit</Button>
                        <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
