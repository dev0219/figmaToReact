import { Box, styled, Button,InputLabel, Card } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Fab from '@mui/material/Fab'

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
    "& .breadcrumb-header": {
      fontWeight:'500',
      lineHeight:"24.2px",
      fontSize:"20px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ImageRender =  styled('div')({
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: '100%',
  " & img" :{
    height: '100%'
  }
})

const ScheduleRender =  styled('div')({
  background: "#0000000D",
  padding: '12px 14px 12px 14px',
  borderRadius: '6px'
})

const SheduleHeaderChildEle = styled('div')({
  display: 'flex',
  "& p": {
    margin: '2px 5px'
  }
})

const SheduleHeaderEle =  styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
})
const SheduleActionEle =  styled('div')({
  display: 'flex',
  justifyContent: 'end'
})



const Shedulebody =  styled('div')({
  display: 'block',
  padding: '10px',
  "& p": {
    margin: '0px 0px'
  },
  "& h2": {
    margin: '0px 0px'
  }
})




const ContentManagePanel = styled(Card)({
  display: 'block',
  height: '100%',
  padding: '20px 20px'
})



  const ManageContent = () => {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [links, setLinks] = useState([]);
    const [sources, setSources] = useState([]);
    const [isNewLink, setisNewLink] = useState(false)
    const [isNewSource, setisNewSource] = useState(false)

    const [isNewLinkVal, setisNewLinkVal] = useState('')
    const [isNewSourceVal, setisNewSourceVal] = useState('')

    const CreatePersonality = () => {
      setOpen(true)
    }

    const handleCapture = ({ target }) => {
      let uploadedFiles = files;
      uploadedFiles.push(target.files[0].name)
      setFiles([...uploadedFiles])
    };

    const HandleRemove = (key, index) => {
      let LstData = [];
      let UpdatedArrData = [];
      if (key == 'file') {
        LstData = files;
        UpdatedArrData = LstData.slice(index+1).concat(LstData.slice(0,index))
        setFiles([...UpdatedArrData])
      } else if (key == 'link') {
        LstData = links;
        UpdatedArrData = LstData.slice(index+1).concat(LstData.slice(0,index))
        setLinks([...UpdatedArrData])
      } else {
        LstData = sources;
        UpdatedArrData = LstData.slice(index+1).concat(LstData.slice(0,index))
        setSources([...UpdatedArrData])
      }
    }

    const HandleNewaction = (key) => {
      if (key == 'link') {
        setisNewLink(true)
        setisNewLinkVal('')
      } else {
        setisNewSource(true)
        setisNewSourceVal('')
      }
    }

    const HandleSave  = (key) => {
      let LstData = [];
      if (key == 'link') {
        if (isNewLinkVal.length) {
          LstData = links;
          LstData.push(isNewLinkVal)
          setLinks([...LstData])
        }
        setisNewLink(false)
      } else {
        if (isNewSourceVal.length) {
          LstData = sources
          LstData.push(isNewSourceVal)
          setSources([...LstData])
        }
        setisNewSource(false)
      }
    }

    const handleClose = () => setOpen(false);
    return (
      <Container>
        <Box className="breadcrumb">
            Manage: Doritos
        </Box>
        <ContentManagePanel>
          <Grid container spacing={2}>
                <Grid item xs={6}>         
                    
                </Grid>
                <Grid item  xs={6}>
                  <ScheduleRender>
                    <SheduleHeaderEle>
                         <SheduleHeaderChildEle>
                            <VideocamOutlinedIcon></VideocamOutlinedIcon>
                            <p>video</p>
                         </SheduleHeaderChildEle>
                         <SheduleHeaderChildEle>
                            
                            <p>content pushed</p>
                            <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                         </SheduleHeaderChildEle>
                        

                    </SheduleHeaderEle>
                    <Grid container spacing={2}>
                      <Grid item  xs={5}>
                        <ImageRender>
                          <img src="/assets/images/customize/manage.png" />
                        </ImageRender>                        
                      </Grid>
                      <Grid item  xs={7}>
                        <Shedulebody>
                          <p>4/2/2020</p>
                          <h2>Best beaches in California</h2>
                          <span>43s video displaying the best beaches in California. Shows activities and ends with a CTA for the company.</span>
                          <SheduleActionEle>
                            <Button variant="text">Email Content</Button>
                            <Button variant="text">Report</Button>
                          </SheduleActionEle>                          
                        </Shedulebody>
                      </Grid>
                    </Grid>
                  </ScheduleRender>                  
                </Grid>
          </Grid> 
        </ContentManagePanel>

          
        
      </Container>
  );
};

export default ManageContent;