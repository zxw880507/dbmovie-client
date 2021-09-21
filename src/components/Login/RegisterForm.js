import React from "react";
import useRegister from "../../hooks/useRegister";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/providers/Auth";

export default function RegisterForm() {
  const { isWarning, errMsg, resetErr, changeInput, checkIsWarning, signUp } =
    useRegister(useAuth());

  return (
    <Form className="form-card" onSubmit={signUp}>
      <Form.Floating className="mb-3 control-register">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          data-type="email"
          autoComplete="off"
          onChange={changeInput}
          onFocus={resetErr}
          onBlur={checkIsWarning}
        />
        <label htmlFor="floatingInputCustom">Email address</label>
        {isWarning.email && (
          <Form.Text className="text-muted">
            You have entered an invalid email
          </Form.Text>
        )}
        {errMsg && <Form.Text className="text-muted">{errMsg}</Form.Text>}
      </Form.Floating>
      <Form.Floating className="mb-3 control-register">
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          data-type="password"
          autoComplete="off"
          onChange={changeInput}
          onBlur={checkIsWarning}
        />
        <label htmlFor="floatingPasswordCustom">Password</label>

        {isWarning.password && (
          <Form.Text className="text-muted">
            Password must be at least 6 characters
          </Form.Text>
        )}
      </Form.Floating>
      <Form.Floating className="mb-3 control-register">
        <Form.Control
          id="floatingRePasswordCustom"
          type="password"
          placeholder="Confirm Password"
          data-type="repassword"
          autoComplete="off"
          onChange={changeInput}
          onBlur={checkIsWarning}
        />
        <label htmlFor="floatingPasswordCustom">Confirm Password</label>
        {isWarning.repassword && (
          <Form.Text className="text-muted">Password does not match</Form.Text>
        )}
      </Form.Floating>

      <Button variant="primary" type="submit" className="form-submit-button">
        Create account
      </Button>
    </Form>
  );
}
