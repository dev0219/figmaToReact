import { Card, Box, styled, Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const CardRoot = styled(Card)({
  fontFamily: 'Inter',
  height: '100%',
  padding: '20px 24px'
});

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inter',
  margin: theme.spacing(1),
  borderRadius: '10px'
}));

const StyledTableHeader = styled('div')(({ subtitle }) => ({
  fontFamily: 'Inter',
   display: "flex",
   justifyContent: "space-between"
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontFamily: 'Inter',
  fontSize: '1rem',
  fontWeight: '500',
 
  // textTransform: 'capitalize',
  marginBottom: !subtitle && '16px'
}));




const SimpleCardTable = ({ children, title, subtitle, add ,HandleCreate}) => {
  
  const CreateNew = () => {
    HandleCreate()
  }

  return (
    <CardRoot elevation={6}>
      <StyledTableHeader>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {add && <StyledButton variant="contained" color="primary" onClick={() => CreateNew()}>
          Add New<AddOutlinedIcon />
        </StyledButton>}
      </StyledTableHeader>
      
      {children}
      
    </CardRoot>
  );
};

export default SimpleCardTable;
