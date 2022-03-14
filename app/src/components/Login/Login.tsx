import { Button, Form, Icon, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import Translations from '../../locales/translations';
import { IGlobalState } from '../../state';
import { getAuthIsLoggingIn, IActionsAuth, login } from '../../state/auth';
import ClientResourcesEnum from '../../config/client';
import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '../../config/general-config';

interface LoginProps {
  isLoggingIn: boolean;
  onLogin: (
    username: string,
    password: string,
    token: string,
    callback: (error?: Error) => void
  ) => void;
}

interface LoginState {
  token: string;
  recaptchaSuccess: boolean;
}

interface LoginFormProps {
  username: string;
  password: string;
}

class Login extends React.Component<
  LoginProps & FormComponentProps & RouteComponentProps,
  LoginState
> {
  state = {
    token: '',
    recaptchaSuccess: false,
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { token } = this.state;
    const { form, onLogin } = this.props;

    form.validateFieldsAndScroll((formErrors, values: LoginFormProps) => {
      if (!formErrors) {
        onLogin(values.username, values.password, token, (error?: Error) => {
          if (error) {
            message.error(error.message);
          }
        });
      }
    });
  };

  onChange = (token: string | null) => {
    if (token) {
      this.setState({ token: token, recaptchaSuccess: true });
    } else {
      this.setState({ recaptchaSuccess: false });
    }
  };

  public render() {
    const { recaptchaSuccess } = this.state;
    const { form, isLoggingIn } = this.props;

    return (
      <>
        <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
          <Form.Item>
            {form.getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: Translations.VALIDATION_FIELD_REQUIRED,
                },
              ],
            })(
              <Input
                type="username"
                prefix={<Icon type="user" />}
                placeholder={Translations.TEXT_USERNAME}
                autoFocus
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: Translations.VALIDATION_FIELD_REQUIRED,
                },
              ],
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" />}
                placeholder={Translations.TEXT_PASSWORD}
              />
            )}
          </Form.Item>
          <Form.Item>
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={this.onChange}
              onExpired={() => this.setState({ recaptchaSuccess: false })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={isLoggingIn}
              disabled={!recaptchaSuccess}
              htmlType="submit"
              block
            >
              {Translations.TEXT_LOGIN}
            </Button>
          </Form.Item>
        </Form>

        <div className="tc">
          <p>
              {Translations.TEXT_RESET_PASSWORD_QUESTION}
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  isLoggingIn: getAuthIsLoggingIn(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IActionsAuth>) => ({
  onLogin: (
    username: string,
    password: string,
    token: string,
    callback: (error?: Error) => void
  ) => dispatch(login(username, password, token, callback)),
});

const form = Form.create();

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(form(Login))
);
