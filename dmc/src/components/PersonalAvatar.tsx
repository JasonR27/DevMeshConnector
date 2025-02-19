// import { Avatar, Box, Button, Flex, keyframes, Tooltip } from '@chakra-ui/react';
import { Container, Button, Tooltip, OverlayTrigger, Image, Row, Col } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { supabaseClient } from '../config/supabase-client';
import { UPLOAD_PICTURE_DISABLED_TEXT } from '../utils/constants';

const PersonalAvatar = ({ url, onUpload, disabled }: any) => {
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const size = '96px';
  const color = 'teal';

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: any) {
    try {
      const { data, error }: any = await supabaseClient.storage.from('images').download(path);
      if (error) {
        throw error;
      }
      const url: any = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  }

  async function uploadAvatar(event: any) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabaseClient.storage.from('images').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ height: '120px', width: '100%', overflow: 'hidden' }}>
        <div
          style={{
            position: 'relative',
            width: size,
            height: size,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              content: "''",
              position: 'relative',
              display: 'block',
              width: '300%',
              height: '300%',
              boxSizing: 'border-box',
              marginLeft: '-100%',
              marginTop: '-100%',
              borderRadius: '50%',
              backgroundColor: color,
              // animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`
            }}
          />
          {/* <Avatar src={avatarUrl} size={size} position="absolute" top={0} /> */}
        </div>

        <div className="text-center" style={{ overflow: 'hidden' }}>
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id="button-tooltip">{UPLOAD_PICTURE_DISABLED_TEXT}</Tooltip>}
            // disabled={!disabled}
          >
            <Button
              disabled={disabled}
              size="sm"
              className="mb-4"
              style={{ fontSize: 'sm', borderRadius: '50%' }}
            >
              <label className="button primary block" htmlFor="single">
                {uploading ? 'Uploading ...' : 'Upload'}
              </label>
            </Button>
          </OverlayTrigger>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
              cursor: 'pointer'
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading || disabled}
          />
        </div>
      </Container>
    </>
  );
};

export default PersonalAvatar;
