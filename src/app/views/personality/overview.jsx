import { Box, styled, Button,InputLabel, FormControl } from "@mui/material";
import { SimpleCardTable } from "app/components";
import CustomizePaginationTable from "../material-kit/tables/CustomizePaginationTable";
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SaveIcon from '@mui/icons-material/Save';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import shortId from 'shortid';
import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab'
import StaticData from "../../../static/static.json";

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


const ElementListPanel = styled("div")({
  display: 'block'
})

  const headerRows = [
    {title:"Name", align:"left"},
    {title:"Website", align:"center"},
    {title:"Source", align:"center"},
    {title:"Creation date", align:"center"},
    {title:"Status", align:"center"},
    {title:"Edit", align:"center"}
  ]

  const PerasonalOverview = () => {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [links, setLinks] = useState([]);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [sources, setSources] = useState([]);
    const [personalityData, setPersonalityData] = useState(StaticData.personalities)
    const [isNewLink, setisNewLink] = useState(false)
    const [isNewSource, setisNewSource] = useState(false)

    const [isNewLinkVal, setisNewLinkVal] = useState('')
    const [isNewSourceVal, setisNewSourceVal] = useState('')

    const OpenCreateModal = () => {
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

    const getPersonalityData = () => {
      try {
        console.log("--- personality data ---")
        console.log(StaticData)
      } catch (e) {
        console.error(e);
      }
    }

    const SubmitPersonality = () => {
      let currentDate = new Date();

      let newObj = {
        id: shortId.generate(),
        name: name,
        website: website,
        file: files,
        link: links,
        verification: sources,
        learnt:"",
        sources: "03",
        shedules: [],
        createdAt:new Date().toISOString(),
        status:2
      }

      let currentVal = personalityData;
      currentVal.push(newObj)
      setPersonalityData([...currentVal])

      setOpen(false)

    }

    useEffect(() => {
      getPersonalityData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <Container>
        <Box className="breadcrumb">
            Personalities
        </Box>
        <SimpleCardTable title="List of your personalities" add="true" HandleCreate={OpenCreateModal}>
            <CustomizePaginationTable data={personalityData} header={headerRows}/>
        </SimpleCardTable>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
          sx={{
            fontFamily: 'Inter',
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "80%",
                maxWidth: "1104px",  // Set your width here
                minHeight: '511px'
              },
            },
          }}
          >
          <DialogTitle id="form-dialog-title">Create a new personality</DialogTitle>

          <DialogContent sx={{fontFamily: 'Inter',}}>
            <Grid container spacing={5}>
              <Grid item lg={6} md={6} sm={12} xs={12}>             
                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Name*</InputLabel>
                  <TextField
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    type="text"
                    autoFocus
                    margin="dense"
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        height: '49px'
                      }
                    }}
                  />             
                  <InputLabel sx={{color: 'black' , fontSize: '16px', marginTop: "10px"}}>Website</InputLabel>
                  <TextField
                    fullWidth
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                    margin="dense"
                    InputProps={{
                      style: {
                        borderRadius: "12px",
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
            </Grid>            
          </DialogContent>

          <DialogActions sx={{display: 'flex', justifyContent: 'flex-start',paddingLeft: '20px'}}>
            <Button onClick={() => SubmitPersonality()} color="primary" variant="contained" sx={{ width: '200px', fontSize: '18px', borderRadius: '10px'}}>
              Create
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ width: '200px', fontSize: '18px', borderRadius: '10px', color: 'black'}}>
              Cancel
            </Button>

          
          </DialogActions>
        </Dialog>
      </Container>
  );
};

export default PerasonalOverview;