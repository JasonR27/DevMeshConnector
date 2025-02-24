import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

interface ProfileAvatarProps {
  avatarName: string | undefined;
  url: string | undefined;
  avatarSize?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ url, avatarName, avatarSize }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>();

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);


  // this function needs to be update to the new database(postgresql container instead of supabase)

  // async function downloadImage(path: any) {
  //   try {
  //     const { data, error }: any = await supabaseClient.storage.from('images').download(path);
  //     if (error) {
  //       throw error;
  //     }
  //     const url: any = URL.createObjectURL(data);
  //     setAvatarUrl(url);
  //   } catch (error: any) {
  //     console.log('Error downloading image: ', error.message);
  //   }
  // }

  return (
    <Image
      src={avatarUrl}
      alt={avatarName}
      roundedCircle
      style={{ width: avatarSize, height: avatarSize }}
    />
  );
};

export default ProfileAvatar;
