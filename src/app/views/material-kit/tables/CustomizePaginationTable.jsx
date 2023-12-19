import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import Chip from '@mui/material/Chip';
import { Link} from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBox = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '10px',
    border: '1px solid #4763E4',
    height:"41px",
    display: "flex",
    
  marginTop:"8px",
    alignItemsCenter:"center"
  },
}));

const EditElement = styled('div')(({ }) => ({
  display: "flex",
  justifyContent: "center"
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  minHeight:"300px",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0, color:" #A1A1AA", fontWeight:"500", fontSize:"16px" } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, color: "#27272A", fontWeight:"400", fontSize:"14px", lineHeight:"16.94px" } },
  },
}));

const CustomizePaginationTable = (data) => {
  const headerRow = data.header;
  const [tableArr, setTableData] = useState(data.data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
        <SearchBox
                fullWidth
                id="standard-bare"
                variant="outlined"
                defaultValue="Vous cherchez une société..."
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <SearchOutlinedIcon />
                    </IconButton>
                  ),
                }}
              />
      <StyledTable>
    
        <TableHead>
          <TableRow>
            {headerRow.map((item_header, index) => {
              return (
                  <TableCell key={index} align={item_header.align} sx={{fontFamily: 'Inter',}}>{item_header.title}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={{fontFamily: 'Inter'}}>
          {tableArr
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="center">{item.website}</TableCell>
                <TableCell align="center">{item.sources}</TableCell>
                <TableCell align="center">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell align="center">
                  {item.status === 1?<Chip sx={{background:'#FFEDD5'}} label="Learning"/>:(item.status ===2?<Chip sx={{background:'#DEF7EC'}}  label="Ready"/>:<Chip sx={{background:'#DEF7EC'}} label="In Use" />)}
                </TableCell>
                
                <TableCell align="center">
                  {headerRow.filter((header_item) => header_item.title == "Edit").length ? 
                    <EditElement>
                      <Icon color="error">delete</Icon>
                      <Link to={"/personality/edit/"+item.id}><Icon color="primary">edit</Icon></Link>
                    </EditElement>
                    :
                    <Link to={"/content/manage/"+item.id}><Button variant="contained" color="primary" sx={{borderRadius: '10px'}}>Manage</Button></Link>
                  }
                  
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={tableArr.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default CustomizePaginationTable;
