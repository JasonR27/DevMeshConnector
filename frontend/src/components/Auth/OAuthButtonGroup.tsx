import { Button, ButtonGroup, } from 'react-bootstrap';
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons';

const providers = [
  { name: 'GitHub', icon: <GitHubIcon width="20" height="20" /> },
  { name: 'Google', icon: <GoogleIcon width="20" height="20" /> },
  { name: 'Twitter', icon: <TwitterIcon width="20" height="20" /> }
];

interface Props {
  childToParent(socialName: string): any;
}

export const OAuthButtonGroup = ({ childToParent }: Props) => {

  function signInWithSocial(name: string): void {
    childToParent(name);
  }

  return (
    <ButtonGroup className="d-flex justify-content-between w-100">
      {providers.map(({ name, icon }, i: number) => (
        <Button key={i} variant="outline-primary" className="w-100" onClick={() => signInWithSocial(name)}>
          <span className="sr-only">Sign in with {name}</span>
          {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
};
