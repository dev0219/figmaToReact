import { Box, styled, Button,InputLabel, Card } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab'
import StaticData from "../../../static/static.json";
import { useParams, Link } from "react-router-dom";

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
    "& .breadcrumb-header": {
      fontWeight:'500',
      lineHeight:"24.2px",
      fontSize:"20px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


const ElementListPanel = styled("div")({
  fontFamily: 'Inter',
  display: 'block'
})

const EditPersonalPanel = styled(Card)({
  fontFamily: 'Inter',
  display: 'block',
  height: '100%',
  padding: '20px 24px'
})

const ActionsElement = styled("div")(({ theme }) => ({
  fontFamily: 'Inter',
  marginTop: '20px',
  "& button":{
    [theme.breakpoints.down("sm")]: { width: "120px" },
  }
}));


  const PerasonaleditPage = () => {
    const {id} = useParams();
    const [files, setFiles] = useState([]);
    const [links, setLinks] = useState([]);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [tone, setTone] = useState('');
    const [sources, setSources] = useState([]);
    const [isNewLink, setisNewLink] = useState(false)
    const [isNewSource, setisNewSource] = useState(false)
    const [isNewLinkVal, setisNewLinkVal] = useState('')
    const [isNewSourceVal, setisNewSourceVal] = useState('')


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

    const getDetailData = (id) => {
      let selected_personality = StaticData.personalities?.filter(item => item.id == id)[0]
      setFiles([...selected_personality['file']])
      setLinks([...selected_personality['link']])
      setSources([...selected_personality['verification']])
      setName(selected_personality['name'])
      setWebsite(selected_personality['website'])
      setTone(selected_personality['learnt'])
    }

    useEffect(() => {
      getDetailData(id);
    }, [])

    return (
      <Container>
        <Box className="breadcrumb">
            
        </Box>
        <EditPersonalPanel>
          <Box className="breadcrumb-header">
              Edit : Doties
          </Box>
          <Grid container spacing={5}>
                <Grid item lg={6} md={6} sm={12} xs={12}>             
                    <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Name*</InputLabel>
                    <TextField
                      fullWidth
                      id="name"
                      type="text"
                      value={name}
                      autoFocus
                      margin="dense"
                      InputProps={{
                        style: {
                          borderRadius: "12px",
                          // width: '507px',
                          height: '49px'
                        }
                      }}
                    />   
                    <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Tone & Style of writing learnt</InputLabel>
                    <TextField
                    fullWidth
                      placeholder="The Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length ofThe Textarea Autosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within. the content within."
                      multiline
                      rows={6}
                      value={tone}
                      maxRows={10}
                      InputProps={{
                        style: {
                          borderRadius: "12px"
                        }
                      }}
                    />          
                    <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Website</InputLabel>
                    <TextField
                      fullWidth
                      id="website"
                      type="text"
                      value={website}
                      margin="dense"
                      InputProps={{
                        style: {
                          borderRadius: "12px",
                          // width: '507px',
                          height: '49px'
                        }
                      }}
                    />
                    <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Files to learn from</InputLabel>
                    <ElementListPanel>
                      <Button variant="contained" color="primary" component="label" sx={{ borderRadius: '10px', width:'95px', height: '33px', fontSize:'14px', padding: '0px', marginTop: '5px'}}>Add New+<input hidden type="file" onChange={handleCapture}/></Button>
                      {files.map((file_item, index) => {
                        return (
                            <Fab key={index} variant="extended" size="small" sx={{  borderRadius: '10px', backgroundColor: 'white' , border: '1px solid #EEEEEE' , marginLeft: '5px', marginTop: '5px', textTransform:'initial'}}>
                              {file_item}
                              <CloseOutlinedIcon sx={{ mr: 1 , width: '15px' }} onClick={() =>HandleRemove('file', index)}/>
                            </Fab>
                        )
                      })}                  
                    </ElementListPanel>                      
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Links To Learn From</InputLabel>
                    <ElementListPanel>
                      <Button variant="contained" color="primary" sx={{ borderRadius: '10px', width:'95px', height: '33px', fontSize:'14px', padding: '0px', marginTop: '5px'}} onClick={() => HandleNewaction('link')}>Add New+</Button>
                      {isNewLink && 
                        <TextField
                          placeholder=""
                          value={isNewLinkVal}
                          onChange={(e) => {
                            setisNewLinkVal(e.target.value);
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <SaveIcon onClick={() => HandleSave('link')}/>
                              </InputAdornment>
                            ),
                            style: {
                              borderRadius: "10px",
                              width: '150px',
                              height: '35px',
                              marginTop: '5px',
                              marginLeft: '10px'
                            }
                          }}
                        />
                      }

                      {links.map((file_item, index) => {
                        return (
                            <Fab key={index} variant="extended" size="small" sx={{  borderRadius: '10px', backgroundColor: 'white' , border: '1px solid #EEEEEE' , marginLeft: '5px', marginTop: '5px', textTransform:'initial'}}>
                    
                              {file_item}
                              <CloseOutlinedIcon sx={{ mr: 1 , width: '15px' }} onClick={() =>HandleRemove('link', index)}/>
                            </Fab>
                        )
                      })}                  
                    </ElementListPanel>

                    <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Verification Sources</InputLabel>
                    <ElementListPanel>
                      <Button variant="contained" color="primary" sx={{ borderRadius: '10px', width:'95px', height: '33px', fontSize:'14px', padding: '0px', marginTop: '5px'}}  onClick={() => HandleNewaction('source')}>Add New+</Button>
                      {isNewSource && 
                        <TextField
                          placeholder=""
                          value={isNewSourceVal}
                          onChange={(e) => {
                            setisNewSourceVal(e.target.value);
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <SaveIcon onClick={() => HandleSave('source')}/>
                              </InputAdornment>
                            ),
                            style: {
                              borderRadius: "10px",
                              width: '150px',
                              height: '35px',
                              marginTop: '5px',
                              marginLeft: '10px'
                            }
                          }}
                        />
                      }
                      {sources.map((file_item, index) => {
                        return (
                            <Fab key={index} variant="extended" size="small" sx={{  borderRadius: '10px', backgroundColor: 'white' , border: '1px solid #EEEEEE' , marginLeft: '5px', marginTop: '5px', textTransform:'initial'}}>
                    
                              {file_item}
                              <CloseOutlinedIcon sx={{ mr: 1, width: '15px' }} onClick={() =>HandleRemove('source', index)}/>
                            </Fab>
                        )
                      })}                  
                    </ElementListPanel>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <ActionsElement>
                        <Link to="/personality/edit"><Button color="primary" variant="contained" sx={{ width: '200px', fontSize: '18px', borderRadius: '10px'}}>
                          Save
                        </Button></Link>
                        <Link to="/personality/edit"><Button variant="outlined" sx={{ width: '200px', fontSize: '18px', borderRadius: '10px', color: 'black', marginLeft: '20px'}}>
                          Cancel
                        </Button>
                        </Link>
                      </ActionsElement>
                    
                </Grid>
          </Grid> 
        </EditPersonalPanel>

          
        
      </Container>
  );
};

export default PerasonaleditPage;