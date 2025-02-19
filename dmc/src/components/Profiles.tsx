import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useState } from 'react';
import { useAuth } from '../context/Auth';
import { deleteProfile, SelectAsCurrent, SelectAsMain } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import ProfileAvatar from './ProfileAvatar';
import { useMutationsContext } from '../context/MutationsContext';

export function truncate(text: string, maxLength: number = 20): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

const Profiles: React.FC<ProfilesProps> = ({ profiles }) => {
  // const { user: IUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuProfileId, setMenuProfileId] = useState<null | number>(null);
  const mutations = useMutationsContext();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, profileId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuProfileId(profileId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuProfileId(null);
  };

  const handleDelete = async (profileId: any) => {
    handleMenuClose();
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        // const response: AxiosResponse = await deleteProfile(profileId);
        // const { redirectUrl } = response.data;

        // if (redirectUrl) {
        //   navigate(redirectUrl);
        // }

        mutations.deleteMutations.deleteProfile.mutate(profileId);
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  const handleEdit = async (profileId: any) => {
    handleMenuClose();
    
      try {
        const response: AxiosResponse = await deleteProfile(profileId);
        const { redirectUrl } = response.data;

        if (redirectUrl) {
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Error editing profile:', error);
      }
    
  };

  const SelectMain = async (profileId: any) => {
    handleMenuClose();
    if (window.confirm('Are you sure you want to select this profile as your main profile?')) {
      try {
        const response: AxiosResponse = await SelectAsMain(profileId);
        const { redirectUrl } = response.data;

        if (redirectUrl) {
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Error selecting main profile:', error);
      }
    }
  };

  const SelectCurrent = async (profileId: any) => {
    handleMenuClose();
    if (window.confirm('Are you sure you want to select this profile to continue browsing with it as your current profile?')) {
      try {
        const response: AxiosResponse = await SelectAsCurrent(profileId);
        const { redirectUrl } = response.data;

        if (redirectUrl) {
          navigate(redirectUrl);
        }
      } catch (error) {
        console.error('Error selecting current profile:', error);
      }
    }
  };

  if (!Array.isArray(profiles)) {
    console.log('params profiles is not an array');
    return null;
  } else {
    console.log('params profiles IS an array');
  }

  return (
    <Container sx={{ py: 5, position: 'relative' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {profiles.map(({ id, userName, company, authorEmail, website, programmingLanguages, picture, user }, i) => (
          <Box key={i} width={{ xs: '120%', sm: '80%', md: '50%' }} p={1}>
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                avatar={
                  <ProfileAvatar url={picture?.avatarUrl} avatarName={truncate(user.name)} />
                }
                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      onClick={(event) => handleMenuOpen(event, id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuProfileId === id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => SelectMain(id)}>Select as main</MenuItem>
                      <MenuItem onClick={() => SelectCurrent(id)}>Select as current</MenuItem>
                      <MenuItem onClick={() => SelectMain(id)}>Edit</MenuItem> 
                      <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
                    </Menu>
                  </>
                }
                title={truncate(userName + ' - ' + authorEmail)}
                subheader={truncate(company + ' - ' + website)}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Profile description goes here
                </Typography>
                <Box display="flex" flexWrap="wrap" mt={1}>
                  {programmingLanguages.map((value, index) => (
                    <Chip key={index} label={value} sx={{ m: 0.5 }} />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Follow
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Profiles;
