import { Paper, styled, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const FooterWrap = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(8),
  padding: `${theme.spacing(6)}px 0`
}));

const FooterBackground = styled(Paper)(({ theme }) => ({
  // ...theme.mixins.gutters(),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2)
}));

export const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <FooterWrap>
      <FooterBackground elevation={1}>
        <Typography variant="h5" component="h3">
          {t('footer.app')}
        </Typography>
        <Typography component="p">
          @{new Date().getFullYear()} {t('footer.rights')}
        </Typography>
      </FooterBackground>
    </FooterWrap>
  );
};
