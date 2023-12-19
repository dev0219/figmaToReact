import { Box, styled, Button,InputLabel, Card } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import CircleIcon from '@mui/icons-material/Circle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import shortId from 'shortid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Fab from '@mui/material/Fab';
import { useParams, Link } from "react-router-dom";
import StaticData from "../../../static/static.json";



const Container = styled("div")(({ theme }) => ({
    margin: "5% 5%",
    maxWidth: '1100px',
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& ::-webkit-scrollbar": {
      width: '3px'
    },
    "& ::-webkit-scrollbar-thumb":{
      background: 'black',
      borderRadius: '10px'
    },
    "& .breadcrumb": {
        marginBottom: "30px",
        fontWeight:'600',
        lineHeight:"38.73px",
        fontSize:"32px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
    "& .breadcrumb-subtitle": {
      marginBottom: "30px",
      fontWeight:'400',
      lineHeight:"16.94px",
      fontSize:"14px",
      maxWidth: '600px'
  },
    "& .breadcrumb-header": {
      fontWeight:'500',
      lineHeight:"24.2px",
      fontSize:"20px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ImageRender =  styled('div')({
  margin: 'auto',
  background: "white",
  maxWidth: '208px',
  maxHeight: '120px',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: '100%',
  " & img" :{
    height: '100%'
  }
})

const ScheduleRender =  styled('div')(({ theme }) => ({
  display: 'block',
  background: "#0000000D",
  padding: '12px 14px 12px 14px',
  borderRadius: '6px',
  marginRight: '10px',
  maxWidth: '455px',
  marginTop: '10px',
  [theme.breakpoints.down("sm")]: { maxHeight: "350px" },
}));

const ScheduleRenderContainer =  styled('div')({
  maxHeight: '537px',
  height:'537px',
  overflow: 'auto'  
})

const SheduleAddEle =  styled('div')({
  position: 'absolute',
  bottom: '50px',
  right: '50px',
  fontSize: '14px'
})

const NoScheduleEle =  styled('div')({
   width: '100%',
   height: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   "& div":{
    textAlign: 'center'
   }
})


const SheduleHeaderChildEle = styled('div')({
  display: 'flex',
  "& p": {
    margin: '2px 5px',
    fontSize: '8px'
  },
  "& svg":{
    fontSize: '18px'
  },
  "& .video-tag": {
    color: '#D20A0A'
  }
})

const SheduleHeaderEle =  styled('div')({
  display: 'flex',
  justifyContent: 'space-between'
})
const SheduleActionEle =  styled('div')({
  display: 'flex',
  justifyContent: 'end',
  marginTop: '10px'
})



const Shedulebody =  styled('div')({
  margin: 'auto',
  display: 'block',
  padding: '5px',
  maxWidth: '208px',
  "& p": {
    margin: '0px 0px',
    fontSize: '8px',
    fontWeight: '400',
    lineHeight: '9.68px'
  },
  "& h2": {
    margin: '10px 0px',
    lineHeight: '16.94px',
    fontWeight: '400',
    fontSize: '14px'
  },
  "& h3": {
    margin: '0px 0px',
    fontSize: '8px',
    fontWeight: '400',
    lineHeight: '9.68px'
  }
})

const SheduleCalendarFooter =  styled('div')({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   fontSize:'14px',
   marginTop: '30px',
   "& svg":{
    marginRight: '5px'
   }
})

const SheduleCandarEle=  styled('div')({
  display: 'block',
  padding: '10% 0',
  width: '100%',
  "& .react-calendar": {
    width: '100%',
    border: 'none'
  },
  "& .react-calendar__navigation__label__labelText": {
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16.94px'
  },
  "& .react-calendar__navigation__prev2-button" : {
    display: 'none'
  },
  "& .react-calendar__navigation__prev-button" : {
    background: '#EBEBF0',
    width: '24px',
    minWidth: '24px',
    height: '24px',
    borderRadius: '10px'
  },
  "& .react-calendar__navigation__next-button" : {
    background: '#EBEBF0',
    width: '24px',
    minWidth: '24px',
    height: '24px',
    borderRadius: '10px'
  },
  "& .react-calendar__navigation__next2-button" : {
    display: 'none'
  },
  "& .react-calendar__navigation" : {
    alignItems: 'center'
  },
  "& abbr":{
    fontSize: '14px',
    textDecoration: 'none',
    fontWeight: '400'
  }

})



const ContentManagePanel = styled(Card)({
  display: 'block',
  height: '100%',
  padding: '20px 20px',
  position: 'relative'
})

  const ManageContent = () => {
    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const [scheduleArr, setScheduleArr] = useState([]);
    const [selectedPersonality, setSelectedPersonality] = useState({});
    const [name , setName] = useState("");
    const [medias, setMedias] = useState(StaticData.medias);
    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [type, setTypeContent] = useState("");

    const CreateScheduleEvent = () => {
      setOpen(true)
    } 

    const HandleRemove = (index) => {
      let LstData = [];
      let UpdatedArrData = [];
        LstData = medias;
        UpdatedArrData = LstData.slice(index+1).concat(LstData.slice(0,index))
        setMedias([...UpdatedArrData])
    }

    const handleClose = () => setOpen(false);

    const handleChange = (val) => {
      console.log(" -- selection value -----")
      console.log(val)
    }

    const handleScheduleDate = (e) => {
      setScheduleDate(e)
      let currentDate = new Date(e).toLocaleDateString('en-US')
      let currentScheduleArr = selectedPersonality.schedules.filter(schedule => new Date(schedule.createdAt).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }) == currentDate);

      setScheduleArr([...currentScheduleArr])
    }

    const getDetailData = (idVal) => {
      let selected_personality = StaticData.personalities?.filter(item => item.id == idVal)[0]
      let currentDate = new Date(scheduleDate).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })

      let currentScheduleArr = [];
      setSelectedPersonality({...selected_personality})
      if (selected_personality?.schedules) {
        currentScheduleArr = selected_personality.schedules.filter(schedule => new Date(schedule.createdAt).toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        }) == currentDate);
        setScheduleArr([...currentScheduleArr])
      }
      setName(selected_personality['name'])
      
    }

    const SubmitSchedule = () => {

      let newobj = {
        id: shortId.generate(),
        title: "New schedule event",
        description:"42s video displaying the best beaches in California. Shows activities and ends with a CTA for the company.",
        createdAt:new Date(scheduleDate)
      }

      let currentScheduleArr = scheduleArr;
      let currentSelectedSchedule = selectedPersonality;
      
      currentScheduleArr.push(newobj)
      currentSelectedSchedule['schedules'].push(newobj)
      setSelectedPersonality({...currentSelectedSchedule})
      setScheduleArr([...currentScheduleArr])
      setOpen(false);

    }

    useEffect(() => {
      if (id) {
        getDetailData(id);
      } else {
        getDetailData(StaticData.personalities[0]['id'])
      }
      
    }, [])

    return (
      <Container>
        <Box className="breadcrumb">
            Manage: {name}
        </Box>
        <Box className="breadcrumb-subtitle">
            Here, you will manage the content that is being automatically generated through your “personalities”. It allows both for scheduling and content verification.
        </Box>
        <ContentManagePanel>
          <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>      
                  <SheduleCandarEle>
                    <Calendar value={scheduleDate} onChange={(e) => (handleScheduleDate(e))}/>
                    <SheduleCalendarFooter>
                       <CircleIcon sx={{color: 'blue', fontSize:'15px'}}/>Content planned on that day
                    </SheduleCalendarFooter>
                    
                  </SheduleCandarEle>                   
                </Grid>
                <Grid item sx={{display: 'flex', justifyContent: 'center'}} lg={6} md={6} sm={12} xs={12}>
                  <ScheduleRenderContainer>
                    {scheduleArr.map((item, index) => {
                      return (
                        <ScheduleRender key={index}>
                          <SheduleHeaderEle>
                              <SheduleHeaderChildEle>
                                  <VideocamOutlinedIcon className="video-tag"></VideocamOutlinedIcon>
                                  <p className="video-tag">video</p>
                              </SheduleHeaderChildEle>
                              <SheduleHeaderChildEle>
                                  
                                  <p>content pushed</p>
                                  <VisibilityOutlinedIcon></VisibilityOutlinedIcon>
                              </SheduleHeaderChildEle>
                              
    
                          </SheduleHeaderEle>
                          <Grid container spacing={2}>
                            <Grid item lg={5} md={12} sm={12}  xs={12}>
                              <ImageRender>
                                <img src="/assets/images/customize/manage.png" />
                              </ImageRender>                        
                            </Grid>
                            <Grid item lg={7} md={12} sm={12} xs={12}>
                              <Shedulebody>
                                <p>
                                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                                    month: 'numeric',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </p>
                                <h2>Best beaches in California</h2>
                                <h3>43s video displaying the best beaches in California. Shows activities and ends with a CTA for the company.</h3>
                                <SheduleActionEle>
                                  <Button variant="text" sx={{fontSize: '8px'}}>Email Content</Button>
                                  <Button variant="text" sx={{fontSize: '8px'}}>Report</Button>
                                </SheduleActionEle>                          
                              </Shedulebody>
                            </Grid>
                          </Grid>
                        </ScheduleRender> 
                      )
                    })}
                    {scheduleArr.length ? 
                        <SheduleAddEle>                   
                            <Button variant="contained" color="primary" sx={{ borderRadius: '10px',width:'146px', height: '33px', fontSize:'14px', padding: '5px', marginTop: '5px'}} onClick={() => CreateScheduleEvent()} >+ Shedule content </Button>
                        </SheduleAddEle>
                        :<NoScheduleEle>
                          <div>
                            <p>No content has been programmed. Get started below!</p>
                            <Button variant="contained" color="primary" sx={{ borderRadius: '10px',width:'146px', height: '33px', fontSize:'14px', padding: '5px', marginTop: '5px'}} onClick={() => CreateScheduleEvent()} >+ Shedule content </Button>
                          </div>
                            
                        </NoScheduleEle>
                    }
                    
                  </ScheduleRenderContainer>
                                 
                </Grid>
          </Grid> 
        </ContentManagePanel>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "80%",
                maxWidth: "1104px",  // Set your width here
                minHeight: '511px'
              },
            },
          }}
          >
          <DialogTitle id="form-dialog-title">Schedule content for: Doritos</DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>             
                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Type of content</InputLabel>
                  
                  <TextField select label="" margin="dense"
                    fullWidth
                    value={type}
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        // width: '507px',
                        height: '49px'
                      }
                    }}
                    onChange={(e) => setTypeContent(e.target.value)}
                  >
                      <MenuItem value="1">Ten</MenuItem>
                      <MenuItem value="2">Twenty</MenuItem>
                      <MenuItem value="3">Thirty</MenuItem>
                  </TextField>
                  
                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Compatible social medias:</InputLabel>
                  {medias.map((file_item, index) => {
                      return (
                          <Fab key={index} variant="extended" size="small" sx={{  borderRadius: '10px', backgroundColor: 'transparent' , border: '1px solid #EEEEEE' , marginLeft: '5px', marginTop: '5px', textTransform:'initial'}}>
                            <CloseOutlinedIcon sx={{ mb: 1, width: '15px' }} onClick={() =>HandleRemove(index)}/>
                            {file_item}
                           
                          </Fab>
                      )
                    })} 
                 
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Keyword to use</InputLabel>
                  <TextField
                    fullWidth
                    id="website"
                    type="text"
                    placeholder="Leave blank to let AI decide"
                    margin="dense"
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        // width: '507px',
                        height: '49px'
                      }
                    }}
                  />
                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Use latest news to generate content</InputLabel>
                  
                  <TextField select label="" margin="dense" fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "12px",
                      // width: '507px',
                      height: '49px'
                    }
                  }}
                  onChange={(e) => handleChange(e.target.value)}
                  >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                  </TextField>

                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Use as backgrouond of videos:</InputLabel>
                  
                  <TextField select label="" margin="dense" fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "12px",
                      // width: '507px',
                      height: '49px'
                    }
                  }}
                  onChange={(e) => handleChange(e.target.value)}
                  >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                  </TextField>

                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Extra information for dialogue generation</InputLabel>
                  <TextField
                    fullWidth
                    id="website"
                    type="text"
                    placeholder="Example: “Make the videos always start with a 3-second attention catcher” "
                    margin="dense"
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        // width: '507px',
                        height: '49px'
                      }
                    }}
                  />
                 
              </Grid>
            </Grid>            
          </DialogContent>

          <DialogActions sx={{display: 'flex', justifyContent: 'flex-start',paddingLeft: '20px'}}>
            <Button onClick={() => SubmitSchedule()} color="primary" variant="contained" sx={{ width: '200px', fontSize: '18px', borderRadius: '10px'}}>
              Enregistrer
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ width: '200px', fontSize: '18px', borderRadius: '10px', color: 'black'}}>
              Annuler
            </Button>

          
          </DialogActions>
        </Dialog>       
      </Container>
  );
};

export default ManageContent;