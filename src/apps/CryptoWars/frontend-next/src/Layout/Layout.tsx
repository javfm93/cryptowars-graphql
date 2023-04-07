import { Grid, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
  children: ReactNode
}

const Content = styled('div')({})

export const Layout: FC<Props> = ({ children }) => (
  <Grid container justifyContent={'center'}>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12} sm={10} md={8} lg={6}>
      <Content>{children}</Content>
    </Grid>
    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
)
