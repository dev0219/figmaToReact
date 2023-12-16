import { Box, styled,Card, Button } from "@mui/material";
import { Breadcrumb, SimpleCard, SimpleCardTable } from "app/components";
import Grid from '@mui/material/Grid';
import CustomizePaginationTable from "../material-kit/tables/CustomizePaginationTable";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Container = styled("div")(({ theme }) => ({
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
  height: '245px',
  width: '197px',
  marginTop: "20px",
  borderRadius:"8px",
  padding: "10px"
});

const Element1 = styled('div')({
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

const personalityArr = [
    {
      name: "john doe",
      date: "18 january, 2019",
      amount: 1000,
      status: "close",
      company: "ABC Fintech LTD.",
    },
    {
      name: "kessy bryan",
      date: "10 january, 2019",
      amount: 9000,
      status: "open",
      company: "My Fintech LTD.",
    },
    {
      name: "kessy bryan",
      date: "10 january, 2019",
      amount: 9000,
      status: "open",
      company: "My Fintech LTD.",
    },
    {
      name: "james cassegne",
      date: "8 january, 2019",
      amount: 5000,
      status: "close",
      company: "Collboy Tech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
    {
      name: "lucy brown",
      date: "1 january, 2019",
      amount: 89000,
      status: "open",
      company: "ABC Fintech LTD.",
    },
  ];


  const SocialMedia = () => {
    return (
      <Container>
        <Box className="breadcrumb">
            Performance Overview
        </Box>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        <Grid lg={12/5} md={12/3} sm={12/3} xs={12/2}>
          <AddCardRoot>
            <Box>
              <AddOutlinedIcon />
              <p>Link a new media platform</p>
            </Box>
              
          </AddCardRoot>
        </Grid>
          {personalityArr.map((item) => {
            return (
              <Grid lg={12/5} md={12/3} sm={12/3} xs={12/2}>
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