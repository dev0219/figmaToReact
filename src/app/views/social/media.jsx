import { useState } from "react";
import { Box, styled,Card, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Container = styled("div")(({ theme }) => ({
    fontFamily: 'Inter',
    margin: "5% 5%",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        fontWeight:'600',
        lineHeight:"38.73px",
        fontSize:"32px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const CardRoot = styled(Card)({
  fontFamily: 'Inter',
  height: '245px',
  width: '197px',
  marginTop: "20px",
  borderRadius:"8px",
  padding: "10px"
});

const Element1 = styled('div')({
  fontFamily: 'Inter',
  display: 'flex',
  justifyContent: 'center',
  alignItems:'center',
  marginTop: '10px',
  '& p' :{
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16.94px',
    margin: '0px 0px 0px 10px'
  },
  '& svg' :{
    marginLeft: '5px'
  }
});

const Element2 = styled('div')({
  fontFamily: 'Inter',
  display: 'flex',
  justifyContent: 'center',
  alignItems:'center',
  margin: '25px 0px',
  textAlign: 'center',
  '& p' :{
    fontWeight: '600',
    fontSize: '14px',
    color: '#22950F',
    lineHeight: '16.94px',
    margin: '0px 0px 0px 10px'
  }
});


const AddCardRoot = styled(Card)({
  fontFamily: 'Inter',
  height: '245px',
  width: '197px',
  marginTop: "20px",
  borderRadius:"8px",
  padding: "10px",
  background:'#F0F0F0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems:'center',
  textAlign: "center",
  color: "black",
  '& svg':{
    width: '39px',
    height: '39px'
  },
  '& p' :{
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16.94px',
    margin: '0px'
  }
});

  const SocialMedia = () => {

     const [soicalMedias, setSocialMedias] = useState([]);
     const Add = () => {
      let newobj = {name: "new_media"};
      let currentmedias = soicalMedias;
      currentmedias.push(newobj)
      setSocialMedias([...currentmedias])
     }

    return (
      <Container>
        <Box className="breadcrumb">
            Performance Overview
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item lg={12/5} md={12/3} sm={12/3} xs={12/2}>
              <AddCardRoot>
                <Box onClick={() => Add()}>
                  <AddOutlinedIcon />
                  <p>Link a new media platform</p>
                </Box>
                  
              </AddCardRoot>
            </Grid>
            {soicalMedias.map((item, index) => {
              return (
                <Grid item key={index} lg={12/5} md={12/3} sm={12/3} xs={12/2}>
                  <CardRoot>
                    <Element1>
                      <img src="/assets/images/customize/insta.png" alt="upgrade" />
                      <p>Instagram</p>
                    </Element1>
                    <Element2>
                      <Box>
                        <img src="/assets/images/customize/graph.png" alt="upgrade" />
                        <p>+5.2%</p>
                      </Box>                      
                    </Element2>
                    <Element1>
                      <Button size="small" variant="contained" sx={{ borderRadius: 2.5 }}>More info</Button>
                      <DeleteOutlineOutlinedIcon style={{ color: "#CC1341" }}/>
                    </Element1>
                      
                  </CardRoot>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Container>
  );
};

export default SocialMedia;