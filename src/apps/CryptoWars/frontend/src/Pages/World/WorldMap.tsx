import { Grid, ImageList, ImageListItem, styled } from '@mui/material';

export const WorldMap = () => {
  const worldXSize = 9;
  const worldYSize = 9;
  const tileSize = 50;

  const world = Array(worldXSize)
    .fill(null)
    .map(() => Array(worldYSize).fill(0));

  const WorldTile = styled('img')(({ theme }) => ({
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    background: 'url(/public/worldSprite.png) -32px -64px'
  }));

  const TownTile = styled('img')(({ theme }) => ({
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    background: 'url(/public/town.jpg)',
    backgroundSize: 'cover'
  }));

  return (
    <Grid container justifyContent={'center'}>
      <ImageList
        sx={{ width: tileSize * worldXSize, height: tileSize * worldYSize }}
        cols={worldXSize}
        gap={0}
      >
        {world.map((worldRow, index) =>
          worldRow.map((worldTile, index2) => (
            <ImageListItem key={index2}>
              {Math.random() > 0.2 ? <WorldTile loading={'lazy'} /> : <TownTile loading={'lazy'} />}
            </ImageListItem>
          ))
        )}
      </ImageList>
    </Grid>
  );
};
