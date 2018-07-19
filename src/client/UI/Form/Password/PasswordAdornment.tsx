import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface PropTypes {
  label: string,
  required: boolean,
  helperText: string,
  [rest: string]: any
}

type Props =
  PropTypes
  & RouteComponentProps<{}>;

class PasswordAdornment extends React.PureComponent<Props, {}> {
  public state = {
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  };

  public render() {
    const { label, required, fullWidth, helperText, ...rest } = this.props;
    return (
      <FormControl error={this.props.error} fullWidth={fullWidth}>
        <InputLabel required={required}>{label}</InputLabel>
        <Input
          type={this.state.showPassword ? 'text' : 'password'}
          value={this.state.password}
          onChange={this.handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPasssword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...rest}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }

  private handleChange = (prop: any) => (event: any) => {
    this.setState({ [prop]: event.target.value });
  }

  private handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  }

  private handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }
}

export default PasswordAdornment;
