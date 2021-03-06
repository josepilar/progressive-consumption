import React, { useContext, useState } from 'react';
import { css } from 'emotion';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { Button, Row, Form, Input, Col, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import AuthContext from '../../contexts/AuthContext';

import { login } from '../../services/gastory.service';
import { setUserInformation } from '../../helpers/identity_helper';

const Login = () => {

  const [isError, setIsError] = useState(false);
  const authContext = useContext(AuthContext);

  const handleLogin = async (formData) => {
    const { password, username } = formData;
    setIsError(false);
    const response = await login(username, password);
    if (response?.status === 200) {
      window.location.reload();
      return setUserInformation(response?.data);
    }
    setIsError(response ? response.status : true);
  }
  if (authContext.auth && authContext.auth.isLoggedIn) {
    // Redirect if the user is already logged in
    return <Redirect to="/" />;
  }

  return (
    <Row align="middle" justify="center" className={css`margin: 200px 10px;`}>
      <Col xs={24} md={16} lg={10} >
        <Card title="Login">
          <Form
            name="signup"
            initialValues={{ remember: false }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Link to="/whoopsis" >Forgot your password?</Link>
            </Form.Item>
            {isError && <div className={css`margin-bottom: 25px;`}>
              <Alert
                message="Login failed"
                description={`${isError === 401 ? 'Username or password incorrect, try again.' : 'Something went wrong...'}`}
                type="error" />
            </div>}
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Log in
                </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/signup" >Sign up</Link>
            </Form.Item>
          </Form >
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(Login);