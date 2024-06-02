import { Card, CardContent, CardCover, Typography } from "@mui/joy";

function ImageCard({imgUrl=null,SX={},txt=""}) {
    return(
<Card component="li" sx={{ ...SX}}>
<CardCover>
      {imgUrl!=null && (
        <img
          src={imgUrl}
          srcSet={`${imgUrl}`}
          loading="lazy"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />)}
        </CardCover>
        <CardContent>
          <div className="glow-text"  style={{position:"relative",top:"90%",fontWeight:"700",fontSize:"17px"}}>
            {txt}
          </div>
        </CardContent>
      </Card>
    )
}

export default ImageCard