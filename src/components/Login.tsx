import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
import { useAuthStore } from '../hooks/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

  export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuthStore(); 
  const navigate = useNavigate();
  const handleLogin = () => {
    
     console.log(email, password);
    login(email, password);
    if (email === 'admin' && password === 'password') {
        navigate('/'); // Redirect to the home page
      }
  };
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={""}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
                label="Email"
                placeholder="you@mantine.dev"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                mt="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
          <Group position="apart" mt="md">
          <Checkbox
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.currentTarget.checked)}
                  />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleLogin} >
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }